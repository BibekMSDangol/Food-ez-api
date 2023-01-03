const express = require("express");
const { verifyUser } = require("../middleware/auth");
const orderController = require("../controllers/order-controller")
const route = express.Router();

route.post("/" , verifyUser, orderController.createOrder);


module.exports = route;