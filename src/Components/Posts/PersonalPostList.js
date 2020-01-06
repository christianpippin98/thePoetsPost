import React, { Component } from "react"
import PostCard from "./PostCard"
import PostManager from "../../Modules/PostManager"
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
import "./PersonalPostList.css"

class PersonalPostList extends Component {
    state = {
        posts: [],
    }


    componentDidMount() {
        const currentUser = JSON.parse(sessionStorage.getItem("credentials"))
        PostManager.getAllPersonalPosts(currentUser.id)
            .then((posts) => {
                this.setState({
                    posts: posts
                })
            })
    }

    deletePost = id => {
        PostManager.delete(id)
          .then(() => {
            PostManager.getAllPersonalPosts()
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
            <AddCircleTwoToneIcon id="personalAddButton" size="sm" onClick={() => { this.props.history.push("/mypost/new") }}></AddCircleTwoToneIcon>
                <div id="personalPostList" className="container-cards">
                    {this.state.posts.map(post =>
                        <PostCard
                            user={post.userId}
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