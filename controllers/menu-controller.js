const Menu = require("../models/Menu");

const getAllMenu = (req, res, next) => {
  Menu.find()
    .then((menu) => res.json(menu))
    .catch((err) => next(err));
}

const createAMenu = (req, res,next)=>{
    Menu.create(req.body)
        .then(menu => res.status(201).json(menu))
        .catch(err => next(err))
}
const deleteAMenu = (req, res, next)=>{
    Menu.deleteOne()
        .then(reply => res.json(reply))
        .catch(err => next(err))
}
const getMenuById = (req,res,next)=>{
    Menu.findById(req.params.menu_id)
        .then(menu => res.json(menu))
        .catch(next)
}

const updateMenuById = (req, res, next) =>{
    Menu.findByIdAndUpdate(req.params.menu_id,
    {$set: req.body}, {new: true})
        .then(menu => res.json(menu))
        .catch(next)
}

const deleteMenuById = (req,res, next)=>{
    Menu.findByIdAndDelete(req.params.id)
        .then(menu => res.json(menu))
        .catch(next)

}

module.exports={
    getAllMenu,
    createAMenu,
    deleteAMenu,
    getAllMenu,
    getMenuById,
    updateMenuById,
    deleteMenuById,
}

