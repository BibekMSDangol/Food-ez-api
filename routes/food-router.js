const express = require('express')
const foodController = require('../controllers/foods-controller')
const router = express.Router()

router.route('/')
    .get(foodController.getAllFood)
    .post(foodController.postAFood)
    // .put(booksController.updateBooks)
    .delete(foodController.deleteAllFood)
