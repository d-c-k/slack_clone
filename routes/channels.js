const express = require('express')
const router = express.Router()

const User = require('../models/User')

let activeUserList = []
let inactiveUserList = []   

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

router.post('/new_channel', ensureAuthenticated, (req, res) => {
    const channelName = req.body.channelName
    const store = JSON.parse(req.body.store)
    
    console.log(store)
    res.redirect('/')
})
router.get('/test', ensureAuthenticated, (req, res) => {
    res.redirect('/')
})

module.exports = router