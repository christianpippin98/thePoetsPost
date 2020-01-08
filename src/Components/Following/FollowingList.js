import React, { Component } from "react"
import UserCard from "./UserCard"
import FriendsManager from "../../Modules/FriendsManager"
import "./FollowingList.css"

class FollowingList extends Component {
    state = {
        posts: [],
        userId: "",
        loggedInUserId: "",
        friends: [],
    }


    componentDidMount() {
        const loggedInUser = JSON.parse(sessionStorage.getItem("credentials"))
        FriendsManager.getAllFriends(loggedInUser.id)
            .then((friends) => {
                this.setState({
                    friends: friends
                })
            })
    }

    


    unfollow = id => {
        const currentUser = JSON.parse(sessionStorage.getItem("credentials"))
        FriendsManager.getFriend(currentUser.id, id).then((response) => {
            FriendsManager.delete(response[0].id)
            .then(() => {
                FriendsManager.getAllFriends(currentUser.id)
                    .then((friends) => {
                        this.setState({
                            friends: friends
                        })
                    })
            })
        })
    }


    render() {
        return (
            <>
                <div id="followingList" className="container-cards">
                    {this.state.friends.map(friend =>
                        <UserCard
                        user={friend.userId}
                        key={friend.id}
                        friend={friend}
                        unfollow={this.unfollow}
                        {...this.props}
                        />
                    )}
                </div>
            </>
        )
    }
}

export default FollowingList