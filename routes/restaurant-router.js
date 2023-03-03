const express = require("express");
const restaurantController = require("../controllers/restaurant-controller");
const uploadImage = require("../middleware/upload");
const Food = require("../models/Food");
const router = express.Router();


router
  .route("/")
  .get(restaurantController.getAllRestaurants)
  .post(uploadImage.single("restaurantImage"),restaurantController.createARestaurant)
  .put((req, res) => res.status(501).json({ msg: "Not implemented" }))
  .delete(restaurantController.deleteARestaurant);

router
  .route("/:restaurant_id")
  .get(restaurantController.getRestaurantById)
  .post((req, res) => res.status(501).json({ msg: "Not implemented" }))
  .put(restaurantController.updateRestaurantById)
  .delete(restaurantController.deleteRestaurantById);

router
  .post("/:restaurant_id/food", uploadImage.single("foodImage"), (req, res, next) => {
    let image = "/uploads/" + req.file.filename;
    let newFood = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      restaurant: req.params.restaurant_id,
      image : req.file.filename
      
    };
    Food.create({
      ...req.body,
      image: image
    })
      .then((food) => res.status(201).json(food))
      .catch((err) => next(err));
  });

module.exports = router;
