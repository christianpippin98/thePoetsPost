import React, { Component } from "react"
import PostCard from "./PostCard"
import PostManager from "../../Modules/PostManager"

class PostList extends Component {
    state = {
        posts: [],
    }


    componentDidMount() {
        PostManager.getAllPosts()
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
                <section className="section-content">
                    <button type="button" className="btn" onClick={() => { this.props.history.push("/posts/new") }}>Add New Task</button>
                </section>
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

export default PostList