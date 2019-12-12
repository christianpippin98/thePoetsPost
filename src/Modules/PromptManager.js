const promptURL = "https://ineedaprompt.com/dictionary/default/prompt?q="

export default {
    getPrompt() {
      return fetch(`${promptURL}`).then(result => result.json())
    }
}