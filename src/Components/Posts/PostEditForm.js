import React, { Component } from "react"
import PostManager from "../../Modules/PostManager"
import { CustomInput, Form, FormGroup, Label, Button, Input } from 'reactstrap';

class PostEditForm extends Component {
  //set the initial state
  state = {
    name: "",
    body: "",
    privacy: "",
    userId: 1,
    entryTypeId: "",
    loadingStatus: false,
  };

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  updateExistingPost = evt => {
    evt.preventDefault()
    this.setState({ loadingStatus: true });
    const currentUser = JSON.parse(localStorage.getItem("credentials"))
    const editedPost = {
      id: this.props.match.params.postId,
      name: this.state.name,
      body: this.state.body,
      userId: currentUser.id,
      entryTypeId: Number(this.state.entryTypeId),
      privacy: this.state.privacy
    };

    PostManager.update(editedPost)
      .then(() => this.props.history.push("/mypost"))
  }

  componentDidMount() {
    PostManager.getPost(this.props.match.params.postId)
      .then(post => {
        this.setState({
          name: post.name,
          body: post.body,
          userId: post.userId,
          entryTypeId: post.entryTypeId,
          privacy: post.privacy,
          loadingStatus: false
        });
      });
  }

  render() {
    return (
      <>
        <Form>
          <FormGroup>
            <Input type="text" onChange={this.handleFieldChange} name="text" id="name" placeholder="Entry Name" value={this.state.name} />
          </FormGroup>
          <FormGroup>
            <Input type="textarea" onChange={this.handleFieldChange} name="text" id="body" placeholder="Entry Body" value={this.state.body} />
          </FormGroup>
          <FormGroup>
            <CustomInput type="select" id="entryTypeId" name="customSelect" onChange={this.handleFieldChange} value={this.state.entryTypeId}>
              <option value="">Select Type</option>
              <option value="1">Poem</option>
              <option value="2">Short Story</option>
              <option value="3">Essay</option>
              <option value="4">Journal</option>
            </CustomInput>
          </FormGroup>
          <FormGroup>
            <Label for="exampleCheckbox">Privacy</Label>
            <div id="privacy" onChange={this.handleFieldChange} value={this.state.privacy}>
              <CustomInput type="radio" onChange={this.handleFieldChange} id="privacy" name="customRadio" label="Global" value="global" />
              <CustomInput type="radio" onChange={this.handleFieldChange} id="privacy" name="customRadio" label="Local" value="local" />
              <CustomInput type="radio" onChange={this.handleFieldChange} id="privacy" name="customRadio" label="Private" value="private" />
            </div>
          </FormGroup>
          <Button type="submit" disabled={this.state.loadingStatus} onClick={this.updateExistingPost}>Submit</Button>
        </Form>
      </>
    );
  }
}

export default PostEditForm