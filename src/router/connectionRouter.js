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
      
      const allowedStatus = ["intrested","ignored"];
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
})

module.exports = connectionRouter;