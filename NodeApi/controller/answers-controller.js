

var db = require("../connection");

var answersDocuments = function(){

    async function post(req,res){
        var sql = "insert into answers SET ?";

        await db.query(sql,req.body,(err,data)=>{

            if(err){
                res.json({
                    status : "501",
                    message : err.sqlMessage
                });
            }

            res.json({
                status : "200",
                message : "Data inserted succesfully."
            });
            
        });
    }
 

    async function get(req,res){
        var sql = "select * from answers";

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
        
        var sql = "select * from answers where id = ?";
       
        await db.query(sql,[req.params.answersid],(err,data)=>{
            if(err){
                    res.json({
                        status : "501",
                        message : err.sqlMessage
                    });
                }

            if(data !== undefined){
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
        var sql = 'Select * from answers where id = ?';

        await db.query(sql,req.params.answersid,(err,data)=>{
            if(err){
                    res.json({
                        status : "501",
                        message : err.sqlMessage
                    });
                }

            if(data !== undefined ){
                var sql = 'update answers set question_id = ?,answertext=?,answerscore=? where id = ?';
                db.query(sql,[req.body.question_id,req.body.answertext,req.body.answerscore,req.params.answersid],(err,data)=>{
                    if(err){
                        res.json({
                            status : "501",
                            message : err.sqlMessage
                        });
                    }

                    res.json({
                        status : "200",
                        message : "answers data is updated succesfully."
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

    async function getByQuesId(req,res){
        var sql = 'select * from answers where question_id = ?';

        await db.query(sql,req.params.questionid,(err,data)=>{

            if(err){
                res.json({
                    status : "501",
                    message : err.sqlMessage
                });
            }
            
            if(data !== undefined ){
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
    return {
        post : post,
        get : get,
        getById : getById,
        put : put,
        getByQuesId : getByQuesId
    }
}

module.exports = answersDocuments;