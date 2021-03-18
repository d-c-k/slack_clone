const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcrypt')

const User = require('../models/User.js')

// REGISTER

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', async(req, res) => {
    const {email, username, password} = req.body

    const errors = []

    const regex = /^[A-Za-z0-9]+$/
    
    if(!email){
        errors.push({msg: "Required field 'Email' empty"})
    }
    if(!username){
        errors.push({msg: "Required field 'Username' empty"})
    }
    if(!password){
        errors.push({msg: "Required field 'Password' empty"})
    }
    if(password.length > 0 && password.length < 5){
        errors.push({msg: 'Minimum password length is 5 characters'})
    }
    if(!regex.test(password)){
        errors.push({msg: 'Password may only contain letters and numbers'})
    }
    await User.findOne({email: email})
        .then(user =>{
            if(user){
                errors.push({msg: 'Email already registered'})
            }
        })
    await User.findOne({username: username})
        .then(user =>{
            if(user){
                errors.push({msg: 'Username already registered'})
            }
        })
    if(errors.length > 0){
        res.render('register', { status_msg: errors, email, username, password})        
    } else {
        const newUser = new User({
            email, username, password
        })        

        bcrypt.hash(password, 10, function(error, hash){
            newUser.password = hash
            
            newUser
                .save()
                .then(value => {
                    req.flash('success_msg', 'User registered')
                    res.redirect('/users/login')
                })
                .catch(error => console.log(error))
        })
    }
})

// LOG IN

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', 
    passport.authenticate('local', {
        failureRedirect: '/users/login',
        failureFlash: true        
    }),
    (req, res) => {
        User.findOne({username: req.user.username}, (error, user, data) => {
            if(error) res.send(error)
            user.is_active = true
            user.save(error => {
                if(error){
                    return console.log(error)
                } else {
                    req.session.user = user
                    res.redirect('/')
                }
            })
        })
    }
)

// LOG OUT

router.get('/logout', (req, res) => {
    req.logout()
    req.flash('success_msg', 'Session terminated')
    res.redirect('/users/login')
})

module.exports = router