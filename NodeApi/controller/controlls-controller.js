var db = require('../connection');
var config = require('../config');

var controlls = require('../Model/controllsModel');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

var controllsDocuments = function(){

    async function post(req,res){
        const controllsDetails = req.body;
    
        // Inserting controlls given data
        var sql = 'Insert into controlls set ?';

        //executing db query
        await db.query(sql,controllsDetails,(err,data)=>{
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
        })
    }


    async function get(req,res){
        var sql = 'Select * from controlls';

        await db.query(sql,(err,data)=>{

            if(err){
                res.json({
                    status : "501",
                    message : err.sqlMessage
                });
            }

            res.json(data);
        });
    }


    async function getById(req,res){

        var sql = 'Select * from controlls where id = ?';

        await db.query(sql,[req.params.id],(err,data)=>{

            if(err){
                res.json({
                    status : "501",
                    message : err.sqlMessage
                });
            }

            if(data !== 'undefined' ){
                res.json(data[0]);
            }
            else{
                res.json({
                    status : "404",
                    message : "Invalid request, record does not exist."
                });
            }
        });
    }
    
    async function put(req,res){

        var sql = 'Select * from controlls where id = ?';

        await db.query(sql,req.params.id,(err,data)=>{
            if(err){
                res.json({
                    status : "501",
                    message : err.sqlMessage
                });
            }

            if(data !== 'undefined' ){
                var sql = 'update controlls set name = ?,isActive=? where id = ?';
                db.query(sql,[req.body.name,req.body.isActive,req.params.id],(err,data)=>{
                    if(err){
                        res.json({
                            status : "501",
                            message : err.sqlMessage
                        });
                    }

                    res.json({
                        status : "200",
                        message : "controlls data is updated succesfully."
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
    return {
        post : post,
        get : get,
        getById : getById,
        put : put
    }
}

module.exports = controllsDocuments;