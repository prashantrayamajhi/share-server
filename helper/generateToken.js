const jwt = require("jsonwebtoken");

/**
 * Generates a token for user
 *
 * @param {object} user
 * @param {string} secret
 * @param {date} expiresIn
 */
exports.generateToken = (user, secret, expiresIn) => {
  const { _id, name, email } = user;

  return jwt.sign({ id: _id, name, email }, secret, { expiresIn });
};

/**
 * Length of the token
 * @param {length}
 */
exports.generateVerificationToken = (length) => {
  const variables = "abcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < length; i++) {
    token += variables[Math.floor(Math.random() * variables.length)];
  }
  token = token.toUpperCase();
  return token;
};
