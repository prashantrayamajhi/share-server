const Users = require("./../../model/User");
const bcrypt = require("bcrypt");

// ger users
exports.getUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// get user by id
exports.getUserById = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// verify user
exports.verifyUser = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    user.isVerified = true;
    await user.save();
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// create user
exports.createUser = async (req, res) => {
  try {
    const { username, password, email, role } = req.body;
    const user = await Users.create({
      username,
      password,
      email,
      role,
    });
    res.status(201).json({
      message: "User created",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating user",
      error,
    });
  }
};

// update user
exports.updateUser = async (req, res) => {
  try {
    const { username, email, role } = req.body;
    const user = await Users.findByIdAndUpdate(
      req.params.id,
      {
        username,
        email,
        role,
      },
      { new: true }
    );
    res.status(200).json({
      message: "User updated",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating user",
      error,
    });
  }
};

// ban user
exports.banUser = async (req, res) => {
  try {
    const user = await Users.findByIdAndUpdate(
      req.params.id,
      {
        isBanned: true,
      },
      { new: true }
    );
    res.status(200).json({
      message: "User banned",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error banning user",
      error,
    });
  }
};

// delete user
exports.deleteUser = async (req, res) => {
  try {
    await Users.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "User deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting user",
      error,
    });
  }
};
