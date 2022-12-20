const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const router = express.Router();

router.post("/register", (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user != null) {
        let err = new Error(`Username ${req.body.username} already taken.`);
        return next(err);
      }
      bcrypt.hash(req.body.password, 10, (err, hash)=>{
        if(err) return next(err)
        user = new User()
        user.username = req.body.username
        user.password = hash
        user.save().then(user=>{
            res.status(201).json({
                status: 'User registration successful',
                userId: user._id,
                username: user.username
            })
        }).catch(next)
      })
    }).catch(next);
});

router.post("/login", (req, res, next) => {
  res.send("login request");
});

module.exports = router;
