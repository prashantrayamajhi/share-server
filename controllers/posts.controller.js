const Post = require("./../model/Post");
const cloudinaryConfig = require("./../helper/cloudinary");
const cloudinary = require("cloudinary");
const fs = require("fs");

// get all the posts
exports.getAllPosts = async (req, res) => {
  try {
    const data = await Post.find()
      .populate("user", "name")
      .sort({
        createdAt: -1,
      })
      .limit(req.query.limit ? req.query.limit : 10);
    return res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

// get non-private posts
exports.getPosts = async (req, res) => {
  try {
    const data = await Post.find({ private: false })
      .sort({
        createdAt: -1,
      })
      .populate("user", "-password")
      .limit(req.query.limit ? +req.query.limit : 10);
    return res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

exports.getPostsByUserId = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Post.find({ user: id })
      .populate("user", "-password")
      .sort({
        createdAt: -1,
      });
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
    const data = await Post.findById(id).populate("user", "-password");
    return res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

exports.createPost = async (req, res) => {
  try {
    cloudinaryConfig();
    let { title, content, private, description, categories, postType } =
      req.body;
    if (!title || title.trim().length <= 0) {
      return res.status(400).send({ err: "Title cannot be empty" });
    }
    if (!description || description.trim().length <= 0) {
      return res.status(400).send({ err: "Description cannot be empty" });
    }
    if (!content || content.trim().length <= 0) {
      return res.status(400).send({ err: "Content cannot be empty" });
    }

    if (!postType || postType.trim().length <= 0) {
      return res.status(400).send({ err: "Select a Post Type" });
    }

    // if (categories.length <= 0)
    //   return res.status(400).send({ err: "Select at least one category" });

    if (!req.files || req.files.length <= 0) {
      return res.status(400).json({ err: "Missing Images" });
    }

    const images = [];
    const imgKeys = Object.keys(req.files);
    imgKeys.forEach((key) => {
      images.push(req.files[key]);
    });

    const publicId = [];
    const imageArr = [];
    for (let img of images) {
      const path = img.path;
      const upload = await cloudinary.v2.uploader.upload(path);

      fs.unlinkSync(path);
      publicId.push(upload.public_id);
      imageArr.push(upload.secure_url);
    }

    const post = new Post({
      title,
      content,
      description,
      private,
      user: req.user._id,
      // categories,
      images: imageArr,
      publicId,
      postType,
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
  const publicId = [];
  const imageArr = [];
  const images = [];
  let { title, content, private, description, image, categories, postType } =
    req.body;

  if (!title || title.trim().length <= 0) {
    return res.status(400).send({ err: "Title cannot be empty" });
  }

  if (!postType || postType.trim().length <= 0) {
    return res.status(400).send({ err: "Select a post type" });
  }
  if (!description || description.trim().length <= 0) {
    return res.status(400).send({ err: "Description cannot be empty" });
  }
  if (!content || content.trim().length <= 0) {
    return res.status(400).send({ err: "Content cannot be empty" });
  }

  // if (categories.length <= 0)
  //   return res.status(400).send({ err: "Select at least one category" });

  if (!req.files && image) {
    return res.status(400).json({ err: "Missing Images" });
  }
  if (categories.length <= 0)
    return res.status(400).send({ err: "Select at least one category" });

  if (req.files.length > 0) {
    const imgKeys = Object.keys(req.files);
    imgKeys.forEach((key) => {
      images.push(req.files[key]);
    });

    for (let img of images) {
      const path = img.path;
      const upload = await cloudinary.v2.uploader.upload(path);
      fs.unlinkSync(path);
      publicId.push(upload.public_id);
      imageArr.push(upload.secure_url);
    }
  } else {
    if (typeof image !== "object") {
      image = image.split(",");
    }
    image.forEach((img) => {
      images.push(img);
    });
  }
  try {
    const post = await Post.findById(id);
    if (post.user.toString() !== req.user._id.toString())
      return res.status(401).send({ err: "Unauthorized" });
    if (!post) return res.status(404).send({ err: "Post not found" });

    if (req.files.length > 0) {
      post.publicId.forEach(async (id) => {
        await cloudinary.v2.uploader.destroy(id);
      });
    }
    if (title) post.title = title;
    if (content) post.content = content;
    if (private) post.private = private;
    if (description) post.description = description;
    if (postType) post.postType = postType;
    if (req.files.length > 0) {
      post.images = imageArr;
      post.publicId = publicId;
    } else {
      post.images = images;
    }

    // if (categories) post.categories = categories;

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
