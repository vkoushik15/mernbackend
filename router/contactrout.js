const express = require("express");
const crouter = express.Router();
const Userdata = require("../router/controllers");
require("../db/conn");
crouter.use(express.json());
crouter.use(express.urlencoded({extended:true}));
crouter.route("/contactus").post(Userdata.postcontact);
module.exports = crouter;