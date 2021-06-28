var config = require('../config');
var db = require('../connection');
var user = require('../Model/userModel');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');



var loginDocuments = function() {

    async function UserLogin(req,res){

        var sql = 'select us.*,ro.role from user us left join role ro on us.id = ro.id where email like ?';
        

        await db.query(sql,[req.body.email],async (err,data)=>{
            if(err){
                res.json({
                    status : "501",
                    message : err.sqlMessage
                });
            }
            
            

            if(data.length > 1){
                response = {
                    status : 403,
                    message : "Invalid no of data rows."
                }
                res.json(response);
            }

            if(typeof data !== 'undefined' && data.length == 1){

                    await bcrypt.compare(req.body.password,data[0].encryptedpassword,(err,response)=>{
                        // if response == true, password matched
                        // else wrong password
                        if(err){
                            res.json( {
                                status : "501",
                                message : err.sqlMessage
                            });
                        }
                        
                     
                        if(response){
                            var userData = new user(data).getUserDetails();
                    
                            var token = generateAccessToken(userData[0]);
                        
                            userData[0]["token"]=token;
                            
                            res.json(userData);
                        }
                        else{
                            response = {
                                status : 401,
                                message : "Unable to login. Incorrect password."
                            }
                            res.json(response);
                        }
                    });
            }
            else{
                response = {
                    status : 401,
                    message : "Unable to login. Incorrect username or password."
                }
                res.json(response);
            }
        
        })

    }

   
    function generateAccessToken(username) {
        
        return jwt.sign(username, config.secret, { expiresIn: '18000s' });
    }


    return {
        UserLogin: UserLogin
    }
}

module.exports = loginDocuments;