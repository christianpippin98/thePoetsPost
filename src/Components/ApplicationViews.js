import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import PersonalPostList from "./Posts/PersonalPostList";
import PostForm from "./Posts/PostForm";
import PostEditForm from "./Posts/PostEditForm";
import Login from "./Auth/Login";
import Reg from "./Auth/Reg"
import LandingPage from "./Auth/LandingPage"
import GlobalPostList from "./Posts/GlobalPostList"
import LocalPostList from "./Posts/LocalPostList";



export default class ApplicationViews extends Component {


    isAuthenticated = () => sessionStorage.getItem("credentials") !== null

    render() {
        return (
            <React.Fragment>

                <Route
                    exact path="/" render={props => {
                        if (this.isAuthenticated()) {
                            return <Redirect to="/globalpost" />
                        } else {
                            return <LandingPage setUser={this.props.setUser} {...props} />
                        }
                    }}
                />


                <Route
                    exact path="/login" render={props => {
                        if (this.isAuthenticated()) {
                            return <Redirect to="/globalpost" />
                        } else {
                            return <Login setUser={this.props.setUser} {...props} />
                        }
                    }}
                />


                <Route
                    exact path="/register" render={props => {
                        if (this.isAuthenticated()) {
                            return <Redirect to="/globalpost" />
                        } else {
                            return <Reg setUser={this.props.setUser} {...props} />
                        }
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
                            return <PersonalPostList {...props} />
                        } else {
                            return <Redirect to="/" />
                        }
                    }}
                />


                <Route
                    path="/mypost/new" render={props => {
                        if (this.isAuthenticated()) {
                            return <PostForm {...props} />
                        } else {
                            return <LandingPage setUser={this.props.setUser} {...props} />
                        }
                    }}
                />


                <Route exact path="/globalpost" render={props => {
                    if (this.isAuthenticated()) {
                        return <GlobalPostList {...props} />
                    } else {
                        return <Redirect to="/" />
                    }
                }}
                />


                <Route
                    path="/globalpost/new" render={props => {
                        if (this.isAuthenticated()) {
                            return <PostForm {...props} />
                        } else {
                            return <LandingPage setUser={this.props.setUser} {...props} />
                        }
                    }}
                />


                <Route exact path="/localpost" render={props => {
                    if (this.isAuthenticated()) {
                        return <LocalPostList {...props} />
                    } else {
                        return <Redirect to="/" />
                    }
                }}
                />


                <Route
                    path="/localpost/new" render={props => {
                        if (this.isAuthenticated()) {
                            return <PostForm {...props} />
                        } else {
                            return <LandingPage setUser={this.props.setUser} {...props} />
                        }
                    }}
                />


                <Route
                    path="/posts/:postId(\d+)/edit" render={props => {
                        return <PostEditForm {...props} />
                    }}
                />
            </React.Fragment>
        );
    }
}