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
  OrderModel.find().then((orders)=>{
    res.status(203).json(orders)
  }).catch();
};

const updateOrderById = (req, res, next) => {
  OrderModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then((orders) =>{
      console.log(orders)
      res.status(201).json(orders)
    } 
    )
    .catch(next);
};

module.exports = { createOrder, getOrder, updateOrderById};
