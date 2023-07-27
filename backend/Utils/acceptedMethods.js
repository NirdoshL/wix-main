const allowedMethods = require("../Config/allowedMethods");

exports.limitMethods = (req, res, next) => {
  if (!allowedMethods.includes(req.method)) {
    return res.status(405).send("Method Not Allowed");
  }

  next();
};
