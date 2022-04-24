const User = require("./../model/User");
const { sendEmail } = require("./../helper/mail");

exports.getInvestors = async (req, res) => {
  try {
    const data = await User.find({
      userType: "investor",
      //   isVerified: true,
      //   isActivated: true,
      //   isBanned: false,
    })
      .select("-password")
      .limit(req.query.limit ? +req.query.limit : 10);

    return res.status(200).json({ data });
  } catch (err) {
    console.log(err);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const data = await User.findById(req.params.id).select("-password");
    if (!data) return res.status(404).send({ err: "User not found" });
    return res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

exports.contact = async (req, res) => {
  const { name, email, number, message } = req.body;

  try {
    const body = `${message} phone number : ${number}`;
    await sendEmail(process.env.MAIL_USER, name, body);
    return res.status(200).send({ msg: "Message sent" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};
