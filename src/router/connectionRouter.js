const express = require("express");
const connectionModel = require("../models/connection.js");
const {userAuth} = require("../middlewares/auth.js");
const User = require("../models/user.js");

const connectionRouter = express.Router();

connectionRouter.post("/request/send/:status/:toUserId",userAuth,async (req,res)=>{
   try{
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;
      
      const allowedStatus = ["interested","ignored"];
      if(!allowedStatus.includes(status)){
         throw new Error("Status Invalid");
      }

      const isToUser = await User.findOne({_id:toUserId});
      console.log(isToUser);
      
      if(!isToUser){
         throw new Error("Invalid receiver id");
      }

      const existingConnectionRequest = await User.findOne({
         $or:[
            {fromUserId,toUserId},
            {fromUserId:toUserId,toUSerId:fromUserId}
         ]
      })
      
      const connection = new connectionModel({
         fromUserId:fromUserId,
         toUserId:toUserId,
         status:status
      })

      await connection.save();
      res.send("connection saved successfully") 
   }
   catch(err){
      res.status(400).send("something went wrong"+err.message);
   }
});

connectionRouter.post("/review/:status/:requestId",userAuth,async (req,res) => {
   try{
      const {requestId} = req.params;
      const {status} = req.params;
      const loggedInUserId = req.user._id;
      const allowedStatus = ["accepted","rejected"];
      if(!allowedStatus.includes(status)){
         throw new Error("Invalid status");
      }
      const connectionRequest = await connectionModel.findOne({
         _id:requestId,
         toUserId:loggedInUserId,
         status:"interested"
      });
      if(!connectionRequest){
         return res.status(404).send("connection request not found");
      }
      connectionRequest.status = status;
      const data = await connectionRequest.save(); 
      res.json({message:"connection request "+status,data});
   }
   catch(err){
      res.status(400).send("Error occured "+err.message);
   }
});

connectionRouter.get("/user/requests/received",userAuth,async (req,res)=>{
   try{
      const loggedInUser = req.user;

      const connectionRequests = await connectionModel.find({
         toUserId:loggedInUser._id,
         status:"interested"
      }).populate("fromUserId",["firstName","lastName"]);
      res.json(connectionRequests);
   }

   catch(err){
      res.status(400).send("error occured "+err.message);
   }
})


connectionRouter.get("/feed",userAuth, async (req,res)=>{
   try{

      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1)*limit;

      const loggedInUserId = req.user._id
      const connectionRequests = await connectionModel.find({
         $or:[{fromUserId:loggedInUserId},{toUserId:loggedInUserId}]
      }).select("fromUserId toUserId");

      const hideUsersFromFeed = new Set();
      connectionRequests.forEach((req)=>{
         hideUsersFromFeed.add(req.fromUserId.toString());
         hideUsersFromFeed.add(req.toUserId.toString());
      })

      const users = await User.find({
         $and : [
            {_id:{$nin:Array.from(hideUsersFromFeed)}},
            {_id:{$ne: loggedInUserId}}
         ]
      })
         .select("firstName lastName emailId")
         .skip(skip)
         .limit(limit);
      res.send(users);
   }
   catch(err){
      res.status(400).json({message:err.message})
   }
})

module.exports = connectionRouter;