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

  // handleReg = (e) => {
  //   e.preventDefault()
  //   this.props.newUser({
  //     email: this.state.email,
  //     password: this.state.password
  //   })
  // }

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