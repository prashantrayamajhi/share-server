const User = require("./../model/User");
const Token = require("./../model/Token");
const bcrypt = require("bcryptjs");
const {
  generateToken,
  generateVerificationToken,
} = require("./../helper/generateToken");
const { sendVerificationToken } = require("./../helper/mail");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ $or: [{ email }, { username: email }] });
    if (!user) return res.status(401).send({ err: "Invalid credentials" });
    if (!user.isActivated)
      return res
        .status(401)
        .send({ err: "Please verify your account through mail" });
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword)
      return res.status(401).send({ err: "Invalid credentials" });
    const token = generateToken(user, process.env.JWT_SECRET, "1d");
    const data = {
      token,
      id: user._id,
      email: user.email,
      name: user.name,
      userType: user.userType,
    };
    return res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

exports.signup = async (req, res) => {
  try {
    const { email, name, address, password, confirmPassword, userType } =
      req.body;

    if (!email) {
      return res.status(400).send({ err: "Email cannot be empty" });
    }
    if (!address.trim()) {
      return res.status(400).send({ err: "Address cannot be empty" });
    }
    if (!name.trim()) {
      return res.status(400).send({ err: "Name cannot be empty" });
    }
    if (!password.trim()) {
      return res.status(400).send({ err: "Password cannot be empty" });
    }
    if (password !== confirmPassword) {
      return res.status(400).send({ err: "Passwords don't match" });
    }
    // if (!userType.trim()) {
    //   return res.status(400).send({ err: "Select a user type" });
    // }
    const emailExists = await User.findOne({ email });
    if (emailExists && !emailExists.isActivated) {
      const token = await Token.findOne({
        user: emailExists._id,
      });
      if (token) {
        await Token.findOneAndDelete({
          user: emailExists._id,
        });
      }
      await User.findByIdAndDelete(emailExists._id);
    }
    if (emailExists && emailExists.isActivated) {
      return res.status(409).send({ err: "Email already registered" });
    }
    const user = new User({ email, name, password, address });
    const token = generateVerificationToken(4);
    await sendVerificationToken({
      to: user.email,
      subject: "Verify Account",
      html: token,
    });
    const savedToken = new Token({ user: user._id, token });
    await savedToken.save();
    const data = await user.save();
    data.password = undefined;
    return res.status(201).json({ data });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

exports.postVerificationToken = async (req, res) => {
  const { token } = req.body;
  try {
    const validToken = await Token.findOne({ token }).populate("user", "_id");
    if (!validToken) return res.status(400).send({ err: "Invalid token" });
    const user = await User.findOne({ _id: validToken.user._id });
    if (user.isActivated)
      return res
        .status(400)
        .send({ err: "Account already activated please login" });
    if (!user) return res.status(400).send({ err: "Invalid token" });
    user.isActivated = true;
    await user.save();
    await Token.findOneAndDelete({ _id: validToken._id });
    return res.status(200).send({ msg: "Account activated" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

exports.resendVerificationToken = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).send({ err: "Email not registered" });
    if (user.isActivated)
      return res
        .status(400)
        .send({ err: "Your account has already been activated" });
    const token = generateVerificationToken(4);
    await sendVerificationToken({
      to: user.email,
      subject: "Verify Account",
      html: token,
    });
    const newToken = new Token({
      user: user._id,
      token,
    });
    await newToken.save();
    return res.status(200).send({ msg: "Mail sent successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};
