const Profile = require("../models/Profile");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uploadImage = require("../middleware/upload");

const createProfile = (req, res, next) => {
  Profile.findOne(uploadImage.single("profile"), (req, res, next) => {
    Profile.create({
      ...req.body,
      image: req.file.filename,
      user: req.user.userId,
    })
      .then((profile) => {
        res.status(201).json(profile);
      })
      .catch(next);
  });
};
module.exports={
    createProfile
}
