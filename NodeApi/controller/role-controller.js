var db = require("../connection");

var roleDocuments = function(){

    async function post(req,res){
        var sql = "insert into role SET ?";
        
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
        var sql = "select * from role";

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
        
        console.log("inside getById");
        var sql = "select * from role where id = ?";
        console.log("req.params.roleid : ",[req.params.roleid]);
        await db.query(sql,[req.params.roleid],(err,data)=>{
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
        var sql = 'Select * from role where id = ?';
        
        await db.query(sql,req.params.roleid,(err,data)=>{
            if(err){
                res.json({
                    status : "501",
                    message : err.sqlMessage
                });
            }
            

            if(data !== undefined ){
                var sql = 'update role set role = ?,isactive=? where id = ?';
                db.query(sql,[req.body.role,req.body.isactive,req.params.roleid],(err,data)=>{
                    if(err){
                        res.json({
                            status : "501",
                            message : err.sqlMessage
                        });
                    }

                    res.json({
                        status : "200",
                        message : "Role data is updated succesfully."
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

    async function getActiveRole(req,res){
        var sql = 'select distinct id, role from role where isactive = ?';
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
        getActiveRole : getActiveRole
    }
}

module.exports = roleDocuments;