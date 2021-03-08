const express = require('express')
const router = express.Router()

const user = false

router.get('/', (req, res) => {
    if(user){
        res.render('home')
    } else {
        res.redirect('/users/login')
    }
})


module.exports = router