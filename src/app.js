const express = require('express');
const dbConnect = require('./config/database.js');
const cookieParser = require("cookie-parser");
const authRouter = require("./router/authRouter.js");
const profileRouter = require('./router/profileRouter.js');
const requestRouter = require('./router/requestRouter.js');

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

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);

app.listen(3000);