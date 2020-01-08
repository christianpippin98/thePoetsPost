import React, { Component, useState } from "react"
import { Link } from "react-router-dom"
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText } from 'reactstrap';
import { Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import "./Navbar.css"

// Navbar called by app views to direct to different sections of the site
class NavBar extends Component {

    loggedInUser = JSON.parse(sessionStorage.getItem("credentials"))
    isAuthenticated = () => sessionStorage.getItem("credentials") !== null
    render() {
        if (this.props.user === true) {
            return (
                <div>
                    <Navbar id="navbar" expand="md">
                        <Collapse navbar>
                            <Nav className="mr-auto" navbar>
                                <Link id="navTitle" className="nav-link" to="/globalpost">
                                    Poet's Post
                            </Link>
                                <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle id="navUserName" nav caret>
                                            {this.loggedInUser.firstName} {this.loggedInUser.lastName}
                                        </DropdownToggle>
                                        <DropdownMenu id="navUserName" right>
                                            <DropdownItem id="navUserName">
                                                <Link id="dropdownFollowing" to="/following">
                                                    Following
                                            </Link>
                                            </DropdownItem>
                                            <DropdownItem id="navUserName">
                                                <Link id="dropdownProfile" to="/myprofile">
                                                    Profile
                                            </Link>
                                            </DropdownItem>
                                            <DropdownItem id="navUserName" divider />
                                            <DropdownItem id="navUserName">
                                                <Link id="dropdownLogout" to="/" onClick={this.props.clearUser}>
                                                    Logout
                                            </Link>
                                            </DropdownItem>
                                        </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                            <NavbarText> </NavbarText>
                        </Collapse>
                    </Navbar>
                </div>
                // <Navbar color="dark" dark expand="lg">
                //     <Nav color="dark" expand="lg">
                //         <NavItem>
                //             <Link className="nav-link" to="/globalpost">Poet's Post</Link>
                //         </NavItem>
                //         <NavItem>
                //             <Link className="nav-link" to="/localpost">Local Post</Link>
                //         </NavItem>
                //         <NavItem>
                //             <Link className="nav-link" to="/mypost">My Post</Link>
                //         </NavItem>
                //         <NavItem>
                //             <Link </Link>
                //         </NavItem>
                //     </Nav>
                //     <Nav>
                //         <NavItem id="logout">
                //             <Link </Link>
                //         </NavItem>
                //         <NavbarText id="personalInfo" >{this.loggedInUser.firstName} {this.loggedInUser.lastName}</NavbarText>
                //     </Nav>
                // </Navbar>
            )
        } else {
            return (
                <></>
            )
        }
    }
}

export default NavBar