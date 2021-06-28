const express = require("express");

var subtrack = require("../controller/subtrack-controller")();

let subtrackRoute = function(){

    
    subtrackRouter = express.Router();

    
    subtrackRouter.route("/subtrack")
        .post((req,res)=>{subtrack.post(req,res)})
        .get((req,res)=>{subtrack.get(req,res)});
    subtrackRouter.route("/subtrack/:subtrackid")
        .get((req,res)=>{subtrack.getById(req,res)})
        .put((req,res)=>{subtrack.put(req,res)});
    subtrackRouter.route("/subtrack/active/:isActive")
        .get((req,res)=>{console.log("/subtrack/active/:isActive");subtrack.getActiveSubtrack(req,res)});
    subtrackRouter.route("/subtrack/assesmentarea/:assesmentareaid")
        .get((req,res)=>{console.log("/subtrack/assesmentarea/:assesmentareaid");subtrack.getByAssesmentAreaId(req,res)});

    return subtrackRouter;
}

module.exports = subtrackRoute;