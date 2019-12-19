import React, { Component } from "react"
import UserManager from "../../Modules/UsersManager"
import { Form, Button, Input, FormGroup } from 'reactstrap';


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

  // If/Else conditional that, when called takes login credentials and checks them against the database. If the form is not filled out, 
  // or if the information given doesn't match any accounts, user will get an error message.
  handleLogin = (e) => {
    e.preventDefault()
    UserManager.searchUser(this.state.email)
      .then((existingUser) => {
        if (existingUser.length === 0) {
          alert("Register An Account Please")
        } else {
          const user = existingUser[0]
          if (user.password === this.state.password) {
            sessionStorage.setItem(
              "credentials",
              JSON.stringify(user)
            )
            window.location.reload(false)
          } else {
            alert("Fill Out Login Info Please")
          }
        }
      })
  }


  // Login form to call above functions and take user info. If the user doesn't have an account, they can redirect to the register form.
  render() {
    return (
      <Form onSubmit={this.handleLogin}>
        <fieldset>
          <h3>Please Login</h3>
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
          </div>
          <Button type="submit">
            Sign in
            </Button>
          <p>Not a member yet? <Button type="button" onClick={() => { this.props.history.push("/register") }}>Register New Account</Button></p>
        </fieldset>
      </Form>
    )
  }

}

export default Login