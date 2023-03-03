const express = require('express')
const foodController = require('../controllers/foods-controller')
const reviewController = require('../controllers/reviews-controller')
const uploadImage = require("../middleware/upload");
const router = express.Router()

router.route('/')
    .get(foodController.getAllFood)
    .post(uploadImage.single("foodImage"),foodController.postAFood)
    // .put(booksController.updateBooks)
    .delete(foodController.deleteAllFood)

router.route('/:id')
    .get(foodController.getFoodById)
    .post(uploadImage.single("foodImage"),foodController.postAFood)
    .put(foodController.updateFoodById)
    .delete(foodController.deleteFoodById)

router.route('/:id/reviews')
    .get(reviewController.getAllReviews)
    .post(reviewController.createReview)
    .put((req, res)=> res.status(501).json({'msg': 'Not implemented'}))
    .delete(reviewController.deleteAllReviews)

router.route('/:id/reviews/:review_id')
    .get(reviewController.getReviewsById)
    .post((req, res)=> res.status(501).json({'msg': 'Not implemented'}))
    .put(reviewController.updateReviewsById)
    .delete(reviewController.deleteReviewById)

module.exports = router