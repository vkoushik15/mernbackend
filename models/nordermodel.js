const mongoose = require('mongoose');


const oschema = new mongoose.Schema({

name:{
    type:String,
    sparse:true
},
email:{
    type:String,
    sparse:true
},
items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true }
    }
  ],
  totalPrice: { type: Number, required: true },
  // Additional fields like user information, timestamps, etc.
});







const Customerorders = new mongoose.model("Customerorders",oschema);
module.exports = Customerorders;