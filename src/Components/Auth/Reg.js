import React, { Component } from "react"
import UsersManager from "../../Modules/UsersManager"
import { Form, Button, Input, FormGroup } from 'reactstrap';


class Reg extends Component {

  // Set initial state
  state = {
    email: "",
    password: "",
    confirmPass: "",
    firstName: "",
    lastName: "",
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
    if (this.state.email === "" || this.state.password === "" || this.state.confirmPass !== this.state.password || this.state.firstName === "" || this.state.lastName === "") {
      window.alert("oh shoot");
    } else {
      UsersManager.searchUser(this.state.email)
        .then((existingUser) => {
          if (existingUser.length === 0) {

            this.setState({ loadingStatus: true });
            const user = {
              email: this.state.email,
              password: this.state.password,
              firstName: this.state.firstName,
              lastName: this.state.lastName

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
      <Form>
        <fieldset>
          <h3>Please Register</h3>

          <div className="formgrid">
            <FormGroup>
              <Input onChange={this.handleFieldChange} type="email"
                id="email"
                placeholder="Email address"
                required="" autoFocus="" />
            </FormGroup>

            <FormGroup>
              <Input onChange={this.handleFieldChange} type="password"
                id="password"
                placeholder="Password"
                required="" />
            </FormGroup>

            <FormGroup>
              <Input onChange={this.handleFieldChange} type="password"
                id="confirmPass"
                placeholder="Confirm Password"
                required="" />
            </FormGroup>

            <FormGroup>
              <Input onChange={this.handleFieldChange} type="name"
                id="firstName"
                placeholder="First Name"
                required="" />
            </FormGroup>

            <FormGroup>
              <Input onChange={this.handleFieldChange} type="name"
                id="lastName"
                placeholder="Last Name"
                required="" />
            </FormGroup>
          </div>

          <Button type="submit" disabled={this.state.loadingStatus} onClick={this.constructNewUser}>Register</Button>
          <p>Already a member? <Button type="button" onClick={() => { this.props.history.push("/login") }}>Login</Button></p>
        </fieldset>
      </Form>
    )
  }

}

export default Reg