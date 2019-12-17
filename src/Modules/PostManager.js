  const remoteURL = "http://localhost:5002"
const userSpecifics = "?userId="

export default {
  getPost(id) {
    return fetch(`${remoteURL}/posts/${id}`).then(result => result.json())
  },
  getAllPersonalPosts(id) {
    return fetch(`${remoteURL}/posts${userSpecifics}${id}`).then(result => result.json())
  },
  getAllGlobalPosts() {
    return fetch(`${remoteURL}/posts?privacyTypeId=1`).then(result => result.json())
  },
  getAllLocalPosts() {
    return fetch(`${remoteURL}/posts?privacyTypeId=2`).then(result => result.json())
  },
  delete(id) {
    return fetch(`${remoteURL}/posts/${id}`, {
      method: "DELETE"
    })
      .then(result => result.json())
  },
  post(newPost) {
    return fetch(`${remoteURL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPost)
    }).then(data => data.json())
  },
  update(editedPost) {                                       // this is a put method
    return fetch(`${remoteURL}/posts/${editedPost.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedPost)
    }).then(data => data.json());
  },
  getAllEntryTypes() {
    return fetch(`${remoteURL}/entryTypes`).then(data => data.json());
  },
  getAllPrivacyTypes() {
    return fetch(`${remoteURL}/privacyTypes`).then(data => data.json());
  }
}