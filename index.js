const express = require('express')
const env = require('dotenv')
const connection = require('./db')

//Creating our express App
const app = express()

//Configuring the .env file
env.config()

app.use(express.json())

//Configuring routes
app.use('/api/user', require('./routes/refer'))

//Creating connection to mongodb
connection()

//Listening to the app
const port = process.env.PORT || 6000
app.listen(port, console.log(`Application started on port ${port}`))