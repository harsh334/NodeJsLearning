const express = require('express');

const app = express();

const {adminAuth} = require('./adminAuth.js');
const {userAuth} = require('./userAuth.js');

//middleware for authentication for admin
app.use('/admin',adminAuth);


//middleware for authentication for user/getAllUsers
app.use('/user/getAllUsers',userAuth,(req,res)=>{   //since there is only one route which reuire user auth so we can write middleware like this 
   res.send("all data for user");
});

app.use('/admin/getAllData',(req,res)=>{
   res.send("all data");
})

app.use('/admin/deleteUsers',(req,res)=>{
   res.send("deleted data");
})

let isUserBlocked = true;
//middleware for blockeduser
app.use('/blockedUser',(req,res,next)=>{
   if(!isUserBlocked){
      res.status(401).send("unauthorized");
   } else{
      next();
   }
},
(req,res)=>{
   res.send("blocked user");
}
)



app.use('/',(req,res)=>{
   res.send("default");
});

app.listen(3000);