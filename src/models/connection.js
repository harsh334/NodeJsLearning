const mongoose = require("mongoose");
      
const connectionSchema = new mongoose.Schema({
   fromUserId:{
      type:mongoose.Schema.Types.ObjectId,
      required:true
   },
   toUserId:{
      type:mongoose.Schema.Types.ObjectId,
      required:true
   },
   status:{
      type:String,
      enum:["intrested","rejected","accepted","ignored"],
      required:true,
   }
},{timestamps:true})

connectionSchema.pre("save",function (){
   const connectionRequest = this;
   //can write any logic which wanted to be run before the save method gets called
   if(connectionRequest.toUserId.equals(connectionRequest.fromUserId)){
      throw new Error("Cannot have same receiver and sender id");
   }
})


const connectionModel = mongoose.model("Connections",connectionSchema);

module.exports = connectionModel;