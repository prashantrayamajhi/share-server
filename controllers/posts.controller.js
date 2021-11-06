const Post = require("./../model/Post");
const { cloudinaryConfig } = require("./../helper/cloudinary");

// get all the posts
exports.getAllPosts = async (req, res) => {
  try {
    const data = await Post.find().populate("user", "name").sort({
      createdAt: -1,
    });
    return res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

// get non-private posts
exports.getPosts = async (req, res) => {
  try {
    const data = await Post.find({ private: false }).populate("user", "name");
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

exports.createPost = async (req, res) => {
  cloudinaryConfig();
  let { title, content, img, private, description } = req.body;
  if (!title || title.trim().length <= 0) {
    return res.status(400).send({ err: "Title cannot be empty" });
  }
  if (!description || description.trim().length <= 0) {
    return res.status(400).send({ err: "Description cannot be empty" });
  }
  if (!content || content.trim().length <= 0) {
    return res.status(400).send({ err: "Content cannot be empty" });
  }
  if (!img || img.trim().length <= 0) {
    return res.status(400).send({ err: "Image cannot be empty" });
  }

  try {
    const post = new Post({
      title,
      content,
      img,
      description,
      private,
      user: req.user._id,
    });
    const data = await post.save();
    return res.status(201).json({ data });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

exports.updatePost = async (req, res) => {
  cloudinaryConfig();
  const { id } = req.params;
  let { title, content, img, private, description } = req.body;
  try {
    const post = await Post.findById(id);
    if (post.user.toString() !== req.user._id.toString())
      return res.status(401).send({ err: "Unauthorized" });
    if (!post) return res.status(404).send({ err: "Post not found" });
    if (title) post.title = title;
    if (content) post.content = content;
    if (img) post.img = img;
    if (private) post.private = private;
    if (description) post.description = description;
    const data = await post.save();
    return res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (post.user.toString() !== req.user._id.toString())
      return res.status(401).send({ err: "Unauthorized" });
    if (!post) return res.status(404).send({ err: "Post not found" });
    const data = await post.remove();
    return res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};
