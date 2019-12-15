import React, { Component } from "react"
import PostCard from "./PostCard"
import PostManager from "../../Modules/PostManager"
import { Button } from 'reactstrap';

class PersonalPostList extends Component {
    state = {
        posts: [],
    }


    componentDidMount() {
        const currentUser = JSON.parse(localStorage.getItem("credentials"))
        PostManager.getAllPosts(currentUser.id)
            .then((posts) => {
                this.setState({
                    posts: posts
                })
            })

    }

    deletePost = id => {
        PostManager.delete(id)
          .then(() => {
            PostManager.getAllPosts()
              .then((newPosts) => {
                this.setState({
                  posts: newPosts
                })
              })
          })
      }

    render() {
        return (
            <>
            <Button color="secondary" size="sm" onClick={() => { this.props.history.push("/mypost/new") }}>New Post</Button>
                <div className="container-cards">
                    {this.state.posts.map(post =>
                        <PostCard
                            key={post.id}
                            post={post}
                            deletePost={this.deletePost}
                            {...this.props}
                        />
                    )}
                </div>
            </>
        )
    }
}

export default PersonalPostList