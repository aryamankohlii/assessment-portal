const express= require('express');

var login = require('../controller/login-controller')();

let loginRoute = function(){
    var loginRouter = express.Router();

    loginRouter.route('/auth-token')
            .post((req,res)=>{login.UserLogin(req,res)});

    return loginRouter;
}

module.exports = loginRoute;