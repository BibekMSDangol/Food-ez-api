const {json} = require('express')
const Foods = require('../models/Food')
const Food = require('../models/Food')

const getAllReviews = (req, res, next)=>{
    Foods.findById(req.params.id).then((food)=>{
        res.json(food.reviews)
    }).catch(next)
}
const createReview =(req, res, next)=>{
    Foods.findById(req.params.id).then((food)=>{
        food.reviews.push(req.body);
        food.save().then((F)=>{
            res.json(F.reviews);
        })
    }).catch(err=> next(err))
}
const deleteAllReviews = (req, res, next)=>{
    Foods.findById(req.params.id).then((food)=>[
        food.reviews.push(req.body),
        food.save.then(f => res.json(f.reviews))
    ]).catch(next)
}

const getReviewsById = (req,res, next)=>{
    Food.findById(req.params.id)
        .then(food =>{
            res.json(food.reviews.id(req.params.review_id))
        }).catch(next)
}
const updateReviewsById = (req, res, next)=>{
    Food.findById(req.params.id)
        .then((food)=>{
            let updated_reviews = food.reviews.map((item)=>{
                if(item.id == req.params.review_id){
                    item.body = req.body.body
                }
                return item
            })
            food.reviews = updated_reviews
            food.save().then(food => res.json(food.reviews))
        }).catch(next)
}
const deleteReviewById = (req,res,next)=>{
    Food.findById(req.params.id)
        .then(food =>{
            let  updated_reviews = food.reviews.filter((item) =>{
                return item.id != req.params.review_id
            })
            food.reviews = updated_reviews
            food.save().then(food => res.json(food.reviews))
        }).catch(next)
}

module.exports = {
    getAllReviews,
    createReview,
    deleteAllReviews,
    getReviewsById,
    updateReviewsById,
    deleteReviewById
}