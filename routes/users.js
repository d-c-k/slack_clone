const express = require('express')
const router = express.Router()


// LOG IN

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', (req, res) => {

})

// REGISTER

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {

})

module.exports = router