const express = require('express')
const app = express()
const port = 3001
const cors = require('cors')
const router = require('./routes/router')

app.use(cors())
app.use(express.json())
app.use(router)
// const userController = require('./controllers/controller')
// app.post('/user/login', userController.getUser)
// app.post('/user/register', userController.postUser)

app.listen(port, () => {
  console.log('listening on http://localhost:3001')
})

module.exports = app
