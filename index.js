const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { port, dbURI } = require('./config/environment')

const app = express()

// ! Connecting to the MongoDB
mongoose.connect(
  dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) return console.log(err)
    console.log('Mongo is connected!')
  }
)

app.use(bodyParser.json())

app.listen(port, () => console.log(`Port ${port} is up and running`))