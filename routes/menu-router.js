const express = require("express");
const menuController = require("../controllers/menu-controller");
const router = express.Router();

router.route('/')
    .get(menuController.getAllMenu)
    .post(menuController.createAMenu)
    .put((req,res)=>res.status(501).json({'msg': 'Not implemented'}))
    .delete(menuController.deleteAMenu)

router.route('/:menu_id')
    .get(menuController.getMenuById)
    .post((req, res)=>res.status(501).json({'msg':'Not implemented'}))
    .put(menuController.updateMenuById)
    .delete(menuController.deleteMenuById)

    
module.exports = router