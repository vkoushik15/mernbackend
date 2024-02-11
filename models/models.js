const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userschema =  new mongoose.Schema({

name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true,
    unique:true
},
city:{
    type:String,
    required:true
},
profession:{
    type:String,
    required:true
},
age:{
    type:Number,
    required:true
},
password:{
    type:String,
    required:true
},
cpassword:{
    type:String,
    required:true
},
isadmin:{
    type:Boolean,
    default:false
},
tokens:[{
    token:{
type:String
    }
}
]

})


userschema.pre("save",async function(next){

if(this.isModified('password')){
this.password = await bcrypt.hash(this.password,10);
this.cpassword = undefined;
}

next();
})



userschema.methods.generateToken = async function () {
    console.log("I am token");
    try {
      return jwt.sign(
        {
          userId: this._id.toString(),
          email: this.email,
          isAdmin: this.isAdmin,
        },
      "HEYAIMKOUSHIKFROMCHEMICALBTECHNITWARANGAL",
        {
          expiresIn: "30d",
        }
      );
    } catch (error) {
      console.error("Token Error: ", error);
    }
  };
  
const Userdata = new  mongoose.model("Userdata",userschema);
module.exports = Userdata;