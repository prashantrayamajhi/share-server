const User = require("../../model/User");
const Post = require("../../model/Post");
const cloudinary = require("cloudinary");
const cloudinaryConfig = require("./../../helper/cloudinary");

exports.deleteUser = async (req, res) => {
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
