const Post = require("./../../model/Post");

exports.getPosts = async (req, res) => {
  try {
    const data = await Post.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    return res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};
