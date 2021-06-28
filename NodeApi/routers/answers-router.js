const express = require("express");

var answers = require("../controller/answers-controller")();

let answersRoute = function(){

    answersRouter = express.Router();

    answersRouter.route("/answers")
        .post((req,res)=>{answers.post(req,res)})
        .get((req,res)=>{answers.get(req,res)});
    answersRouter.route("/answers/:answersid")
        .get((req,res)=>{answers.getById(req,res)})
        .put((req,res)=>{answers.put(req,res)});
    answersRouter.route("/answers/question/:questionid")
        .get((req,res)=>{answers.getByQuesId(req,res)});
    return answersRouter;
}

module.exports = answersRoute;