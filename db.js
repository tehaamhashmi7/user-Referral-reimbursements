const mongoose = require('mongoose')
const env = require('dotenv')

env.config()

//Creating connection to the database
const connection = async function() {
    mongoose.connect(process.env.URI || 'mongodb://localhost:27017/referralDb', console.log("Connected to Mongodb"))
}

module.exports = connection