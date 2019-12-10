import React, { Component } from 'react';
import { Link } from "react-router-dom"
import PostManager from "../../Modules/PostManager"


class PostForm extends Component {


    state = {
        PostName: "",
        status: false,
        finishDate: "",
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
        if (this.state.postName === "") {
            window.alert("Try Harder Next Time Scrub");
        } else {
            this.setState({ loadingStatus: true });
            const post = {
                name: this.state.postName,
                status: this.state.status,
                date: this.state.finishDate,
            };

            // Create the animal and redirect user to animal list
            PostManager.post(post)
                .then(() => this.props.history.push("/global"));
        }
    };



    render() {
        return (
            <>
                <div className="form-group row">
                    <section className="formgrid">
                        <label htmlFor="postName">Add New</label>
                        <input type="text" onChange={this.handleFieldChange} className="form-control" id="postName" />
                        <label htmlFor="finishDate"></label>
                        <input type="date" id="finishDate" onChange={this.handleFieldChange} />
                    </section>
                </div>
                <div className="form-group row">
                    <div className="col-sm-10">
                        <button type="submit" className="btn btn-primary" disabled={this.state.loadingStatus} onClick={this.constructNewPost}>Add</button>
                    </div>
                </div>
            </>
        )
    }
}

export default PostForm