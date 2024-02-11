require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
 const connectdb=require("../server/db/conn");
const port = 5000|| process.env.PORT;
const router = require("../server/router/router");
const crouter = require("../server/router/contactrout");
app.use(router);
app.use(crouter);


const corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
  };
  
  app.use(cors(corsOptions));
  connectdb().then(()=>{
app.listen(port,()=>{
console.log(`connecting to ${port}`);
})
  })