var db = require('../connection');
const bcrypt = require('bcrypt');
const sgmail= require('@sendgrid/mail');
const { response } = require('express');

var userDocuments = function(){

    

    async function post(req,res){
        const userDetails = req.body;
        var password = userDetails.password;
        const API_KEY='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';
        var mailing =userDetails.email;
        sgmail.setApiKey(API_KEY);
        const message={
            to:'mailing',
            from:'aryamanmartinian@gmail.com',
            subject:'Access granted to assesment portal',
            text:'Hello.',
            html:'<p>Hello </p>',
        };
        sgmail.send(message)
        .then((response)=>console.log('Email sent....'))
        .catch((error)=>console.log(error.message));
 

        // Inserting User given data
        var sql = 'Insert into user set ?';

        try{

            //encrypting password
            
        
            const rounds = 5;

            await bcrypt.hash(password,rounds,async (err,hash)=>{
                try{
                if(err){
                    res.json({
                        status : "501",
                        message : err.sqlMessage
                    });
                }
                
                userDetails['encryptedpassword'] = hash;

                await db.query(sql,userDetails,(err,data)=>{
                    try{
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
                    }
                    catch(e){
                        console.log(e);
                    }
                })
                }
                catch(e){
                    console.log(e);
                }   
            });
        //executing db query
            
        
        }
        catch(e){
            console.log(e);
        }
    }

    async function get(req,res){

        
        var sql = 'Select * from user';
        try{
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
        catch(e){
            console.log(e);
        }
        
    }

    

    async function getById(req,res){
                
        
        var sql = 'Select * from user where id = ?';
        try{
            await db.query(sql,[req.params.id],(err,data)=>{

                if(err){
                    res.json({
                        status : "501",
                        message : err.sqlMessage
                    });
                }
                
    
                if(data !== 'undefined' && data.length > 0){
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
        catch(e){
            console.log(e);
        }
        
    }

    async function put(req,res){
        
        var sql = 'Select * from user where id = ?';
        var password = req.body.password;
        const rounds = 5;
        try{

            

            await db.query(sql,req.params.id,(err,data)=>{
                if(err){
                    res.json({
                        status : "501",
                        message : err.sqlMessage
                    });
                }
    
                if(data !== 'undefined' && data.length > 0){
                    var sql = 'update user set name = ?,email = ?,password = ?,encryptedpassword=?,isEmailVerified=?,isActive=?,roleid =? where id = ?';
                    
                    bcrypt.hash(password,rounds,(err,hash)=>{

                        if(err){
                            res.json({
                                status : "501",
                                message : err.sqlMessage
                            });
                        }

                        db.query(sql,[req.body.name,req.body.email,req.body.password,hash,req.body.isEmailVerified,req.body.isActive,req.body.roleid,req.params.id],(err,data)=>{
                            if(err){
                                res.json({
                                    status : "501",
                                    message : err.sqlMessage
                                });
                            }
        
                            res.json({
                                status : "200",
                                message : "User data is updated succesfully."
                            });
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
        catch(e){
            console.log(e);
        }
        
    }

    return {
        post : post,
        get : get,
        getById : getById,
        put : put
    }
}

module.exports = userDocuments;