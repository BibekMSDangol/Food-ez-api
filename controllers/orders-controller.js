const OrderModel = require("../models/Orders");

const createOrder = (req, res, next) => {
//   let userOrders = new OrderModel({
//     quantity: req.body.quanitiy,
//     user: req.user.userId,
//   });
let userOrders = new OrderModel();
userOrders.quantity = req.body.quantity;
userOrders.user = req.user.userId;
  console.log(userOrders);
  OrderModel.create(userOrders)
    .then((order) => {
      res.status(203).json(order);
    })
    .catch((err) => next(err));
};

const getOrder = (req, res, next) => {
  res.status(201).json({ message: "Path reached!" });
};

module.exports = { createOrder, getOrder };
