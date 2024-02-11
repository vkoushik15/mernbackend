const User = require("../models/models");
const isAdmin = async(req,res,next)=>{
try {
    
const Admin = req.user.isadmin;
console.log("isadmin",Admin);
if(!Admin){
    res.status(403).json({message:"user is not a admin"});
}
if(Admin){
   // res.status(201).json({message:"admin got into page successfulyy"})
   console.log("admin logged successfully");
}
next();

} catch (error) {
    res.send(error);
    console.log("hey error");
}


}
module.exports = isAdmin