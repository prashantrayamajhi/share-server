const Category = require("./../model/Category");

exports.getCategories = async (req, res) => {
  try {
    const data = await Category.find();
    return res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const data = await Category.findById(req.params.id);
    if (!data) return res.status(404).send({ err: "Category not found" });
    return res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};
