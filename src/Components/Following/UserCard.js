import React, { Component } from "react";
import { Card, CardTitle, CardText } from 'reactstrap';
import FriendsManager from '../../Modules/FriendsManager';
import PersonAddDisabledTwoToneIcon from '@material-ui/icons/PersonAddDisabledTwoTone';


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
                <Card id="userCard">
                    <CardTitle>{this.props.friend.user.firstName} {this.props.friend.user.lastName}</CardTitle>
                    <PersonAddDisabledTwoToneIcon size="sm" onClick={() => this.props.unfollow(this.props.friend.user.id)}></PersonAddDisabledTwoToneIcon>
                </Card>
            </>
        )
    }
}
export default UserCard