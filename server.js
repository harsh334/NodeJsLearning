const express = require("express");

const app = express();

app.use('/first',(req,res)=>{
   res.send("first");
})

app.use('/second',(req,res)=>{
   res.send("second");
})

//get
app.get('/user',(req,res)=>{
   res.send("harsh");
})

//post
// app.post('/user/:name',(req,res)=>{   //getting params
//    console.log(req.params);
//    res.send("post");
// })

app.post('/user?c',(req,res)=>{  //making r optional
   console.log(req);
   res.send("post");
})

// app.post('/user*c',(req,res)=>{  //inserting anything between user and c 
//    res.send("post");
// })

// app.post('/user',(req,res)=>{  //getting query
//    console.log(req.query);
//    res.send("post");
// })

//delete
app.delete('/user',(req,res)=>{
   res.send("deleted");
})

//put
app.put('/user',(req,res)=>{
   res.send("updated");
})

app.use('/',(req,res)=>{  //wildcard
   res.send("default route");
})

app.listen(3000,(error)=>{
   if(!error){
      console.log("server running on port 3000");
   }else{
      console.log("aborting server");
   }
});