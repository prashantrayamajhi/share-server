const Category = require("./../../model/Category");
const cloudinaryConfig = require("./../../helper/cloudinary");
const cloudinary = require("cloudinary");

exports.postCategory = async (req, res) => {
  cloudinaryConfig();
  const { name } = req.body;
  const image = req.file;

  if (!name) return res.status(400).send({ err: "Name is required" });
  if (!image) return res.status(400).send({ err: "Image is required" });

  try {
    const categoryExists = await Category.findOne({ name });
    if (categoryExists)
      return res.status(400).send({ err: "Category already exists" });

    const result = await cloudinary.v2.uploader.upload(image.path);
    const category = new Category({
      name,
      image: result.secure_url,
      publicId: result.public_id,
    });
    await category.save();
    return res.status(201).json({ category });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

// update category by id
exports.updateCategory = async (req, res) => {
  cloudinaryConfig();
  const { name, image } = req.body;

  if (!name) return res.status(400).send({ err: "Name is required" });
  if (!image && !req.file)
    return res.status(400).send({ err: "Image is required" });

  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).send({ err: "Category not found" });

    let result;
    if (req.file) {
      await cloudinary.v2.uploader.destroy(category.publicId);
      result = await cloudinary.v2.uploader.upload(image.path);
    }

    category.name = name;
    category.image = result ? result.secure_url : category.image;
    category.publicId = result ? result.public_id : category.publicId;
    const data = await category.save();
    return res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

// delete category by id
exports.deleteCategory = async (req, res) => {
  cloudinaryConfig();
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).send({ err: "Category not found" });

    await cloudinary.v2.uploader.destroy(category.publicId);
    await category.remove();
    return res.status(200).send({ msg: "Category deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};
