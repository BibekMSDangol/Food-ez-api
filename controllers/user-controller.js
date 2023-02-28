const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { tr } = require("date-fns/locale");

const getalluser = (req, res, next) => {
  User.find().then((user) => {
    res.json(user);
  });
};
const getOneUser = (req, res, next) => {
  const userid = req.params.id;
  User.findOne({ _id: userid })

    .then((user) => {
      res.json(user);
    })
    .catch(next);
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
  console.log(
    req.body.fname,
    req.body.lname,
    req.body.username,
    req.body.contact,
    req.body.email,
    req.body.password
  );
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
  console.log(req.body.username, req.body.password);
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
          _id: user._id,
          fname: user.fname,
          lname: user.lname,
          email: user.email,
          contact: user.contact,
          username: user.username,
          password: user.password,
          role: user.role,
          food: user.food,
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
const edituser = (req, res, next) => {
  const userid = req.params.id;
  User.findByIdAndUpdate(userid, { $set: req.body }, { new: true }).then(
    (user) => {
      res
        .status(200)
        .json({ success: true, data: user, message: "User updated" });
    }
  ).catch(next)
};
const deleteuser = (req, res, next) => {
  const userid = req.param._id;
  User.findOneAndDelete({ _id: userid })
    .then((user) => {
      res.status(200).json({
        success: true,
        data: user,
        message: "Userdeleted successfully.",
      });
    })
    .catch(next);
};

module.exports = {
  createUser,
  loginUser,
  addToCart,
  getalluser,
  deleteuser,
  edituser,
  getOneUser,
};
