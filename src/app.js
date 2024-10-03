const express = require('express');
const dbConnect = require('./config/database.js');
const User = require('./models/user.js');

const app = express();

dbConnect().then(()=>{
   console.log("Database connection established");
   app.listen(3001,()=>{
      console.log("server is listening at port 3001");
   });
})
.catch((err)=>{
   console.log("Error occured while connecting to databse")
});

app.post('/signup',async (req,res)=>{
   const user = new User({
      "firstName" :"Harshita",
      "lastName" : "Kumari",
      "age":23,
      "gender":"male"
   })
   await user.save();
   res.send("user added successsfully");
})
app.use('/',(req,res)=>{
   res.send("default");
})

app.listen(3000);