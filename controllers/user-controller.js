const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getalluser = (req, res, next) => {
  User.find().then((user) => {
    res.status(200).json({
      allusers: user,
    });
  });
};
const addToCart = (req, res, next) => {
  User.findById(req.params.userId).then((user) => {
    let food = user.food.find((item) => item == req.params.foodId);
    if (food != undefined) {
      res.status(403).json({
        error: "Already exists",
      });
    }
    user.food.push(req.params.foodId);
    user.save();
    res.status(200).json(user);
  });
};
const createUser = (req, res, next) => {
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
};

const loginUser = (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user == null) {
        let err = new Error("User is not registered.");
        return next(err);
      }
      console.log(req.body.password);
      bcrypt.compare(req.body.password, user.password, (err, success) => {
        if (err) return next(err);
        if (!success) {
          let err = new Error("Password doesnt match.");
          return next(err);
        }
        let data = {
          _id: user._id,
          fname: user.fname,
          lname: user.lname,
          email: user.email,
          contact: user.contact,
          username: user.username,
          password: user.password,
          role: user.role,
          food : user.food
        };
        jwt.sign(
          data,
          process.env.SECRET,
          { expiresIn: "4d" },
          (err, token) => {
            if (err) return next(err);
            res.status(200).json({
              status: "Login Successful",
              user: data,
              token: token,
              role: user.role,
            });
          }
        );
      });
    })
    .catch(next);
};

module.exports = { createUser, loginUser, addToCart, getalluser };
