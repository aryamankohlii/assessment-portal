const express = require("express");

var upload = require("../controller/upload-controller")();

let uploadRoute = function(){
    uploadRouter = express.Router();

    uploadRouter.route("/uploadSingle")
        .post((req,res)=>{upload.postSingle(req,res)});
    uploadRouter.route("/uploadMultiple")
        .post((req,res)=>{upload.postMultiple(req,res)});
    
    return uploadRouter;
}

module.exports = uploadRoute;