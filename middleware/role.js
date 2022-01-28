exports.isAdmin = function (req, res, next) {
  if (req.user.userType === "admin") {
    return next();
  }
  res.status(403).send("Access denied.");
};

exports.isModerator = function (req, res, next) {
  if (req.user.userType === "admin" || req.user.userType === "moderator") {
    return next();
  }
  res.status(403).send("Access denied.");
};

exports.isInvestor = function (req, res, next) {
  if (
    req.user.userType === "admin" ||
    req.user.userType === "moderator" ||
    req.user.userType === "investor"
  ) {
    return next();
  }
  res.status(403).send("Access denied.");
};
