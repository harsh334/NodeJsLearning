const express = require("express");
const User = require('../models/user.js');
const validation = require("../utils/validation.js");
const bcrypt = require("bcrypt");

const authRouter = express.Router();

authRouter.post('/signup',async (req,res)=>{
   try{
      //validation
      validation.validateSignUp(req);
      const {firstName,lastName,emailId,password} = req.body;
      console.log("sistname",firstName);

      //eecryption
      const hashedPassword = await bcrypt.hash(password,10);
      const user = new User({firstName,lastName,emailId,password:hashedPassword});
      await user.save();
      res.send("user added successsfully");
   } catch(err){
      res.status(400).send(err.message);
   }
});

authRouter.post('/login',async (req,res)=>{
   try{
      validation.validateLogin(req);
      const {emailId,password} = req.body;
      const user = await User.findOne({emailId:emailId});
      if(!user){
         throw new error("Invalid credentials");
      }
      const isPasswordValid = await user.validatePassword(password);
      if(!isPasswordValid){
         throw new Error("Invalid credentials");
      }
      const token = await user.getJWT();
      console.log(token);
      res.cookie("token",token);
      res.send("Login successfull");
   }catch(err){
      res.status(400).send("error occured " + err.message)
   }
});

authRouter.get("/logout",async (req,res)=>{
   res.cookie("token",null,{expiresIn:Date.now()}).send("Logout Successfull");
})

module.exports = authRouter;