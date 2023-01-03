const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/register", (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user != null) {
        let err = new Error(`Username ${req.body.username} already taken.`);
        res.status(400);
        return next(err);
      }
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return next(err);
        user = new User();
        user.fname = req.body.fname;
        user.lname = req.body.lname;
        user.username = req.body.username;
        user.contact = req.body.contact;
        user.email = req.body.email;
        user.password = hash;
        if (req.body.role) user.role = req.body.role;
        user
          .save()
          .then((user) => {
            res.status(201).json({
              status: "User registration successful",
              userId: user._id,
              username: user.username,
              role: user.role,
            });
          })
          .catch(next);
      });
    })
    .catch(next);
});

router.post("/login", (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user == null) {
        let err = new Error("User is not registered.");
        return next(err);
      }
      bcrypt.compare(req.body.password, user.password, (err, success) => {
        if (err) return next(err);
        if (!success) {
          let err = new Error("Password doesnt match.");
          return next(err);
        }
        let data = {
          userId: user._id,
          username: user.username,
          role: user.role,
        };
        jwt.sign(
          data,
          process.env.SECRET,
          { expiresIn: "4d" },
          (err, token) => {
            if (err) return next(err);
            res.json({
              status: "Login Successful",
              token: token,
              role: user.role,
            });
          }
        );
      });
    })
    .catch(next);
});

module.exports = router;
