// const mongoose =require("mongoose");

// const  address = "mongodb+srv://venkatkoushik15:hq4GxUYhlHwWiBtJcsbase.kdvqr6d.mongodb.net/?retryWrites=true&w=majority"
// // mongoose.connect(address)

// // try {
// //     console.log("connection successful");
// // } catch (error) {
// //     console.log("error in connecting");
// // }
// mongoose.connect(address)
//   .then(() => console.log("MongoDB connected successfully"))
//   .catch(err => console.error("MongoDB connection error:", err));
 // const { MongoClient } = require("mongodb");

//   const username = encodeURIComponent("<username>");
//   const password = encodeURIComponent("<password>");
//   const cluster = "<clusterName>";
//   const authSource = "<authSource>";
//   const authMechanism = "<authMechanism>";
  
//   let uri =
//   "mongodb+srv://venkatkoushik15:hq4GxUYhlHwWiBtJ@csbase.kdvqr6d.mongodb.net/?retryWrites=true&w=majority"
//   const client = new MongoClient(uri);
  
//   async function run() {
//     try {
//       await client.connect();
  
//       const database = client.db("<dbName>");
//       const ratings = database.collection("<collName>");
  
//       const cursor = ratings.find();
  
//       await cursor.forEach(doc => console.dir(doc));
//     } finally {
//       await client.close();
//     }
//   }
//   run().catch(console.dir);
  const mongoose = require('mongoose');

let uri = process.env.DBADDRESS
  // let uri =  "mongodb://127.0.0.1:27017/csbase";
  const connectdb = async()=>{
    try {
        await mongoose.connect(uri);
        console.log('connection succesfull')
    } catch (error) {
        console.log(error)
        process.exit(0);
    }
  }
  module.exports = connectdb;