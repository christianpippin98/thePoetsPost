import React, { Component } from "react"
import PostManager from "../../Modules/PostManager"
import { CustomInput, Form, FormGroup, Label, Button, Input } from 'reactstrap';

class PostEditForm extends Component {
  //set the initial state
  state = {
    name: "",
    body: "",
    privacy: "",
    userId: "",
    entryTypeId: "",
    entryTypeNames: [],
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
          privacyTypeId: post.privacyTypeId,
          loadingStatus: false
        });
      });
    PostManager.getAllEntryTypes()
      .then((allEntryTypes) => {
        this.setState({
          entryTypeNames: allEntryTypes
        });
      });
      PostManager.getAllPrivacyTypes()
      .then((allPrivacyTypes) => {
        this.setState({
          privacyTypeNames: allPrivacyTypes
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
            <CustomInput type="select" id="entryTypeId" name="customSelect" onChange={this.handleFieldChange} required>
              <option value="">Select Type</option>
              {this.state.entryTypeNames.map((name) => {
                return <option key={name.id} value={name.id}>{name.name}</option>
              })}
            </CustomInput>
          </FormGroup>
          <FormGroup>
            <CustomInput type="select" id="privacyTypeId" onChange={this.handleFieldChange}>
              <option value="">Select Privacy</option>
              {this.state.privacyTypeNames.map((name) => {
                return <option key={name.id} value={name.id}>{name.privacy}</option>
              })}
            </CustomInput>
          </FormGroup>
          <Button type="submit" disabled={this.state.loadingStatus} onClick={this.updateExistingPost}>Submit</Button>
        </Form>
      </>
    );
  }
}

export default PostEditForm