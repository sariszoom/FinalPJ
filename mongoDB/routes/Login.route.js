module.exports = (app) => {
    const Login = require("../controllers/Login.controller.js")

    app.get('/', Login.index);
    app.get('/api/Login',Login.findAll);
}