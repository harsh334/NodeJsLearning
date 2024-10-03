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

app.post('/signup',async (req,res)=>{
   const user = new User(req.body);
   await user.save();
   res.send("user added successsfully");
});

app.get('/feed',async (req,res)=>{
   try{
      const users = await User.find();
      res.send(users);
   }
   catch(err){
      res.status(400).send("Something went wrong");
   }
})

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

app.use('/',(req,res)=>{
   res.send("default");
})

app.listen(3000);