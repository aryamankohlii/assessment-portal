var db = require("../connection");

var subtrackDocuments = function(){

    async function post(req,res){
        var sql = "insert into subtrack SET ?";
        
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
        var sql = "select s.id,s.name,s.isactive,aa.name as assesmentarea,aa.id as assesment_area_id from subtrack s left join assesment_area aa on s.assesment_area_id = aa.id";

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
        var sql = "select s.id,s.name,s.isactive,aa.name as assesmentarea,aa.id as assesment_area_id from subtrack s left join assesment_area aa on s.assesment_area_id = aa.id where s.id = ?";
        
        await db.query(sql,[req.params.subtrackid],(err,data)=>{
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
        var sql = 'Select * from subtrack where id = ?';
        
        await db.query(sql,req.params.subtrackid,(err,data)=>{
            if(err){
                res.json({
                    status : "501",
                    message : err.sqlMessage
                });
            }
              

            if(data !== undefined ){
                var sql = 'update subtrack set name = ?,assesment_area_id=?,isactive=? where id = ?';
                db.query(sql,[req.body.name,req.body.assesment_area_id,req.body.isactive,req.params.subtrackid],(err,data)=>{
                    if(err){
                        res.json({
                            status : "501",
                            message : err.sqlMessage
                        });
                    }
                    res.json({
                        status : "200",
                        message : "subtrack data is updated succesfully."
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
    
    async function getActiveSubtrack(req,res){
        var sql = "select s.id,s.name,s.isactive,aa.name as assesmentarea,aa.id as assesment_area_id from subtrack s left join assesment_area aa on s.assesment_area_id = aa.id where s.isactive= ?";
        
        await db.query(sql,[req.params.isActive],(err,data)=>{
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
                console.log('a',data);
                res.json({
                    status : "403",
                    message : "No Data Found."
                })
            }
        });
    }

    async function getByAssesmentAreaId(req,res){
        var sql ="select s.id,s.name,s.isactive,aa.name as assesmentarea,aa.id as assesment_area_id from subtrack s left join assesment_area aa on s.assesment_area_id = aa.id where s.assesment_area_id= ?";
        
        await db.query(sql,[req.params.assesmentareaid],(err,data)=>{
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

    return {
        post : post,
        get : get,
        getById : getById,
        put : put,
        getActiveSubtrack:getActiveSubtrack,
        getByAssesmentAreaId:getByAssesmentAreaId
    }
}

module.exports = subtrackDocuments;