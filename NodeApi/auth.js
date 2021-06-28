const jwt = require('jsonwebtoken');
const config = require('./config');

const auth = (req,res,next) =>{
    try{
        const headerBearer = req.headers['authorization'];
        
        if(headerBearer !== undefined && headerBearer.length > 0){
            const bearerToken = headerBearer.split(' ')[1];
            const token = bearerToken;

            jwt.verify(token,config.secret,(err,authData)=>{
                if(err){
                    console.log(err);
                    res.sendStatus(403);
                }
                else{
                    
                    req.token = token;
                    req.user = authData.id;
                    next();
                }
            });
        }
        else{
            res.json({
                status : "403",
                message : "Not authorized"
            });
        }

    }
    catch(e){
        console.log(e);
        res.status(401).send({'error':'Please authenticate'});
    }
}  


        
module.exports = auth;