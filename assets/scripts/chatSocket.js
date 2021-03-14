const socket = io()

const form = document.getElementById('form')
const input = document.getElementById('input')
const chatWindow = document.getElementById('chatWindow')

form.addEventListener('submit', e => {
    e.preventDefault()

    if(input.value){
        socket.emit('chat message', input.value)
    }
    input.value = ''    
})

socket.on('chat message', message => {
    let item = document.createElement('li')
    item.textContent = message
    chatWindow.appendChild(item)

    console.log(message)
})