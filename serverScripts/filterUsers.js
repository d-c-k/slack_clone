let activeUserList = []
let inactiveUserList = []  

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

module.exports = filterUsers