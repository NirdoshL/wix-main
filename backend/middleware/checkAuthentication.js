const ErrorHandler = require("../Utils/errorClass");
const { tryCatch } = require("../Utils/tryCatchController");
const { verifyToken } = require("../utils/utility.function");

exports.isAuthenticated = tryCatch(async (req, res, next) => {
  const token = (await req.cookies.ACST) ? await req.cookies.ACST : null;
  if (!token) {
    throw new ErrorHandler("Invalid Token.", 403);
  }
  const verifyTokens = await verifyToken(token);
  if (!verifyTokens) {
    throw new ErrorHandler("Invalid Token.", 403);
  }
  return true && next();
});
