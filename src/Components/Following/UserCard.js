import React, { Component } from "react";
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import FriendsManager from '../../Modules/FriendsManager';



class UserCard extends Component {


    state = {
        status: false,
        friends: [],
        userId: "",
    };


    componentDidMount() {
        FriendsManager.getAllFriends()
            .then((friends) => {
                this.setState({
                    friends: friends
                });
            });
    }


    render() {
        return (
            <>
                <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                    <CardTitle>{this.props.friend.user.firstName} {this.props.friend.user.lastName}</CardTitle>
                    <CardText></CardText>
                    <Button size="sm" type="button" onClick={() => this.props.unfollow(this.props.friend.user.id)}>Unfollow</Button>
                </Card>
            </>
        )
    }
}
export default UserCard