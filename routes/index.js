const express = require('express')
const router = express.Router()

let activeUserList = []
let inactiveUserList = []   

const User = require('../models/User')

const {ensureAuthenticated} = require('../config/auth')

router.get('/chat')

router.get('/', ensureAuthenticated, async(req, res) => {
    await User.find()
        .exec((error, users) => {
            if(error){
                return console.log(error)
            } else {
                activeUserList = []
                inactiveUserList = []  

                activeUsers = users.filter(user => user.is_active === true)
                inactiveUsers = users.filter(user => user.is_active === false)
                     
                activeUsers.map(user  => {
                    activeUserList.push(user.username)
                })
                inactiveUsers.map(user  => {
                    inactiveUserList.push(user.username)
                })
            }
        })
    res.render('home', {activeUserList, inactiveUserList})
})


module.exports = router