import React, { Component } from "react"
import { Link } from "react-router-dom"
// import "bootstrap/dist/css/bootstrap.min.css"


class NavBar extends Component {
    render() {
        return (
            <nav className="navbar bg-dark text-white flex-md-nowrap p-0 shadow">
                <ul className="nav nav-pills nav-fill">
                    <li className="nav-item">
                        <Link className="nav-link" to="/global">Poet's Post</Link>
                    </li>                    
                    <li className="nav-item">
                        <Link className="nav-link" to="/local">Local Post</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/mypost">My Post</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default NavBar