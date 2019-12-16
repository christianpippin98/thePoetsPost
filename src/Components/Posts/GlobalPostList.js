import React, { Component } from "react"
import PostCard from "./PostCard"
import PostManager from "../../Modules/PostManager"
import { Button } from 'reactstrap';

class GlobalPostList extends Component {
    state = {
        posts: [],
    }


    componentDidMount() {
        PostManager.getAllGlobalPosts()
            .then((posts) => {
                this.setState({
                    posts: posts
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

    render() {
        return (
            <>
            <Button color="secondary" size="sm" onClick={() => { this.props.history.push("/globalpost/new") }}>New Post</Button>
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

export default GlobalPostList