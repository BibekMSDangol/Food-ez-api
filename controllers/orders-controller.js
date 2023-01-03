const OrderModel = require("../models/Orders");

const createOrder = (req,res,next) => {
    let userOrders = new OrderModel({
        quantity : req.body.quanitiy,
        user : req.user.userId
    });
    // console.log(userOrders);
    OrderModel.create(userOrders).then(
        (order) => {
            res.status(203).json(order);
        }
    ).catch(err => next(err));
}

module.exports = {
    createOrder
}