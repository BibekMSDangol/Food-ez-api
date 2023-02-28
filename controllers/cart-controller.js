Cart= require('../models/Cart')

const getAllCart=(req, res, next)=>{
    Cart.find().populate('user').populate('food')
    .then((carts)=>{

        res.status(200).json({
            success:true,
            message:"List of Cart",
            data:carts
        })
    }
    ).catch((err)=>{next(err)})
}

const getUserCart=(req, res, next) =>{
    Cart.find().where('user').equals(req.params.id)
    .populate('user')
    .populate('food')
    .then((carts)=>{
        res.status(200).json({
            success:true,
            message:"List of Cart",
            data:carts
        })
    }).catch((err)=>{next(err)}
    )
}

const createCart=(req, res, next)=>{
    let cart={
        ...req.body
    }
    Cart.create(cart).then(cart=>{
        res.status(201).json({
            success:true,
            message:"Cart added successfully",
            data:cart
        })
    }).catch(next)
}

const deleteCart=(req, res, next)=>{
    Cart.findByIdAndDelete(req.params.id)
    .then((reply) =>{
        res.json(reply)
    }).catch(next)
}

const updateCart=(req, res, next)=>{
    Cart.findIdAndUpdate(req.params.id,{$set:req.body},{new:true})
    .then((cart) =>{
        res.json(cart)
    }).catch(next)
}

module.exports={
    getUserCart,
    createCart,
    deleteCart,
    updateCart,
    getAllCart
}