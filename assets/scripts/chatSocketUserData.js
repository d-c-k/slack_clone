const socket = io()

const userData = document.getElementById('user')

const username = userData.dataset.username
const userId = userData.dataset.userid
const channel = userData.dataset.channelid

document.addEventListener('DOMContentLoaded', e => {
    socket.emit('updateList', () => {})
})

socket.emit('connectUser', {username, userId, channel})