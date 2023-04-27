require('dotenv').config()

const mongoose = require('mongoose')

const uri = 'mongodb+srv://rsmikesahbaz:1234@legacy-project-cluster.8v0cpss.mongodb.net/test'

async function main () {
  await mongoose.connect(uri)
  console.log('Connected on main')
}

main().catch(err => console.log(err))
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', function () {
  console.log('DB Connected successfully')
})

module.exports = mongoose
