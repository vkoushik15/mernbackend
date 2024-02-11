const express = require('express');
const router = express.Router();
const Userdata = require("../models/models");
const authmiddleware = require("../middlewares/authmiddleware");
const isadminmiddleware = require("../middlewares/isadminmiddleware");
const cors = require("cors");
router.use(cors());
router.use(express.json());
router.use(express.urlencoded({extended:true}));
const controllers = require("./controllers");
router.route("/").get(controllers.main);
router.route("/admin/orders").get(authmiddleware,isadminmiddleware ,controllers.getordersdata);
router.route("/admin/users").get( authmiddleware,isadminmiddleware , controllers.getadminusers);
router.route("/admin/users/delete/:id").delete(authmiddleware,isadminmiddleware,controllers.deleteadminuser)
router.route("/register").get(controllers.getregister).post(controllers.postregister);
router.route("/login").post(controllers.postlogin);
router.route("/about").get(controllers.about).post(controllers.getAbout);
router.route("/admin/users/:id").get(authmiddleware,isadminmiddleware,controllers.getiddata);
router.route("/admin/users/update/:id").patch(authmiddleware,isadminmiddleware,controllers.updatedatebyid)
module.exports = router;