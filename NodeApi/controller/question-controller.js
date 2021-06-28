var db = require("../connection");
var question = require("../Model/questionModel");
var answersMod = require("../Model/answersModel");

var questionDocuments = function(){


    async function post(req,res){
        var sql = "insert into question SET ?";

        console.log("req.body : ",req.body);

        var ques = new question(req.body);

        console.log("ques : ",ques);

        await db.query(sql,ques,(err,data)=>{

            if(err){
                res.json({
                    status : "501",
                    message : err.sqlMessage
                });
            }

            if(data !== 'undefined' ){
                console.log("returned data : ",data.insertId);

            }
            
            res.json({
                status : "200",
                message : "Data inserted succesfully."
            });
            
        });
    }


    async function get(req,res){

        var sql = "select question.id,question.questiontext,question.controllid ,question.isactive,question.score,question.minrate,question.maxrate,question.subtrackid,s.name as subtrack, question.assesment_area_id,aa.name as assesmentarea,question.comment from question left join subtrack s on question.subtrackid = s.id left join assesment_area aa on question.assesment_area_id = aa.id";

        await db.query(sql,(err,data)=>{
            if(err){
                res.json({
                    status : "501",
                    message : err.sqlMessage
                });
            }
            if(data !== 'undefined'){
                res.json(data);
            }
            else{
                res.json({
                    status : "403",
                    message : "No Data Found."
                })
            }
        });
    }
 

    async function getById(req,res){
        var sql = "select question.id,question.questiontext,question.controllid ,question.isactive,question.score,question.minrate,question.maxrate,question.subtrackid,s.name as subtrack, question.assesment_area_id,aa.name as assesmentarea,question.comment from question left join subtrack s on question.subtrackid = s.id left join assesment_area aa on question.assesment_area_id = aa.id where question.id = ?";
        console.log("req.params.questionid : ",[req.params.questionid]);
        await db.query(sql,[req.params.questionid],(err,data)=>{
            if(err){
                res.json({
                    status : "501",
                    message : err.sqlMessage
                });
            }
            if(data !== undefined ){
                res.json(data[0]);
            }
            else{
                res.json({
                    status : "403",
                    message : "No Data Found."
                })
            }
        });
    }


    async function put(req,res){
        
        var sql = 'Select * from question where id = ?';

        await db.query(sql,req.params.questionid,(err,data)=>{
            if(err){
                res.json({
                    status : "501",
                    message : err.sqlMessage
                });
            }

            if(data !== undefined ){
                console.log(req.body);
                var sql = 'update question set questiontext = ?,controllid=?,isactive=?,score=?,minrate=?,maxrate=?,subtrackid=?,assesment_area_id=?,comment=?,commentenable=?,imageupload=? where id = ?';
                db.query(sql,[req.body.questiontext,req.body.controllid,req.body.isactive,req.body.score,req.body.minrate,req.body.maxrate,req.body.subtrackid,req.body.assesment_area_id,req.body.comment,req.body.commentenable,req.body.imageupload,req.params.questionid],(err,data)=>{
                    if(err){
                        res.json({
                            status : "501",
                            message : err.sqlMessage
                        });
                    }

                    res.json({
                        status : "200",
                        message : "question data is updated succesfully."
                    });
                });
            }
            else{
                res.json({
                    status : "404",
                    message : "Invalid request, record does not exist."
                });
            }
        });
    }

    async function postQuestionAnswers(req,res){
        
        var sql = "insert into question SET ?";

        console.log("req.body : ",req.body);

        var ques = new question(req.body);

        console.log("ques : ",ques);

        await db.query(sql,ques,(err,data)=>{

            if(err){
                res.json({
                    status : "501",
                    message : err.sqlMessage
                });
            }
           
            if(data !== 'undefined' ){
                
                var answers = req.body.answers;

                answers.forEach(element => {
                    element.question_id = data.insertId;
                    
                    var ans = new answersMod(element);

                    var ansSql = "insert into answers SET ?";

                    db.query(ansSql,ans,(err,data)=>{
                        if(err){
                            res.json({
                                status : "501",
                                message : err.sqlMessage
                            });
                        }
                    });
                    
                });
                
                res.json({
                    status : "200",
                    message : "Data inserted succesfully."
                });
            }
            else{
                res.json({
                    status : "403",
                    message : "Issue while inserting question."
                });
            }
        });
    }

    return {
        post : post,
        get : get,
        getById : getById,
        put : put,
        postQuestionAnswers:postQuestionAnswers
    }
}

module.exports = questionDocuments;