const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const userAuth = async(req,res,next)=>{
   try{
      const {token} = req.cookies;
      if(!token){
         throw new Error("Invalid Token");
      }
      const encodedUser = await jwt.verify(token,"privateKeyThatOnlyServerAndIKnows");
      const {_id} = encodedUser;
      const user = await User.findOne({_id});
      if(!user){
         throw new Error("Invalid User");
      }
      req.user=user;
      next();
   }
   catch(err){
      res.status(400).send("Error occured "+err.message);
   }
}

module.exports = {userAuth}