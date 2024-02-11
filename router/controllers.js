const Userdata = require("../models/models");
const Contactdata = require("../models/conmodel");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require("../models/models");

const Customerorders = require('../models/nordermodel');
const getregister = async(req,res)=>{
try {
    res.send("hi from router and contorller")
} catch (error) {
    console.log(error)
}


}



const postregister =async(req,res)=>{
try {
   const {name,email,city,profession,age,password,cpassword,isadmin} = req.body;
  // const register =   await Userdata.create({name,email,city,profession,age,password,cpassword,isadmin});

if(password === cpassword){
  
    const register =   await Userdata.create({name,email,city,profession,age,password,cpassword,isadmin});
   const token = await register.generateToken();
    await register.updateOne({ $set: { token } })

    res.status(201).json({message:"data saved",
    userId: register._id.toString(),
    
   });
   

}


   
   
else{
    res.status(400).json({message:"passwords are not matching"})
}

} catch (error) {
    console.log(error);
}

}
const postlogin =async(req,res)=>{
const {email,password}= req.body;
const find = await Userdata.findOne({email:email})
if(!find){
res.status(401).json({message:"email notfound"})

}
else if(find){
const sear = await bcrypt.compare(password,find.password)
if(sear){
    res.status(201).json({message:"login successful",
    token: await find.generateToken(),
    userId: find._id.toString(),

})
}
else{
    res.status(401).json({message:"wrong password"})
}
}

}

const main = async(req,res)=>{

    try {
        
        res.send("hi");
    } catch (error) {
        console.log(error);
    }
}
const postcontact = async(req,res)=>{
    try {
        
const{name,email,message} = req.body;
const c = await Contactdata.create({name,email,message});
if(c){
    res.status(201).json({message:"stored sucessfully"});
}


    } catch (error) {
     console.log(error);   
    }
}

const about = async(req,res)=>{
try {
   
   const token = req.header("Authorization");
    const jwtToken = token.replace("Bearer", "").trim();
    //console.log(jwtToken);
    const isVerified =  await jwt.verify(jwtToken, process.env.SECRET_KEY);
  //  console.log(isVerified);
   
   const userData = await User.findOne({ email: isVerified.email }).select({
    password: 0,
  });
 //console.log(userData.name);
 
  req.user = userData;
  res.send(userData);
   console.log("hi from conrtroller")

 //   return res.status(200).json({ msg:userData});


} catch (error) {
    console.log(error);
    console.log("error in getting about")
}



};


const getAbout = async(req,res)=>{
  

    try {
        const {  items, totalPrice } = req.body;
      
        const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const tokens = authHeader.split(' ')[1]; // Assuming Bearer token format
  
  const decoded = jwt.verify(tokens, "HEYAIMKOUSHIKFROMCHEMICALBTECHNITWARANGAL");
  console.log(decoded);
  const {name,email} = decoded;
 
        const o = await Customerorders.create({
          name,
          email,
          items,
          totalPrice,
          // Add other fields as needed, such as timestamps
        });
      
        if (o) {
          res.status(201).json({ message: "Stored successfully" });
        } else {
          res.status(500).json({ message: "Error storing order" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }

      
    
};
/*const getadminusers =async(req,res)=>{

try {
  const u = await User.find();

  if(!u|| u.lenght ===0){
   return res.status(404).json({message:"there is no data heere"});
  }
  else{
  res.status(200).json(u);
 // res.send(u);
  }
} catch (error) {
  res.status(201).json({message:"error in gettting from database"})
}


}*/
const getadminusers = async (req, res) => {
  try {
    const u = await User.find();

    if (!u || u.length === 0) {
   
    }

    res.send(u);
  } catch (error) {
    console.error(error);
  
  }
};

const getordersdata = async(req,res)=>{
try {
  const ordersdata = await Customerorders.find();
  res.status(200).json(ordersdata);



} catch (error) {
  res.json({message:error})
}


}
const deleteadminuser= async(req,res)=>{
  try {
   
    const id = req.params.id;
    const de = await User.deleteOne({_id:id});
    res.status(200).json({message:"user delted successfully"})


  } catch (error) {
    console.log(error);
  }
}



const getiddata=async(req,res)=>{

try {
  const id = req.params.id;
  const data = await User.findOne({_id:id},{password:0,tokens:0});
  res.status(200).send(data);


} catch (error) {
  console.log(error);
  
}

}
const updatedatebyid = async(req,res)=>{

try {
  const id = req.params.id;
  const updatedata = req.body;
  const u = await User.updateOne({_id:id},{

    $set:updatedata,
  })
  return res.status(200).send(u)
} catch (error) {
  console.log(error);
}

}

module.exports = {getregister,postregister,main,postlogin,postcontact,about,getAbout,getadminusers,getordersdata,deleteadminuser,getiddata,updatedatebyid};