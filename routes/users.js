const express = require('express')
const router = express.Router()

// REGISTER

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {
    const {email, username, password} = req.body

    let errors = []

    console.log(`New username: ${username}, email: ${email} and password: ${password}`)
})

// LOG IN

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', (req, res) => {

})

module.exports = router