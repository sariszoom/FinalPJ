// import Lib
const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

//MongoDB
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const dbConfig = require('./config/mongodb.config.js')
const Login = require('./models/Login.js')

//Initial express app
const cors = require('cors')
const app = express();
const PORT = 3000;

// Add the Express-session options
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecretkey",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

//Parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Serving public file
app.use(express.static(__dirname));

//Cookie parser middleware
app.use(cookieParser());

//Setup authentication credential
const myusername = 'admin'
const mypassword = '12345'

// a variable to save a session
var session;

//page =>Welcome
app.get('/',(req,res) => {
    session = req.session;
    if(session.userid){
        res.send("Welcome User <a href=\'/logout'>click to logout</a>");
    }else
    res.sendFile('views/Login.html',{root:__dirname})
});

app.get('/loginAdmin',(req,res) => {
    res.sendFile('views/loginAdmin.html',{root:__dirname})
});

app.get('/login',(req,res) => {
    res.sendFile('views/Login.html',{root:__dirname})
});
// page =>User
app.post('/user',(req,res)=>{
    if(req.body.username == myusername && req.body.password == mypassword){
        session=req.session;
        session.useeid=req.body.username;
        console.log(req.session)
        res.send(`Hello, welcome <a href=\'/logout'>click to logout</a>`);

    }
    else{
        res.send('Invalid username or password');
    }
})

app.post('/user-admin',(req,res)=>{
    if(req.body.username == myusername && req.body.password == mypassword){
        session=req.session;
        session.useeid=req.body.username;
        console.log(req.session)
        res.send(`Hello2 <a href=\'/logout'>click to logout</a>`);

    }
    else{
        res.send('Invalid username or password');
    }
})

//page => Logout
app.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/');
});

//page Error
app.get('*',(req,res)=>{
    res.sendFile('views/404.html',{root:__dirname})
});

app.listen(PORT,() => console.log(`server Running at ${PORT}`));