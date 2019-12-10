import React, { Component } from "react"
import PostManager from "../../Modules/PostManager"

class PostEditForm extends Component {
  //set the initial state
  state = {
    postName: "",
    loadingStatus: true,
    date: "",
    status: false
  };

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  updateExistingPost = evt => {
    evt.preventDefault()
    this.setState({ loadingStatus: true });
    const editedPost = {
      id: this.props.match.params.postId,
      name: this.state.postName,
      date: this.state.date,
      status: this.state.status
    };

    PostManager.update(editedPost)
      .then(() => this.props.history.push("/global"))
  }

  componentDidMount() {
    PostManager.getPost(this.props.match.params.postId)
      .then(post => {
        this.setState({
          postName: post.name,
          loadingStatus: false,
          date: post.date,
          status: post.status
        });
      });
  }

  render() {
    return (
      <>
        <form>
          <fieldset>
            <div className="formgrid">
              <input
                type="text"
                required
                onChange={this.handleFieldChange}
                id="postName"
                value={this.state.taskName}
              />
              <label htmlFor="postName">Post name</label>
              
              <input
                type="date"
                required
                onChange={this.handleFieldChange}
                id="date"
                value={this.state.date}
              />
              <label htmlFor="date">Date</label>

            </div>
            <div className="alignRight">
              <button
                type="button" disabled={this.state.loadingStatus}
                onClick={this.updateExistingTask}
                className="btn btn-primary"
              >Submit</button>
            </div>
          </fieldset>
        </form>
      </>
    );
  }
}

export default PostEditForm