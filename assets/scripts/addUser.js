document.addEventListener('DOMContentLoaded', e => {
    
    const listedUsers = document.getElementById('listedUsers')
    const users = document.getElementsByClassName('userBtn')
    let userArray = Array.from(users)
    const selectedUsersArray = []
    const statusMsg = document.getElementById('FEmsg')
    const current = document.getElementById('initial')
    const store = document.getElementById('store')
    console.log(current)

    selectedUsersArray.push(
        {
            username: current.innerHTML,
            userId: current.dataset.userId
        }
    )
    
    userArray.map(user => {
        user.addEventListener('click', e => {
            if(selectedUsersArray.filter(item => item.userId === user.id).length < 1){
                statusMsg.innerHTML = ''
                while(listedUsers.firstChild){
                    listedUsers.removeChild(listedUsers.lastChild)
                }
                selectedUsersArray.push(
                    {
                        username: user.innerHTML,
                        userId: user.id
                    }
                )
                selectedUsersArray.map(item => {
                    let user = document.createElement('li')
                    user.textContent = item.username
                    listedUsers.appendChild(user)
                })
            } else {
                statusMsg.innerHTML = 'User removed'
                while(listedUsers.firstChild){
                    listedUsers.removeChild(listedUsers.lastChild)
                }
                let index = selectedUsersArray.map(item => item.userId).indexOf(user.id)
                if(index !== -1){
                    selectedUsersArray.splice(index, 1)
                }
                selectedUsersArray.map(item => {
                    let user = document.createElement('li')
                    user.textContent = item.username
                    listedUsers.appendChild(user)
                })
            }
            let ids = selectedUsersArray.map(({username, ...item}) => item.userId)
            ids.shift()
            store.setAttribute('value', JSON.stringify(Object.values(ids)))
        })
    })

})