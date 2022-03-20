const User = require("../../model/User");
const Post = require("../../model/Post");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary");
const cloudinaryConfig = require("./../../helper/cloudinary");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// update general settings
exports.updateGeneral = async (req, res) => {
  const { id } = req.user;
  const { name, address } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).send({ err: "Name is required" });
  }
  if (!address || !address.trim()) {
    return res.status(400).send({ err: "Address is required" });
  }
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).send({ err: "User not found" });
    user.name = name;
    user.address = address;
    await user.save();
    return res.status(200).json({ data: user });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

// update password using bcrypt
exports.updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("+password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const isMatch = await bcrypt.compare(
      req.body.currentPassword,
      user.password
    );
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid current password" });
    }
    user.password = req.body.newPassword;
    await user.save();
    return res.status(200).json({ data: user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// update links
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    user.website = req.body.website;
    user.facebook = req.body.facebook;
    user.instagram = req.body.instagram;
    user.linkedin = req.body.linkedin;
    await user.save();
    return res.status(200).json({ data: user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// update profile picture
exports.updateProfileImage = async (req, res) => {
  cloudinaryConfig();
  const { id } = req.user;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const { public_id, url } = await cloudinary.v2.uploader.upload(
      req.file.path
    );
    user.image = url;
    user.publicId = public_id;
    await user.save();
    return res.status(200).json({ data: user });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

// delete a user account and all the posts
exports.deleteProfileAndPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const posts = await Post.find({ user: req.user.id });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    if (posts.length > 0) {
      posts.forEach(async (post) => {
        await post.remove();
      });
    }
    await user.remove();
    res.status(200).json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
