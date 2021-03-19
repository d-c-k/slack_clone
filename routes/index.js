const express = require('express')
const router = express.Router()

let activeUserList = []
let inactiveUserList = []   

const User = require('../models/User')
const Channel = require('../models/Channel')

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

router.post('/new_channel', ensureAuthenticated, async(req, res) => {
    const channelName = req.body.channelName
    const store = JSON.parse(req.body.store)

    let errors = []

    if(!channelName){
        errors.push({msg: "Required field 'Channel name' empty"})
    }
    if(store.length < 3){
        errors.push({msg: 'Include at least two more users than yourself'})
    }
    if(errors.length > 0){
        let user = req.session.user.username
        let id = req.session.user._id
        res.render('home', {activeUserList, inactiveUserList, user, id, status_msg: errors})
    } else {
        await Channel.findOne({$and: [{userIds: { $size: store.length }}, {userIds: { $all : [store]}}]})
            .then(channel => {
                if(channel){
                    console.log('already regged') 
                    res.redirect('/')  
                } else {  
                const newChannel = new Channel({
                    channelName: channelName, 
                    userIds: store
                })
                newChannel
                    .save()
                    .then(value => {
                        req.flash('success_msg', 'New channel created')
                        res.redirect('/')
                    })
                    .catch(error => console.log(error))
                }
            }) 
    }    
})

router.post('/direct_msg', ensureAuthenticated, async(req, res) => {  
    await Channel.findOne({$and: [{userIds: { $size: 2 }}, {userIds: { $all : [req.session.user._id, req.body.userId]}}]})
        .then(channel => {
            if(channel){
                console.log('already regged') 
                res.redirect('/')  
            } else {        
            const newChannel = new Channel({
                channelName: `${req.session.user.username} - ${req.body.username}`, 
                userIds: [req.session.user._id, req.body.userId]
            })
            newChannel
                .save()
                .then(value => {
                    res.redirect('/')
                })
                .catch(error => console.log(error))
            }  
    })  
})

module.exports = router