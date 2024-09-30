let isUserAuthenticated = true;
const userAuth = (req,res,next)=>{
   console.log("user middleware checked");
   if(!isUserAuthenticated){
      res.status(401).send("unauthorized");
   } else{
      next();
   }
}

module.exports = {userAuth};