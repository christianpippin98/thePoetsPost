const remoteURL = "http://localhost:5002"

export default {
  getTask(id) {
    return fetch(`${remoteURL}/users/${id}`).then(result => result.json())
  },
  getAllTasks() {
    return fetch(`${remoteURL}/users`).then(result => result.json())
  },
  delete(id) {
    return fetch(`${remoteURL}/users/${id}`, {
      method: "DELETE"
    })
      .then(result => result.json())
  },
  post(newUser) {
    return fetch(`${remoteURL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    }).then(data => data.json())
  },
  update(editedUser) {                                       // this is a put method
    return fetch(`${remoteURL}/users/${editedUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedUser)
    }).then(data => data.json());
  }
}