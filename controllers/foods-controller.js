const Food = require("../models/Food");

const getAllFood = (req, res, next) => {
  Food.find()
  .populate('restaurant')
    .then((foods) => res.json(foods))
    .catch((err) => next(err));
};
const postAFood = (req, res, next) => {
  let newFood = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    restaurant: req.params.id,
  };
  Food.create(newFood)
    .then((food) => res.status(201).json(food))
    .catch((err) => next(err));
};
const deleteAllFood = (req, res, next) => {
  Food.deleteMany()
    .then((reply) => res.json(reply))
    .catch((err) => next(err));
};
const getFoodById = (req, res, next) => {
  Food.findById(req.params.id)
    .populate("restaurant")
    .then((food) => res.json(food))
    .catch(next);
};

const updateFoodById = (req, res, next) => {
  Food.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then((food) => res.json(food))
    .catch(next);
};

const deleteFoodById = (req, res, next) => {
  Food.findByIdAndDelete(req.params.id)
    .then((food) => res.json(food))
    .catch(next);
};

module.exports = {
  getAllFood,
  postAFood,
  deleteAllFood,
  getFoodById,
  updateFoodById,
  deleteFoodById,
};
