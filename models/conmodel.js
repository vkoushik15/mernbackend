const mongoose = require("mongoose");

const contactschema = new mongoose.Schema({
name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
message:{
    type:String,
    required:true
}


});


const Contactdata = new mongoose.model("Contactdata",contactschema);
module.exports = Contactdata;