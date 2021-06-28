const express = require("express");

var role = require("../controller/role-controller")();

let roleRoute = function(){

    roleRouter = express.Router();

    roleRouter.route("/role")
        .post((req,res)=>{role.post(req,res)})
        .get((req,res)=>{role.get(req,res)});
    roleRouter.route("/role/:roleid")
        .get((req,res)=>{role.getById(req,res)})
        .put((req,res)=>{role.put(req,res)});
    roleRouter.route("/role/active/:isActive")
        .get((req,res) =>{role.getActiveRole(req,res)});

    return roleRouter;
}

module.exports = roleRoute;