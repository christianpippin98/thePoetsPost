const promptURL = "https://ineedaprompt.com/dictionary/default/prompt?q="

export default {
    getPrompt(grammarArray) {
        return fetch(`${promptURL}${grammarArray}`).then(result => result.json())
    }
}