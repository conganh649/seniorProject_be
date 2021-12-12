var userService = require("../services/userService");
var User = require("../models/userModel");
var moment = require("moment");
const bcrypt = require("bcrypt");
const SALT_I = 10;

// CREATE AND SAVE NEW USER
exports.create = async (req, res) => {
  try {
    // Validate request
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty" });
      return;
    }
    const user = await userService.createOne(req);
    res
      .status(200)
      .json({ success: true, message: "Create user successfully", data: user });
  } catch (error) {
    if (!error.status) {
      res.status(500).json({ success: false, message: error.message });
    } else {
      res
        .status(error.status)
        .json({ success: error.success, message: error.message });
    }
  }
};

// READ ALL USERS / READ USER BY ID
exports.find = async (req, res) => {
  if (req.query.id) {
    //Get one by id
    try {
      const user = await userService.getOneById(req.query.id);
      res.status(200).send(user);
    } catch (error) {
      if (!error.status) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(error.status).json({ message: error.message });
      }
    }
  } else {
    //Get all
    try {
      const user = await userService.getAll();
      res.status(200).send(user);
    } catch (error) {
      if (!error.status) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(error.status).json({ message: error.message });
      }
    }
  }
};

// UPDATE USER BY ID
exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }
  try {
    const result = await userService.updateById(req);
    const user = await userService.getOneById(req.params.id);
    res.status(200).json({
      success: result,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    if (!error.status) {
      res.status(500).json({ success: false, message: error.message });
    } else {
      res
        .status(error.status)
        .json({ success: error.success, message: error.message });
    }
  }
};

// DELETE USER BY ID
exports.delete = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }
  try {
    const result = await userService.deleteById(req);
    res
      .status(200)
      .json({ success: result, message: "User deleted successfully" });
  } catch (error) {
    if (!error.status) {
      res.status(500).send({ success: false, message: error.message });
    } else {
      res
        .status(error.status)
        .send({ success: error.success, message: error.message });
    }
  }
};

// CHANGE PASSWORD
exports.change = async (req, res) => {
  console.log(req.params.id);
  let check = true;
  try {
    const { oldPassword, newPassword } = req.body;
    let updatedPassword = {
      password: newPassword,
    };
    const user = await User.findOne({ _id: req.params.id });
    console.log(user);
    // validate old password
    const checkPass = await bcrypt.compare(
      oldPassword,
      user.password,
      function (err, match) {
        console.log("Match ne : === " + match);
        if (!match || err) {
          console.log("Sai pass cu ne alo");
          check = false;
          return res.status(400).send("Please enter correct old password");
        } else {
          user.password = newPassword;
          console.log(user);
          user.save();
          console.log("Doi pass ne alo");
          res.status(200).json({
            success: "true",
            message: "Password updated successfully",
          });
        }
      }
    );
  } catch (err) {
    console.log("Vao day chi nua");
    console.log(err);
    res.status(400).send("Something went wrong. Try again");
  }
};

const calculateBirthday = (birthday) => {
  return (new Date() - birthday) / 1000 / 60 / 60 / 24 / 365;
};

exports.militaryService = async (req, res) => {
  try {
    User.find({
      dateofbirth: {
        $gte: moment(new Date()).subtract(18, "years"),
        $lte: moment(new Date()).subtract(25, "years"),
      },
      gender: "Male",
    })
      .then((result) => {
        res.status(200).json({
          success: true,
          data: result,
        });
      })
      .catch((err) => {
        res.status(err.status || 500).json({
          success: false,
          message: err.message || "err occurred while retrieving data",
        });
      });
  } catch (error) {
    if (!error.status) {
      res.status(500).send({ success: false, message: error.message });
    } else {
      res
        .status(error.status)
        .send({ success: error.success, message: error.message });
    }
  }
};
