const Post = require("./../model/Post");

exports.getPosts = async (req, res) => {
  try {
    const data = await Post.find().populate("user", "name");
    return res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

exports.getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).send({ err: "Post not found" });
    }
    const data = await Post.findById(id).populate("user", "name");
    return res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};
