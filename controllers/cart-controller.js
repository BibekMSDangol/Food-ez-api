const Cart = require("../models/Cart");

const getAllCart = (req, res, next) => {
  Cart.find()
    .then((cart) => res.json(cart))
    .catch((err) => next(err));
}

const removeafood = (req, res, next)=>{
    Cart.deleteOne()
        .then(reply => res.json(reply))
        .catch(err => next(err))
}
// const getMenuById = (req,res,next)=>{
//     Menu.findById(req.params.menu_id)
//         .then(menu => res.json(menu))
//         .catch(next)
// }

// const updateMenuById = (req, res, next) =>{
//     Menu.findByIdAndUpdate(req.params.menu_id,
//     {$set: req.body}, {new: true})
//         .then(menu => res.json(menu))
//         .catch(next)
// }

// const deleteMenuById = (req,res, next)=>{
//     Menu.findByIdAndDelete(req.params.id)
//         .then(menu => res.json(menu))
//         .catch(next)

// }

module.exports={
    getAllCart,
    removeafood
}

