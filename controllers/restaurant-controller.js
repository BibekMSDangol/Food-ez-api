const Restaurant = require("../models/Restaurant");

const getAllRestaurants = (req, res, next) => {
  Restaurant.find()
    // .populate("food")
    .then((restaurants) =>
      res.status(200).json({ allRestaurants: restaurants })
    )
    .catch((err) => next(err));
};

const createARestaurant = (req, res, next) => {
  let image = "/uploads/" + req.file.filename;
  Restaurant.create({
    ...req.body,
    image: image,
  })
    .then((restaurant) => res.status(201).json(restaurant))
    .catch((err) => next(err));
};
const deleteARestaurant = (req, res, next) => {
  Restaurant.deleteOne()
    .then((reply) => res.json(reply))
    .catch((err) => next(err));
};
const getRestaurantById = (req, res, next) => {
  Restaurant.findById(req.params.restaurant_id)
    // .populate('food')
    .then((restaurant) => res.json(restaurant))
    .catch(next);
};

const updateRestaurantById = (req, res, next) => {
  Restaurant.findByIdAndUpdate(
    req.params.restaurant_id,
    { $set: req.body },
    { new: true }
  )
    .then((restaurant) => res.json(restaurant))
    .catch(next);
};

const deleteRestaurantById = (req, res, next) => {
  Restaurant.findByIdAndDelete(req.params.id)
    .then((restaurant) => res.json(restaurant))
    .catch(next);
};

module.exports = {
  getAllRestaurants,
  createARestaurant,
  deleteARestaurant,
  getRestaurantById,
  updateRestaurantById,
  deleteRestaurantById,
};
