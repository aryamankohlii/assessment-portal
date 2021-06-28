const express = require("express");

var assesmentArea = require("../controller/assesmentArea-controller")();

let assesmentAreaRoute = function(){

    assesmentAreaRouter = express.Router();

    assesmentAreaRouter.route("/assesmentArea")
        .post((req,res)=>{assesmentArea.post(req,res)})
        .get((req,res)=>{assesmentArea.get(req,res)});
    assesmentAreaRouter.route("/assesmentArea/:assesmentAreaid")
        .get((req,res)=>{assesmentArea.getById(req,res)})
        .put((req,res)=>{assesmentArea.put(req,res)});
    assesmentAreaRouter.route("/assesmentArea/active/:isActive")
        .get((req,res)=>{assesmentArea.getActiveAssesmentArea(req,res)});

    return assesmentAreaRouter;
}

module.exports = assesmentAreaRoute;