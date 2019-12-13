import React, { Component } from "react"
import UsersManager from "../../Modules/UsersManager"


class Reg extends Component {

  // Set initial state
  state = {
    email: "",
    password: "",
    confirmPass: "",
    loadingStatus: false
  }

  // Update state whenever an input field is edited
  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  // If/Else conditional to check input data and run it against existing user data. 
  // If the user info already exists, the user will get an error message.
  // If the info does not exist, the user will be added to the user database and they will be logged into their personal Post.
  constructNewUser = evt => {
    evt.preventDefault();
    if (this.state.email === "" || this.state.password === "" || this.state.confirmPass !== this.state.password) {
      window.alert("oh shoot");
    } else {
      UsersManager.searchUser(this.state.email)
        .then((existingUser) => {
          if (existingUser.length === 0) {

            this.setState({ loadingStatus: true });
          const user = {
            email: this.state.email,
            password: this.state.password,
            
            
          };
          UsersManager.post(user)
          .then((user) => {
            this.props.setUser(user)
            console.log(user)
            this.props.history.push("/mypost")
            
          })
        } else {
          window.alert("chill bruh, sign in")
        }
        })
        

    }
  }


// Register form to collect user data and use the above functions to create a new user.
  render() {
    return (
      <form>
        <fieldset>
          <h1>Welcome</h1>
          <h3>Please sign in</h3>
          <div className="formgrid">
            <input onChange={this.handleFieldChange} type="email"
              id="email"
              placeholder="Email address"
              required="" autoFocus="" />
            <label htmlFor="inputEmail"></label>

            <input onChange={this.handleFieldChange} type="password"
              id="password"
              placeholder="Password"
              required="" />
            <label htmlFor="inputPassword"></label>

            <input onChange={this.handleFieldChange} type="password"
              id="confirmPass"
              placeholder="Confirm Password"
              required="" />
            <label htmlFor="inputPassword"></label>


          </div>
          <button type="submit" disabled={this.state.loadingStatus} onClick={this.constructNewUser}>
            Register
            </button>
        </fieldset>
      </form>
    )
  }

}

export default Reg