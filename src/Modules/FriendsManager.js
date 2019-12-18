const remoteURL = "http://localhost:5002"
const userSpecifics = "?loggedInUserId="
const expandUser = "&_expand=user"

export default {
  addFriend(userId) {
    return fetch(`${remoteURL}/friends`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userId)
    }).then(data => data.json())
  },
  getAllFriends(id) {
    return fetch(`${remoteURL}/friends${userSpecifics}${id}${expandUser}`).then(result => result.json())
  },
  delete(id) {
    return fetch(`${remoteURL}/friends/${id}`, {
      method: "DELETE"
    })
      .then(result => result.json())
  }
}