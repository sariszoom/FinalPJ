const mongoose = require('mongoose')

const LoginSchema = mongoose.Schema(
    {
        Name: String,
        Username: String,
        Password: String
    },
    {
        versionKey: false
    }
)

module.exports = mongoose.model('Login',LoginSchema)