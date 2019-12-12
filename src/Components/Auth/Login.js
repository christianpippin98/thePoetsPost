import React, { Component } from "react"
import ThePoetsPost from "../ThePoetsPost"
import UserManager from "../../Modules/UsersManager"


class Login extends Component {

  // Set initial state
  state = {
    email: "",
    password: "",
    id: ""
  }
  // Update state whenever an input field is edited
  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }
  handleLogin = (e) => {
    e.preventDefault()
    UserManager.searchUser(this.state.email)
      .then((existingUser) => {
        if (existingUser.length === 0) {
          alert("dagumit")
        } else {
          const user = existingUser[0]
          if (user.password === this.state.password) {
            this.props.setUser(user)
            this.props.history.push("/mypost")
          } else {
            alert("try again buster")
          }
        }
      })
  }

  render() {
    return (
      <form onSubmit={this.handleLogin}>
        <fieldset>
          <h3>Please sign in</h3>
          <div className="formgrid">
            <input onChange={this.handleFieldChange} type="email"
              id="email"
              placeholder="Email address"
              required="" autoFocus="" />
            <label htmlFor="inputEmail">Email address</label>
            <input onChange={this.handleFieldChange} type="password"
              id="password"
              placeholder="Password"
              required="" />
            <label htmlFor="inputPassword">Password</label>
          </div>
          <button type="submit">
            Sign in
            </button>
          <p>Not already a member? <button type="button" onClick={() => { this.props.history.push("/register") }}>Register New Account</button></p>
        </fieldset>
      </form>
    )
  }

}

export default Login