const express = require('express');

var user = require('../controller/user-controller')();

let userRoute = function(){
    userRouter = express.Router();

    userRouter.route('/user')
        .post(async (req,res)=>{await user.post(req,res)})
        .get(async (req,res)=>{await user.get(req,res)});

    userRouter.route('/user/:id')
        .get(async (req,res)=>{await user.getById(req,res)})
        .put(async (req,res)=>{await user.put(req,res)});
    return userRouter;
}

module.exports = userRoute;