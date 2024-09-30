const express = require('express');

const app = express();

app.use('/user/getData',(req,res)=>{
   throw new error("svnej");
   res.send('user data');
});

app.use('/',(err,req,res,next)=>{
   if(err){
      res.status(500).send("something went wrong");
   }
})

app.listen(3000);