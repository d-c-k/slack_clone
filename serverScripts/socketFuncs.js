let users = []

let activeUserList = []
let inactiveUserList = [] 

const setUser = (username, userId, socketId, channel) => {
    const user = {
        username,
        userId,
        socketId,
        channel
    }

    users.push(user)
    return user
}

const removeUser = socketId => {
    let index = users.map(item => item.socketId).indexOf(socketId)
    if(index !== -1){
        return users.splice(index, 1)[0]
    }
}

const currentUser = socketId => {
    const user = users.find(item => item.socketId === socketId)
    return user
}

const filterUsers = (users, currentUserId) => {
    activeUserList = []
    inactiveUserList = []

    activeUsers = users.filter(user => user.is_active === true && user._id != currentUserId)
    inactiveUsers = users.filter(user => user.is_active === false && user._id != currentUserId)
            
    activeUsers.map(user  => {
        activeUserList.push(
            {
                username: user.username, 
                userId: user._id
            }
        )
    })
    inactiveUsers.map(user  => {
        inactiveUserList.push(
            {
                username: user.username, 
                userId: user._id
            }
        )
    })

    return [
        activeUserList,
        inactiveUserList
    ]
}

module.exports = {
    setUser,
    removeUser,
    currentUser,
    filterUsers
}