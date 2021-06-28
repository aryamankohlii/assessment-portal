const express = require('express');

var controlls = require('../controller/controlls-controller')();

let controllsRoute = function(){
    controllsRouter = express.Router();

    controllsRouter.route('/controlls')
        .post((req,res)=>{controlls.post(req,res)})
        .get((req,res)=>{controlls.get(req,res)});

    controllsRouter.route('/controlls/:id')
        .get((req,res)=>{controlls.getById(req,res)})
        .put((req,res)=>{controlls.put(req,res)});
    return controllsRouter;
}

module.exports = controllsRoute;