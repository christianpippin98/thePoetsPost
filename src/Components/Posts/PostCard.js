import React, { Component } from 'react'
import PostManager from "../../Modules/PostManager"
import UsersManager from "../../Modules/UsersManager"
import { Card, CardTitle, CardText } from 'reactstrap'
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import PersonAddTwoToneIcon from '@material-ui/icons/PersonAddTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import PersonAddDisabledTwoToneIcon from '@material-ui/icons/PersonAddDisabledTwoTone';
import "./PostCard.css"


class PostCard extends Component {

  state = {
    status: false,
    friends: [],
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
    UsersManager.getUser(this.props.post.userId)
      .then(() => {
        this.setState({
          status: false
        });
      });
  }


  currentUser = JSON.parse(sessionStorage.getItem("credentials"))
  isFriend() {

    let friendship = false
    this.props.friends.forEach(friend => {
      if (friend.userId === this.props.post.userId) {
        friendship = true
        return friendship
      }
    })
    return friendship
  }

  render() {
    return (
      <Card id="postCard">
        <div className="card-body">
          <p><b>{this.props.post.user.firstName} {this.props.post.user.lastName}</b></p>
          <CardTitle className="card-title"><b>{this.props.post.name}</b></CardTitle>
          <CardText>{this.props.post.body}</CardText>
          {(this.currentUser.id === this.props.post.userId) ?
            <>
              <EditTwoToneIcon size="sm" onClick={() => { this.props.history.push(`/posts/${this.props.post.id}/edit`) }}></EditTwoToneIcon>
              <DeleteTwoToneIcon size="sm" onClick={() => this.props.deletePost(this.props.post.id)}></DeleteTwoToneIcon>
            </> : (this.isFriend()) ?
              <>
                <PersonAddDisabledTwoToneIcon size="sm" onClick={() => this.props.unfollow(this.props.post.user.id)}></PersonAddDisabledTwoToneIcon>
              </> :
              <>
                <PersonAddTwoToneIcon size="sm" onClick={() => this.props.addNewFriend(this.props.post.user.id)}></PersonAddTwoToneIcon>
              </>
          }
        </div>
      </Card>
    )
  }
}
export default PostCard