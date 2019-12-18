import React, { Component } from "react"
import { Link } from "react-router-dom"
// import "bootstrap/dist/css/bootstrap.min.css"

// Navbar called by app views to direct to different sections of the site
class NavBar extends Component {

    isAuthenticated = () => localStorage.getItem("credentials") !== null
    render() {
        if (this.props.user === true) {
            return (
                <nav className="navbar bg-dark text-white flex-md-nowrap p-0 shadow">
                    <ul className="nav nav-pills nav-fill">
                        <li className="nav-item">
                            <Link className="nav-link" to="/globalpost">Poet's Post</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/localpost">Local Post</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/mypost">My Post</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/" onClick={this.props.clearUser}>Logout</Link>
                        </li>
                    </ul>
                </nav>
            )
        } else {
            return (
                <nav className="navbar bg-dark text-white flex-md-nowrap p-0 shadow">
                    <ul className="nav nav-pills nav-fill">
                        <li className="nav-item">
                            <Link className="nav-link" to="/globalpost">Poet's Post</Link>
                        </li>
                    </ul>
                </nav>
            )

        }
    }
}

export default NavBar