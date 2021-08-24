exports.signup = async (req, res) => {
  try {
    console.log(req.body);
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
