const User = require("./../model/User");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const emailExists = await User.findOne({ email });
    if (emailExists)
      return res.status(400).send({ err: "Email already registered" });
    const user = new User({
      name,
      email,
      password,
    });
    const savedUser = await user.save();
    return res.status(201).json({ data: savedUser });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

exports.login = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};
