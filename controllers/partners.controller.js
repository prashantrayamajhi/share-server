const Partner = require("./../model/Partners");

exports.getPartners = async (req, res) => {
  try {
    const data = await Partner.find();
    return res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

exports.getPartnerById = async (req, res) => {
  try {
    const data = await Partner.findById(req.params.id);
    if (!data) return res.status(404).send({ err: "Partner not found" });
    return res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};
