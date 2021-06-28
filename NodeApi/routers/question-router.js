const express = require("express");

var question = require("../controller/question-controller")();

let questionRoute = function(){

    questionRouter = express.Router();

    questionRouter.route("/question")
        .post((req,res)=>{question.post(req,res)})
        .get((req,res)=>{question.get(req,res)});
    questionRouter.route("/question/:questionid")
        .get((req,res)=>{question.getById(req,res)})
        .put((req,res)=>{question.put(req,res)});
    questionRouter.route("/questionanswers")
        .post((req,res)=>{question.postQuestionAnswers(req,res)})
    return questionRouter;
}

module.exports = questionRoute;