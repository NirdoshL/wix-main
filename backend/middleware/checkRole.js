const ErrorHandler = require("../Utils/errorClass");
const { tryCatch } = require("../Utils/tryCatchController");
const { decodeToken } = require("../utils/utility.function");
const User = require("../model/User");

exports.checkRole = (...roles) => {
  return tryCatch(async (req, res, next) => {
    const token = (await req.cookies.ACST) ? await req.cookies.ACST : null;
    if (!token) {
      throw new ErrorHandler("Invalid Token.", 403);
    }
    decodeToken(token)
      .then(async (decoded) => {
        if (!roles.includes(await decoded.role)) {
          next(
            new ErrorHandler(
              "You do not have permission to perform this action",
              403
            )
          );
        }
        await User.findOne({ email: decoded.email })
          .then((user) => {
            if (user.role === decoded.role) {
              next();
            }
          })
          .catch((err) => {
            next(
              new ErrorHandler(
                `You do not have permission to perform this action due to ${err}`,
                403
              )
            );
          });
      })
      .catch((err) => {
        next(
          new ErrorHandler(
            `You do not have permission to perform this action due to ${err}`,
            403
          )
        );
      });
  });
};
