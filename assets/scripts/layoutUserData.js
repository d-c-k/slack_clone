const profileBtn = document.getElementById('profileBtn')
const newChanBtn = document.getElementById('newChanBtn')

profileBtn.innerHTML = '<< Chat <<'
profileBtn.setAttribute('href', '/')

newChanBtn.setAttribute('style', 'display: none;')

const dataBtns = document.getElementsByClassName('userBtn')
const btnArr = [...dataBtns]

const currentUser = document.getElementById('user')

let current = currentUser.dataset.userid

document.getElementById(current).setAttribute('style', 'display: grid')

btnArr.map(btn => {
    btn.addEventListener('click', e => {
        document.getElementById(current).setAttribute('style', 'display: none')
        
        document.getElementById(btn.dataset.id).setAttribute('style', 'display: grid')
        current = btn.dataset.id
    })
})