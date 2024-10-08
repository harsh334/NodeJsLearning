const express = require("express");
const User = require('../models/user.js');
const validation = require("../utils/validation.js");
const bcrypt = require("bcrypt");
const {userAuth} = require("../middlewares/auth.js");

const profileRouter = express.Router();

profileRouter.get("/profile",userAuth,async (req,res)=>{
   try{
      res.send(req.user);
   }catch(err){
      res.status(400).send("Error Occured "+ err.message);
   }
})

module.exports = profileRouter;