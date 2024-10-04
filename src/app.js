const express = require('express');
const dbConnect = require('./config/database.js');
const User = require('./models/user.js');

const app = express();

dbConnect().then(()=>{
   console.log("Database connection established");
   app.listen(3001,()=>{
      console.log("server is listening at port 3001");
   });
}).catch((err)=>{
   console.log("Error occured while connecting to databse")
});

app.use(express.json()); // middleware for reading the json data from request body

//post
app.post('/signup',async (req,res)=>{
   try{
      const user = new User(req.body);
      await user.save();
      res.send("user added successsfully");
   } catch(err){
      res.status(400).send(err.message);
   }
});

//get all data
app.get('/feed',async (req,res)=>{
   try{
      const users = await User.find();
      res.send(users);
   }
   catch(err){
      res.status(400).send("Something went wrong");
   }
})

//get specific data
app.get('/user',async (req,res)=>{
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
app.patch('/updateUser',async (req,res)=>{
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
app.delete('/deleteUser',async (req,res)=>{
   const userId = req.body.Id;
   const user = await User.findByIdAndDelete(userId);
   if(user == null){
      res.status(404).send("user not found");
   }else{
      res.send("user deleted successfully");
   }
})

app.use('/',(req,res)=>{
   res.send("default");
})

app.listen(3000);