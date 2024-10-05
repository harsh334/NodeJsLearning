const validator = require("validator");

const validateSignUp = (req)=>{
   const {emailId,password,firstName,lastName} = req.body;
   if(!validator.isEmail(emailId)){
      throw new Error("Not a valid email");
   }
   else if(!validator.isStrongPassword(password)){
      throw new Error("Not a strong password");
   } 
   else if(!firstName || !lastName){
      throw new Error("Not a valid name");
   }
}

const validateLogin = (req) =>{
   const {emailId,password} = req.body;
   if(!validator.isEmail(emailId)){
      throw new Error("Not a valid email");
   }
   else if(!validator.isStrongPassword(password)){
      throw new Error("Not a strong password");
   } 
}

module.exports= {validateSignUp,validateLogin};