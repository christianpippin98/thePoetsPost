  
const remoteURL = "http://localhost:5002"
const userSpecifics = "?userId="
export default {
  getPost(id) {
    return fetch(`${remoteURL}/posts/${id}`).then(result => result.json())
  },
  getAllPosts(id) {
    return fetch(`${remoteURL}/posts${userSpecifics}${id}`).then(result => result.json())
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
  }
}