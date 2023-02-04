const Login = require('../models/Login.js')

exports.index = (req,res) => {
    res.send('<h1>Login Application</h1><hr><a href="/api/Login">รายชื่อลูกค้า</a>')
}

exports.findAll = (req, res) => {
    Login.find().then(data => {
        res.json(data)
    }).catch(err => {
        res.status(500).send({
            msg: err.message
        })
    })
}