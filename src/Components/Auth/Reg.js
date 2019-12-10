import React, { Component } from "react"
import thePoetsPost from "../ThePoetsPost"


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
//   constructNewUser = evt => {
//     evt.preventDefault();
//     if(this.state.email === "" || this.state.password === "" || this.state.confirmPass !== this.state.password) {
//       window.alert("oh shit");
//     } else{
//       this.setState({ loadingStatus: true });
//       const user = {
//         email: this.state.email,
//         password: this.state.password,
       

//       };
//       UsersManager.post(user)
//       .then(() => this.props.history.push("/global"))
//     }
//   }

  handleReg = (e) => {
    e.preventDefault()
    this.props.newUser({
      email: this.state.email,
      password: this.state.password
    })
    this.props.history.push("/global");

  }

  render() {
    return (
      <form onSubmit={this.handleReg}>
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