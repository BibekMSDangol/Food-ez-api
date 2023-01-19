const express = require("express");
const orderController = require("../controllers/orders-controller");
const { verifyUser } = require("../middleware/auth");
const route = express.Router();

route.get("/", verifyUser, orderController.getOrder);
route.post("/", verifyUser, orderController.createOrder);
route.put("/:id", verifyUser, orderController.updateOrderById)

module.exports = route;
