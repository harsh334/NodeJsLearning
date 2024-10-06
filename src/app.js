const express = require('express');
const dbConnect = require('./config/database.js');
const User = require('./models/user.js');
const validation = require("./utils/validation.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const {userAuth} = require("./middlewares/auth.js");

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
app.use(cookieParser()); //middleware for reading the cookies
//post
app.post('/signup',async (req,res)=>{
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

app.post('/login',async (req,res)=>{
   try{
      validation.validateLogin(req);
      const {emailId,password} = req.body;
      const user = await User.findOne({emailId:emailId});
      if(!user){
         throw new error("Invalid credentials");
      }
      const isPasswordValid = await bcrypt.compare(password,user.password);
      if(!isPasswordValid){
         throw new Error("Invalid credentials");
      }
      //jwt token
      const token = await jwt.sign({_id:user._id},"privateKeyThatOnlyServerAndIKnows",{expiresIn:"7d"});
      console.log(token);
      res.cookie("token",token);
      res.send("Login successfull");
   }catch(err){
      res.status(400).send("error occured " + err.message)
   }
});

app.get("/profile",userAuth,async (req,res)=>{
   try{
      res.send(req.user);
   }catch(err){
      res.status(400).send("Error Occured "+ err.message);
   }
})

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