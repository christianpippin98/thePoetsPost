import React, { Component } from 'react';
// import { Link } from "react-router-dom";
import PostManager from "../../Modules/PostManager";
import PromptCard from "../Prompt/PromptCard"
import { CustomInput, Form, FormGroup, Button, Input } from 'reactstrap';


class PostForm extends Component {


    state = {
        name: "",
        body: "",
        privacyTypeId: "",
        privacyTypeNames: [],
        userId: "",
        entryTypeId: "",
        entryTypeNames: [],
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
            const currentUser = JSON.parse(localStorage.getItem("credentials"))
            const post = {
                name: this.state.name,
                body: this.state.body,
                privacyTypeId: Number(this.state.privacyTypeId),
                userId: currentUser.id,
                entryTypeId: Number(this.state.entryTypeId)
            };

            
            PostManager.post(post)
                .then(() => this.props.history.go(-1));
        }
    };


    componentDidMount() {
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
                <PromptCard />
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
                            {this.state.entryTypeNames.map((entryType) => {
                                return <option key={entryType.id} value={entryType.id}>{entryType.name}</option>
                            })}
                        </CustomInput>
                    </FormGroup>
                    <FormGroup>
                        <CustomInput type="select" id="privacyTypeId" onChange={this.handleFieldChange}>
                            <option value="">Select Privacy</option>
                            {this.state.privacyTypeNames.map((privacyType) => {
                                return <option key={privacyType.id} value={privacyType.id}>{privacyType.privacy}</option>
                            })}
                        </CustomInput>
                    </FormGroup>
                    <Button type="submit" id="formSubmit" disabled={this.state.loadingStatus} onClick={this.constructNewPost}>Submit</Button>
                </Form>
            </>
        )
    }
}

export default PostForm