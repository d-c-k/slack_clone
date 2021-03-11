const express = require('express')
const router = express.Router()

let userList = []
const User = require('../models/User')

const {ensureAuthenticated} = require('../config/auth')

router.get('/', ensureAuthenticated, async(req, res) => {
    await User.find()
        .exec((error, users) => {
            if(error){
                return console.log(error)
            }  
            userList = []            
            users.map(user  => {
                userList.push(user.username)
            })
            
            console.log(userList)
        })
    res.render('home', {userList})
})


module.exports = router