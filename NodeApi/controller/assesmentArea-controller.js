var db = require("../connection");

var assesmentAreaDocuments = function(){

    
    async function post(req,res){
        
        var sql = "insert into assesment_area  SET ?";
        let x={
            'id':req.body.id,
            'name':req.body.name,
            'isactive':req.body.isactive,
            'createdbyuser':req.user,
            'isprivate':req.body.isprivate,
            'minrate': req.body.minrate,
            'maxrate' : req.body.maxrate,
            'comment' : req.body.comment,
            'commentenable' : req.body.commentenable,
            'imageupload' : req.body.imageupload
        }
        await db.query(sql,x,(err,data)=>{

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
        var sql = "select s.id,s.name,s.isactive,s.isprivate,s.minrate,s.maxrate,u.name as username from assesment_area s left join user u on u.id=s.createdbyuser ";

        await db.query(sql,(err,data)=>{
            if(err){
                res.json({
                    status : "501",
                    message : err.sqlMessage
                });
            }
            
            if(data !== 'undefined' ){
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
        var sql = "select s.id,s.name,s.isactive,s.isprivate,s.minrate,s.maxrate,u.name as username from assesment_area s left join user u on u.id=s.createdbyuser where s.id = ?";
        
        await db.query(sql,[req.params.assesmentAreaid],(err,data)=>{
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
        
        var sql = 'Select * from assesment_area where id = ?';

        await db.query(sql,req.params.assesmentAreaid,(err,data)=>{
            if(err){
                res.json({
                    status : "501",
                    message : err.sqlMessage
                });
            }

            if(data !== undefined ){
                var sql = 'update assesment_area set name = ?,isactive=?,createdbyuser=?,isprivate=?,minrate=?,maxrate=?,comment=?,commentenable=?,imageupload=? where id = ?';
                db.query(sql,[req.body.name,req.body.isactive,req.user,req.body.isprivate,req.body.minrate,req.body.maxrate,req.body.comment,req.body.commentenable,req.body.imageupload,req.params.assesmentAreaid],(err,data)=>{
                    if(err){
                        res.json({
                            status : "501",
                            message : err.sqlMessage
                        });
                    }

                    res.json({
                        status : "200",
                        message : "assesmentArea data is updated succesfully."
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

    async function getActiveAssesmentArea(req,res){
        var sql = 'select distinct id, name,isprivate,minrate,maxrate from assesment_area where isactive = ?';
        await db.query(sql,[req.params.isActive],(err,data)=>{
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
        getActiveAssesmentArea : getActiveAssesmentArea
    }
}

module.exports = assesmentAreaDocuments;