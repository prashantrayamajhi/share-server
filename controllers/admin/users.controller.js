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
    return res.status(500).send({ err });
  }
};

// get user by id
exports.getUserById = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) return res.status(404).send({ err: "User not found" });
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    return res.status(500).send({ err });
  }
};

// verify user
exports.verifyUser = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) return res.status(404).send({ err: "User not found" });
    user.isVerified = true;
    await user.save();
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    return res.status(500).send({ err });
  }
};

// create user
exports.createUser = async (req, res) => {
  try {
    const { username, password, email, role } = req.body;
    // check if username or email exists
    const userExists = await Users.findOne({ username });
    if (userExists)
      return res.status(400).send({ err: "Username already exists" });
    const userEmail = await Users.findOne({ email });
    if (userEmail) return res.status(400).send({ err: "Email already exists" });
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
    // await Users.findByIdAndDelete(req.params.id);
    // res.status(200).json({
    //   message: "User deleted",
    // });
    const user = await Users.findById(req.params.id);
    if (!user) return res.status(404).send({ err: "User not found" });
    // delete all the posts by the user
    await user.posts.forEach(async (post) => {
      await post.remove();
    });

    await user.remove();
    return res.status(200).send({ msg: "User deleted" });
    // // delete all the comments by the user
    // await user.comments.forEach(async (comment) => {
    //     await comment.remove();
    //     }
    // )
    // // delete all the likes by the user
    // await user.likes.forEach(async (like) => {
    //     await like.remove();
    //     }
    // )
    // // delete all the dislikes by the user
    // await user.dislikes.forEach(async (dislike) => {
    //     await dislike.remove();
    //     }
    // )
    // // delete all the notifications by the user
    // await user.notifications.forEach(async (notification) => {
    //     await notification.remove();
    //     }
    // )
    // // delete all the messages by the user
    // await user.messages.forEach(async (message) => {
    //     await message.remove();
    //     }
    // )
  } catch (error) {
    res.status(500).json({
      message: "Error deleting user",
      error,
    });
  }
};
