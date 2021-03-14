const userStatus = function(users){
    let activeUserList = []
    let inactiveUserList = []  

    activeUsers = users.filter(user => user.is_active === true)
    inactiveUsers = users.filter(user => user.is_active === false)
            
    activeUsers.map(user  => {
        activeUserList.push(user.username)
    })
    inactiveUsers.map(user  => {
        inactiveUserList.push(user.username)
    })

    return [inactiveUserList], [activeUserList]
}

module.exports = userStatus