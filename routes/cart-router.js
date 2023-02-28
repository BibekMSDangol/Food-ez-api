const express = require("express");

const router = express.Router();
const cartController = require("../controllers/cart-controller");

router
  .route("/")
  .get(cartController.getAllCart)
  .post(cartController.createCart)
  .put(cartController.updateCart);

router
  .route("/:id")
  .get(cartController.getUserCart)
  .delete(cartController.deleteCart);

module.exports = router;
