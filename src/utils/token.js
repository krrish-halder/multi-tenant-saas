const jwt = require("jsonwebtoken");
const crypto = require("crypto");

exports.generateJWT = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.generateRandomToken = () => {
  return crypto.randomBytes(32).toString("hex");
};
