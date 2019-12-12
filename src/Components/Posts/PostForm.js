import React, { Component } from 'react';
// import { Link } from "react-router-dom";
import PostManager from "../../Modules/PostManager";
import PromptCard from "../Prompt/PromptCard"
import { CustomInput, Form, FormGroup, Label, Button, Input } from 'reactstrap';


class PostForm extends Component {


    state = {
        name: "",
        body: "",
        privacy: "",
        userId: 1,
        entryTypeId: "",
        loadingStatus: false,
    };

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    /*  Local method for validation, set loadingStatus, create animal      object, invoke the AnimalManager post method, and redirect to the full animal list
    */
    constructNewPost = evt => {
        evt.preventDefault();
        if (this.state.name === "") {
            window.alert("Try Harder Next Time Scrub");
        } else {
            this.setState({ loadingStatus: true });
            const post = {
                name: this.state.name,
                body: this.state.body,
                privacy: this.state.privacy,
                userId: this.state.userId,
                entryTypeId: Number(this.state.entryTypeId)
            };

            // Create the animal and redirect user to animal list
            PostManager.post(post)
                .then(() => this.props.history.push("/mypost"));
        }
    };

     
    render() {
        return (
            <>
            <PromptCard/>
            <Form>
                <FormGroup>
                    <Input type="text" onChange={this.handleFieldChange} name="text" id="name" placeholder="Entry Name" required />
                </FormGroup>
                <FormGroup>
                    <Input type="textarea" onChange={this.handleFieldChange} name="text" id="body" placeholder="Entry Body" required />
                </FormGroup>
                <FormGroup>
                    <CustomInput type="select" id="entryTypeId" name="customSelect" onChange={this.handleFieldChange} required>
                        <option value="">Select Type</option>
                        <option value="1">Poem</option>
                        <option value="2">Short Story</option>
                        <option value="3">Essay</option>
                        <option value="4">Journal</option>
                    </CustomInput>
                </FormGroup>
                <FormGroup>
                    <Label for="exampleCheckbox">Privacy</Label>
                    <div id="privacy" onChange={this.handleFieldChange} required>
                        <CustomInput type="radio" onChange={this.handleFieldChange} id="privacy" name="customRadio" label="Global" value="global"/>
                        <CustomInput type="radio" onChange={this.handleFieldChange} id="privacy" name="customRadio" label="Local" value="local"/>
                        <CustomInput type="radio" onChange={this.handleFieldChange} id="privacy" name="customRadio" label="Private" value="private"/>
                    </div>
                </FormGroup>
                <Button type="submit" disabled={this.state.loadingStatus} onClick={this.constructNewPost}>Submit</Button>
            </Form>
            </>
        )
    }
}

export default PostForm