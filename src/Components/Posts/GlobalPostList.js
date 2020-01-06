import React, { Component } from "react"
import PostCard from "./PostCard"
import PostManager from "../../Modules/PostManager"
import FriendsManager from "../../Modules/FriendsManager"
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
import "./GlobalPostList.css"


class GlobalPostList extends Component {
    state = {
        posts: [],
        userId: "",
        loggedInUserId: "",
        friends: [],
    }


    componentDidMount() {
        const loggedInUser = JSON.parse(sessionStorage.getItem("credentials"))
        PostManager.getAllGlobalPosts()
            .then((posts) => {
                this.setState({
                    posts: posts
                })
            })
        FriendsManager.getAllFriends(loggedInUser.id)
            .then((friends) => {
                this.setState({
                    friends: friends
                })
            })
    }

    deletePost = id => {
        PostManager.delete(id)
            .then(() => {
                PostManager.getAllGlobalPosts()
                    .then((newPosts) => {
                        this.setState({
                            posts: newPosts
                        })
                    })
            })
    }


    addNewFriend = (friendUserId) => {
        this.setState({ loadingStatus: true });
        const currentUser = JSON.parse(sessionStorage.getItem("credentials"))
        const newFriend = {
            userId: friendUserId,
            loggedInUserId: currentUser.id,
        };
        FriendsManager.addFriend(newFriend)
            .then(() => {
                FriendsManager.getAllFriends(currentUser.id)
                    .then((friends) => {
                        this.setState({
                            friends: friends
                        })
                    })
            })
    }


    unfollow = id => {
        const currentUser = JSON.parse(sessionStorage.getItem("credentials"))
        FriendsManager.getFriend(currentUser.id, id).then((response) => {
            FriendsManager.delete(response[0].id)
                .then(() => {
                    FriendsManager.getAllFriends(currentUser.id)
                        .then((friends) => {
                            this.setState({
                                friends: friends
                            })
                        })
                })
        })
    }


    render() {
        return (
            <>
            <AddCircleTwoToneIcon id="globalAddButton" size="sm" onClick={() => { this.props.history.push("/globalpost/new") }}></AddCircleTwoToneIcon>
                <div id="globalPostList" className="container-cards">
                    {this.state.posts.map(post =>
                        <PostCard
                            user={post.userId}
                            key={post.id}
                            post={post}
                            friends={this.state.friends}
                            deletePost={this.deletePost}
                            addNewFriend={this.addNewFriend}
                            unfollow={this.unfollow}
                            {...this.props}
                        />
                    )}
                </div>
            </>
        )
    }
}

export default GlobalPostList