import React, { Component } from 'react';
import { Jumbotron, Button } from 'reactstrap';


class LandingPage extends Component {
    render() {
        return (
            <div>
                <Jumbotron id="jumbotron">
                    <h1 className="display-3">Welcome To Poet's Post!</h1>
                    <p className="lead">A writer's creative and organizational inspiration!</p>
                    <hr className="my-2" />
                    <p></p>
                    <p className="lead">
                        <Button color="secondary" onClick={() => { this.props.history.push("/login") }}>Login</Button>
                        <Button color="secondary" onClick={() => { this.props.history.push("/register") }}>Register</Button>
                    </p>
                </Jumbotron>
            </div>
        )
    }
}

export default LandingPage;