const express = require('express')
const router = express.Router()

let activeUserList = []
let inactiveUserList = []   

const User = require('../models/User')

const {ensureAuthenticated} = require('../config/auth')

router.get('/new_channel', ensureAuthenticated, async(req, res) => {
    await User.find()
        .exec((error, users) => {
            if(error){
                return console.log(error)
            } else {
                activeUserList = []
                inactiveUserList = []  

                activeUsers = users.filter(user => user.is_active === true && user._id != req.session.user._id)
                inactiveUsers = users.filter(user => user.is_active === false)
                     
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

                let user = req.session.user.username
                let currentUserId = req.session.user._id
                res.render('newChat', {activeUserList, inactiveUserList, user, currentUserId})                
            }
        })
})

router.post('/chat:/id', (req, res) => {
    
})

router.get('/update', (req, res) => {
    
})

router.get('/', ensureAuthenticated, async(req, res) => {
    await User.find()
        .exec((error, users) => {
            if(error){
                return console.log(error)
            } else {
                activeUserList = []
                inactiveUserList = []  

                activeUsers = users.filter(user => user.is_active === true && user._id != req.session.user._id)
                inactiveUsers = users.filter(user => user.is_active === false)
                     
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

                let user = req.session.user.username
                console.log(req.session.user)
                res.render('home', {activeUserList, inactiveUserList, user})
            }
        })
})


module.exports = router