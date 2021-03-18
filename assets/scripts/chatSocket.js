const socket = io()

const form = document.getElementById('form')
const input = document.getElementById('input')
const chatWindow = document.getElementById('innerChatWindow')
const userData = document.getElementById('user')
const username = userData.dataset.username
const userId = userData.dataset.userId

socket.emit('setUser', username)

form.addEventListener('submit', e => {
    e.preventDefault()

    if(input.value){
        socket.emit('chat message', input.value)
    }
    input.value = ''    
})

socket.on('chat message', data => {
    let item = document.createElement('P')
    item.textContent = `${data.username}: ${data.message}`
    chatWindow.appendChild(item)

    console.log(message)
})