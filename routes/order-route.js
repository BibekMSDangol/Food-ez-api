const express = require("express");
const orderController = require("../controllers/orders-controller")
const { verifyUser } = require("../middleware/auth");
const route = express.Router();

route.post("/" , verifyUser ,orderController.createOrder);


module.exports = route;