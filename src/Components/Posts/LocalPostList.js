import React, { Component } from "react"
import PostCard from "./PostCard"
import PostManager from "../../Modules/PostManager"
import FriendsManager from "../../Modules/FriendsManager"
import { Button } from 'reactstrap';

class LocalPostList extends Component {
    state = {
        posts: [],
        friends: [],
    }


    componentDidMount() {
        const loggedInUser = JSON.parse(localStorage.getItem("credentials"))
        PostManager.getAllLocalPosts()
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
                PostManager.getAllLocalPosts()
                    .then((newPosts) => {
                        this.setState({
                            posts: newPosts
                        })
                    })
            })
    }


    deleteFriend = id => {
        FriendsManager.delete(id)
            .then(() => {
                FriendsManager.getAllGlobalFriends()
                    .then((newFriends) => {
                        this.setState({
                            friends: newFriends
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