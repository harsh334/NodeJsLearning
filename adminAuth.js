let isAdminAuthenticated = true;
const adminAuth = (req,res,next)=>{
   console.log("admin middleware checked");
   if(!isAdminAuthenticated){
      res.status(401).send("unauthorized");
   } else{
      next();
   }
}

module.exports = {adminAuth};