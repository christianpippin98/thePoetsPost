import React, { Component } from "react";
import NavBar from "./Nav/Navbar";
import ApplicationViews from "./ApplicationViews";



class ThePoetsPost extends Component {

  state = {
    user: false
  }

  // Check if credentials are in local storage
  //returns true/false
  isAuthenticated = () => sessionStorage.getItem("credentials") !== null

  setUser = (authObj) => {
    /*
      For now, just store the email and password that
      the customer enters into local storage.
    */
    sessionStorage.setItem(
      "credentials",
      JSON.stringify(authObj)
    )
    this.setState({
      user: this.isAuthenticated()
    });
  }

  clearUser = () => {
    sessionStorage.removeItem("credentials")

    this.setState({ user: this.isAuthenticated() })
  }

  componentDidMount() {
    this.setState({
      user: this.isAuthenticated()
    })
  }
  render() {
    return (
      <React.Fragment>

        <NavBar user={this.state.user} setUser={this.setUser} clearUser={this.clearUser} />
        <ApplicationViews style={{ zIndex: -1 }} user={this.state.user}
          setUser={this.setUser} />

        
      </React.Fragment>
    );
  }
}

export default ThePoetsPost;