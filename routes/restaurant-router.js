const express = require("express");
const restaurantController = require("../controllers/restaurant-controller");
const router = express.Router();

router.route('/')
    .get(restaurantController.getAllRestaurants)
    .post(restaurantController.createARestaurant)
    .put((req,res)=>res.status(501).json({'msg': 'Not implemented'}))
    .delete(restaurantController.deleteARestaurant)

router.route('/:restaurant_id')
    .get(restaurantController.getRestaurantById)
    .post((req, res)=>res.status(501).json({'msg':'Not implemented'}))
    .put(restaurantController.updateRestaurantById)
    .delete(restaurantController.deleteRestaurantById)

    
module.exports = router