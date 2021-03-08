const express = require('express')
const path = require('path')
const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'assets')))

app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

app.listen(3000)