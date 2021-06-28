

const multer = require("multer");
var config = require("../config");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

var uploaddocuments = function(){

    function postSingle(req,res){
        let upload = multer({ storage: config.storage, fileFilter: config.imageFilter }).single('single-pic');

        upload(req, res, function(err) {
            // req.file contains information of uploaded file
            // req.body contains information of text fields, if there were any

            if (req.fileValidationError) {
                return res.json({
                    status : "403",
                    message : req.fileValidationError});
            }
            else if (!req.file) {
                return res.json({
                    status : "403",
                    message : 'Please select an image to upload'});
            }
            else if (err instanceof multer.MulterError) {
                return res.json({
                    status : "403",
                    message : err});
                
            }
            else if (err) {
                return res.json({
                    status : "403",
                    message : err});
            }

            // Display uploaded image for user validation
            res.json({
                status : "200",
                files_uploaded : req.file.originalname
            });
        //res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
        });
    }

    function postMultiple(req,res){
        let upload = multer({ storage: config.storage, fileFilter: config.imageFilter }).array('multiple-pic', 5);

        upload(req, res, function(err) {
            

            if (req.fileValidationError) {
                return res.json({
                    status : "403",
                    message : req.fileValidationError});
            }
            else if (!req.files) {
                return res.json({
                    status : "403",
                    message : 'Please select an image to upload'});
            }
            else if (err instanceof multer.MulterError) {
                return res.json({
                    status : "403",
                    message : err});
                
            }
            else if (err) {
                return res.json({
                    status : "403",
                    message : err});
            }

            let result = "";
            const files = req.files;
            let index, len;

            
            // Loop through all the uploaded images and display them on frontend
            for (index = 0, len = files.length; index < len; ++index) {
                result += `${files[index].originalname},`;
            }
            
            result = result.substr(0,result.length-1);

            res.json({
                status : "200",
                files_uploaded : result
            });
        });
    }

    return{
        postSingle : postSingle,
        postMultiple : postMultiple
    };
}

module.exports = uploaddocuments;