const express = require("express");
const User = require('../models/user.js');
const validation = require("../utils/validation.js");
const bcrypt = require("bcrypt");

const requestRouter = express.Router();


//get all data
// requestRouter.get('/feed',async (req,res)=>{
//    try{
//       const users = await User.find();
//       res.send(users);
//    }
//    catch(err){
//       res.status(400).send("Something went wrong");
//    }
// })

//get specific data
requestRouter.get('/user',async (req,res)=>{
   const userFirstName = req.body.firstName;
   try{
      const users = await User.find({"firstName":userFirstName});
      if(users.length === 0){
         res.status(404).send("user not found");
      } else{
         res.send(users);
      }
   }
   catch(err){
      res.status(400).send("Something went wrong");
   }
})

//update
requestRouter.patch('/updateUser',async (req,res)=>{
   try{
      const userId = req.body.Id;
      const data = req.body;
      const allowedUpdates = ["Id","firstName","lastName","emailId","age"];
      const isAllowedUpdate = Object.keys(data).every((k)=>
         allowedUpdates.includes(k));
      if(!isAllowedUpdate){
         throw new Error("Can only update firstName and age");
      }
      const user = await User.findByIdAndUpdate(userId,req.body,{returnDocument : 'after',runValidators:true});
      console.log(user);
      res.send("user updated successfully");
   }catch(err){
      res.status(400).send(err.message);
   }
})

//delete
requestRouter.delete('/deleteUser',async (req,res)=>{
   const userId = req.body.Id;
   const user = await User.findByIdAndDelete(userId);
   if(user == null){
      res.status(404).send("user not found");
   }else{
      res.send("user deleted successfully");
   }
})

requestRouter.use('/',(req,res)=>{
   res.send("default");
})

module.exports = requestRouter;