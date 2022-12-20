const Food = require("../models/Food");

const getAllFood = (req, res, next) => {
  Food.find()
    .then((foods) => res.json(foods))
    .catch((err) => next(err));
};
const postAFood = (req,res, next) =>{
    Food.create(req.body)
        .then(food => res.status(201).json(food))
        .catch(err => next(err))
}

module.exports={
    getAllFood,
    postAFood,
}
