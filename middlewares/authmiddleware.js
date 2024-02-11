const jwt = require("jsonwebtoken");
const User = require("../models/models");
const authmiddleware= async(req,res,next)=>{

   const token = req.header("Authorization");
   if (!token) {
  
    return res
      .status(401)
      .json({ message: "Unauthorized HTTP, Token not provided" });
  }
  
  const jwtToken = token.replace("Bearer", "").trim();
  console.log( "jwt token is ",jwtToken);

  try {
    // Verifying the token
    const isVerified = jwt.verify(jwtToken, "HEYAIMKOUSHIKFROMCHEMICALBTECHNITWARANGAL");
    console.log(isVerified);

    // getting the complete user details & also we don't want password to be sent
    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });

    req.token = token;
    req.user = userData;
   // req.userID = user._id;

    // Move on to the next middleware or route handler
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized. Invalid Token." });
  }



} 
module.exports = authmiddleware;