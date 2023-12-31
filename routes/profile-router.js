const express = require('express')
const router = express.Router()
const uploadImage = require('../middleware/upload')
const Profile = require('../models/Profile')

router.route('/')
    .get()
    .post(uploadImage.single('profile'),(req, res, next)=>{
        //Create Profile
        Profile.create({
            ...req.body,
            image: req.file.filename,
            user: req.user.userId
        }).then(profile=>{
            res.status(201).json(profile)
        }).catch(next)
    })
    .delete()

router.route('/:profile_id')
    .get()
    .put()
    .delete()

module.exports = router