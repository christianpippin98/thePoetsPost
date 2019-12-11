import React, { Component } from 'react';
import PostManager from "../../Modules/PostManager"


class PostCard extends Component {

    state = {
        status: false
      };
    
      handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
      }
    
      updateStatus = evt => {
        this.setState({ loadingStatus: true });
        const editedPost = {
          status: true
        };
    
        PostManager.update(editedPost)
          .then(() => this.props.history.push("/global"))
      }
    
      componentDidMount() {
        PostManager.getPost(this.props.post.id)
          .then(() => {
            this.setState({
              status: false
            });
          });
      }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <h5 onClick={() => { this.props.history.push(`/posts/${this.props.post.id}/edit`) }} className="card-title" style={{ width: "18rem" }}><b>{this.props.post.name}</b></h5>
                    <p>{this.props.post.body}</p>
                    <button type="button" onClick={() => this.props.deletePost(this.props.post.id)}>Delete</button>
                </div>
            </div>
        )
    }
}
export default PostCard