const User = require("./../model/User");

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
