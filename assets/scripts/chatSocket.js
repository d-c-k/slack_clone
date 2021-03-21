const socket = io()

const form = document.getElementById('form')
const input = document.getElementById('input')
const chatWindow = document.getElementById('innerChatWindow')
const userData = document.getElementById('user')
const username = userData.dataset.username
const userId = userData.dataset.userid
const channel = userData.dataset.channelid

document.addEventListener('DOMContentLoaded', e => {
    socket.emit('updateList', )
})

if(channel !== 'general'){
    socket.emit('setChannel', {username, userId, channel})
} else {
    socket.emit('connectUser', {username, userId, channel})
}

socket.on('channelData', ({channelName, messages}) => {
    while(chatWindow.firstChild){
        chatWindow.removeChild(chatWindow.lastChild)
    }
    if(messages.length > 0){
        messages.map(msgItem => {
            let item = document.createElement('P')
            item.textContent = `${msgItem.senderId.username}: ${msgItem.messageBody}`
            chatWindow.appendChild(item)
        })
    }
})

form.addEventListener('submit', e => {
    e.preventDefault()

    if(input.value){
        socket.emit('chatMessage', input.value)
    }
    input.value = ''    
})

socket.on('chatMessage', data => {
    let item = document.createElement('P')
    item.textContent = `${data.username}: ${data.message}`
    chatWindow.appendChild(item)
})

