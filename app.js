const express = require('express')
const path = require('path')
const app = express()

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/slack_clone')
    .then(() => console.log('connected to db'))
    .catch(error => console.log(error))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: false}))

app.use(express.static(path.join(__dirname, 'assets')))

app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

app.listen(3000)