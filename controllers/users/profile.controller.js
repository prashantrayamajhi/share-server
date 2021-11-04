const User = require("../../model/User");
const Post = require("../../model/Post");
const bcrypt = require("bcrypt");

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
    res.json({ msg: "Password updated" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

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
    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
