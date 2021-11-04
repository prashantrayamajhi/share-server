exports.isAdmin = function (req, res, next) {
  if (req.user.role === "admin") {
    return next();
  }
  res.status(403).send("Access denied.");
};

exports.isModerator = function (req, res, next) {
  if (req.user.role === "admin" || req.user.role === "moderator") {
    return next();
  }
  res.status(403).send("Access denied.");
};

exports.isInvestor = function (req, res, next) {
  if (
    req.user.role === "admin" ||
    req.user.role === "moderator" ||
    req.user.role === "investor"
  ) {
    return next();
  }
  res.status(403).send("Access denied.");
};
