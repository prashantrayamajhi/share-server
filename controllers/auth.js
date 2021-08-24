const User = require("./../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
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
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).send({ err: "Invalid credentials" });
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) res.status(401).send({ err: "Invalid credentials" });
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    const data = {
      id: user._id,
      token,
      role: user.role,
    };
    return res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};
