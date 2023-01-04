const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userController = require("../controllers/user-controller")
const router = express.Router();

router.post("/register", userController.createUser );

router.post("/login", userController.loginUser );

module.exports = router;
