const express = require('express')
const app = express()
const http = require('http').Server(app)

const path = require('path')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const io = require('socket.io')(http)

require('dotenv').config()
require('./config/passport')(passport)

const mongoose = require('mongoose')

mongoose.connect(process.env.DB_HOST)
    .then(() => console.log('connected to db'))
    .catch(error => console.log(error))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: false}))

app.use(express.static(path.join(__dirname, 'assets')))

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})

app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

io.on('connection', socket => {
    console.log(`user connected`)

    socket.on('chat message', message => {
        console.log(`recieved message: ${message}`)
        io.emit('chat message', message)
    })

    socket.on('disconnect', () => {        
        console.log(`user disconnected`)
    })
})

http.listen(3000)