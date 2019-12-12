import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import PostList from "./Posts/PostList";
import PostForm from "./Posts/PostForm";
import PostEditForm from "./Posts/PostEditForm";
import Login from "./Auth/Login";
import Reg from "./Auth/Reg"

export default class ApplicationViews extends Component {


    isAuthenticated = () => localStorage.getItem("credentials") !== null

    render() {
        return (
            <React.Fragment>

                <Route
                    exact path="/" render={props => {
                        return <Login setUser={this.props.setUser} {...props} />
                    }}
                />

                <Route
                    exact path="/register" render={props => {
                        return <Reg setUser={this.props.setUser} {...props} />
                    }}
                />

                <Route
                    path="/friends" render={props => {
                        return null
                    }}
                />

                <Route
                    exact path="/mypost" render={props => {
                        if (this.isAuthenticated()) {
                            return <PostList {...props} />
                        } else {
                            return <Redirect to="/" />
                        }
                    }}
                />

                <Route
                    path="/mypost/new" render={props => {
                        return <PostForm {...props} />
                    }}
                />

                <Route exact path="/posts" render={props => {
                    if (this.isAuthenticated()) {
                        return <PostList {...props} />
                    } else {
                        return <Redirect to="/" />
                    }
                }} />
                {/* the above code checks session storage and if no user is in session storage, it will not render */}
                <Route
                    path="/posts/:postId(\d+)/edit" render={props => {
                        return <PostEditForm {...props} />
                    }}
                />
            </React.Fragment>
        );
    }
}