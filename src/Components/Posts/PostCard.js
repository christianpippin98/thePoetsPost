import React, { Component } from 'react'
import PostManager from "../../Modules/PostManager"
import { Card, Button, CardTitle, CardText } from 'reactstrap'


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
  currentUser = JSON.parse(localStorage.getItem("credentials"))
  render() {
    return (
      <Card className="card">
        <div className="card-body">
          <CardTitle className="card-title" style={{ width: "18rem" }}><b>{this.props.post.name}</b></CardTitle>
          <CardText>{this.props.post.body}</CardText>
          {(this.currentUser.id === this.props.post.userId) ?
            <>
              <Button size="sm" type="button" onClick={() => { this.props.history.push(`/posts/${this.props.post.id}/edit`) }}>Edit</Button>
              <Button size="sm" type="button" onClick={() => this.props.deletePost(this.props.post.id)}>Delete</Button>
            </> : <>
            <Button size="sm" type="button" onClick={() => this.props.addFriend(this.props.userId)}>Add Friend</Button>
            </>
          }
        </div>
      </Card>
    )
  }
}
export default PostCard