const Partner = require("./../../model/Partners");
const cloudinaryConfig = require("./../../helper/cloudinary");
const cloudinary = require("cloudinary");
const fs = require("fs");

exports.postPartner = async (req, res) => {
  cloudinaryConfig();
  const { name, website } = req.body;
  const image = req.file;

  if (!name) return res.status(400).send({ err: "Name is required" });
  if (!image) return res.status(400).send({ err: "Image is required" });

  try {
    const partnerExists = await Partner.findOne({ name });
    if (partnerExists)
      return res.status(400).send({ err: "Partner already exists" });

    const result = await cloudinary.v2.uploader.upload(image.path);
    fs.unlinkSync(image.path);
    const partner = new Partner({
      name,
      website,
      image: result.secure_url,
      publicKey: result.public_id,
    });
    await partner.save();
    return res.status(201).json({ partner });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

// update partner by id
exports.updatePartner = async (req, res) => {
  cloudinaryConfig();
  const { name, website, image } = req.body;

  if (!name) return res.status(400).send({ err: "Name is required" });
  if (!image && !req.file)
    return res.status(400).send({ err: "Image is required" });

  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) return res.status(404).send({ err: "Partner not found" });

    let result;
    if (req.file) {
      await cloudinary.v2.uploader.destroy(partner.publicKey);
      result = await cloudinary.v2.uploader.upload(image.path);
      fs.unlinkSync(req.file.path);
    }

    partner.name = name;
    partner.website = website;
    partner.image = result ? result.secure_url : partner.image;
    partner.publicKey = result ? result.public_id : partner.publicKey;
    const data = await partner.save();
    return res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

// delete partner by id
exports.deletePartner = async (req, res) => {
  cloudinaryConfig();
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) return res.status(404).send({ err: "Partner not found" });

    await cloudinary.v2.uploader.destroy(partner.publicKey);
    await partner.remove();
    return res.status(200).send({ msg: "Partner deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};
