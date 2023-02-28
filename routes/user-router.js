const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userController = require("../controllers/user-controller")
const router = express.Router();
const uploadImage = require("../middleware/upload")


router.get("/", userController.getalluser)
router.get("/:id", userController.getOneUser)
router.post("/register",uploadImage.single('photo'), userController.createUser );
router.route("/user/:id").put(userController.edituser)
router.delete("/:id",userController.deleteuser);
router.post("/login", userController.loginUser );

router.put("/:userId/cart/:foodId", userController.addToCart )

module.exports = router;
