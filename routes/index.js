const express = require('express')
const router = express.Router()

let activeUserList = []
let inactiveUserList = []   

const User = require('../models/User')

const {ensureAuthenticated} = require('../config/auth')

router.get('/', ensureAuthenticated, async(req, res) => {
    await User.find()
        .exec((error, users) => {
            if(error){
                return console.log(error)
            } else {
                activeUserList = []
                inactiveUserList = []  

                activeUsers = users.filter(user => user.is_active === true && user._id != req.session.user._id)
                inactiveUsers = users.filter(user => user.is_active === false && user._id != req.session.user._id)
                     
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
                let id = req.session.user._id
                res.render('home', {activeUserList, inactiveUserList, user, id})
            }
        })
})

router.post('/new_channel', ensureAuthenticated, (req, res) => {
    const channelName = req.body.channelName
    const store = JSON.parse(req.body.store)
    
    console.log(store)
    res.redirect('/')
})

module.exports = router