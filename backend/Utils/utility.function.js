const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT = require("../config/jwt");

const checkPassword = (password, passwordHash) => {
  return new Promise((resolve, reject) => {
    bcrypt
      .compare(password, passwordHash)
      .then((same) => {
        resolve(same);
      })
      .catch((error) => reject(error));
  }).catch((error) => console.log(Error, error));
};

const newToken = (user) => {
  return jwt.sign(
    { name: user.name, email: user.email, role: user.role },
    JWT.jwt,
    {
      expiresIn: JWT.jwtExp,
    }
  );
};

const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, JWT.jwt, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });

const decodeToken = async (token) => {
  const decoded = jwt.decode(token);
  return decoded;
};

module.exports = {
  newToken,
  verifyToken,
  checkPassword,
  decodeToken,
};
