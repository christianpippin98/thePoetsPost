import React, { Component } from "react"
import PostCard from "./PostCard"
import PostManager from "../../Modules/PostManager"
import FriendsManager from "../../Modules/FriendsManager"
import { Button } from 'reactstrap';

class LocalPostList extends Component {
    state = {
        posts: [],
        userId: "",
        loggedInUserId: "",
        friends: [],
    }


    pushEntry = (array1, array2, item) => {
        // if the object does not already exist in the array, push the object into the array
        if (array1.find(({ userId }) => userId === item.userId)) {
            array2.push(item);
        }
    }


    componentDidMount() {
        let postsArray = []
        const loggedInUser = JSON.parse(sessionStorage.getItem("credentials"))
        FriendsManager.getAllFriends(loggedInUser.id)
            .then((friends) => {
                this.setState({
                    friends: friends
                })
            })
        PostManager.getAllLocalPosts()
            .then((posts) => {
                posts.forEach(post => {
                    this.pushEntry(this.state.friends, postsArray, post)
                })
                this.setState({
                    posts: postsArray
                })
            })

    }


    deletePost = id => {
        PostManager.delete(id)
            .then(() => {
                PostManager.getAllLocalPosts()
                    .then((newPosts) => {
                        this.setState({
                            posts: newPosts
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
                <Button color="secondary" size="sm" onClick={() => { this.props.history.push("/localpost/new") }}>New Post</Button>
                <div className="container-cards">
                    {this.state.posts.map(post =>
                        <PostCard
                            user={post.userId}
                            key={post.id}
                            post={post}
                            friends={this.state.friends}
                            unfollow={this.unfollow}
                            deletePost={this.deletePost}
                            {...this.props}
                        />
                    )}
                </div>
            </>
        )
    }
}

export default LocalPostList