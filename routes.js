const express = require('express');

const app = express();

// can be written as
// app.use('/user',[cb1,cb2,cb3]);
// app.use('/user',cb1,[cb2,cb3]);

app.use('/user',(req,res,next)=>{
   console.log("first route");
   // res.send("first");
   next();
})

app.use('/user',(req,res,next)=>{
   console.log("second route");
   // res.send("second");
   next();
})

app.use('/user',(req,res,next)=>{
   console.log("third route");
   res.send("third");
})

app.use('/',(req,res)=>{
   res.send("default route");
})

app.listen(3000);