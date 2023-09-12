const bcrypt = require("bcryptjs");
const User = require("../model/User");
const crypto = require("crypto");
const ErrorHandler = require("../Utils/errorClass");
const asyncHandler = require("express-async-handler");
const { tryCatch } = require("../Utils/tryCatchController");
const { getUserInfo } = require("../Utils/getUserInfo");
const { validationResult } = require("express-validator");

const {
  checkPassword,
  newToken,
  verifyToken,
} = require("../utils/utility.function");
const cookiesName = require("../Config/cookiesName");
const cookieExpiry = require("../Config/cookieExpiry");
const sendEmail = require("../Utils/sendmail");

// Register user
exports.signUp = asyncHandler(
  tryCatch(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    console.log(req.body.name);
    const { email, name, password } = await req.body;
    const userAgent = await req.headers["user-agent"];
    const ip = await req.ip;
    const userInformation = getUserInfo(userAgent, ip);
    User.findOne({ email: email })
      .then((user) => {
        if (!user) {
          const emailVerificationCode = crypto.randomUUID();
          const newUser = new User({
            name: name,
            email: email,
            password: password,
            userInfo: userInformation,
            emailToken: emailVerificationCode,
          });

          bcrypt.genSalt(10, (err, salt) => {
            if (err) {
              throw new ErrorHandler(`Error due to ${err}`);
            } else {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) {
                  throw new ErrorHandler(`Error due to ${err}`);
                } else {
                  newUser.password = hash;
                  newUser
                    .save()
                    .then((user) => {
                      if (user) {
                        sendEmail({
                          to: email,
                          subject: "Email verification",
                          html: `<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
                          <table role="presentation" cellspacing="0" cellpadding="0" width="100%" style="border-collapse: collapse;">
                              <tr>
                                  <td style="padding: 20px 0; text-align: center; background-color: #008000; color: #fff;">
                                      <h1>Email Verification</h1>
                                  </td>
                              </tr>
                              <tr>
                                  <td style="padding: 30px; background-color: #fff; border-radius: 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
                                      <p>Hello ${name},</p>
                                      <p>Thank you for signing up! To complete your registration, please click the button below to verify your email address:</p>
                                      <p style="text-align: center;">
                                          <a href="${process.env.BACKEND_URL}${process.env.PORT}/users/verify/id=${newUser._id}/code=${emailVerificationCode}" style="display: inline-block; background-color: #008000; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Verify Email</a>
                                      </p>
                                  </td>
                              </tr>
                              <tr>
                                  <td style="text-align: center; color: #777; margin-top: 20px;">
                                      &copy; 2023 MyDVLS. All rights reserved.
                                  </td>
                              </tr>
                          </table>
                      </body>
                        `,
                        });
                        res.status(200).json({
                          success: true,
                          message: "Please Verify your email.",
                        });
                        next();
                      }
                    })
                    .catch((err) =>
                      res
                        .status(400)
                        .json({ success: false, message: `${err}` })
                    );
                }
              });
            }
          });
        } else {
          res.status(409);
          throw new ErrorHandler("User already exists");
        }
      })
      .catch((err) =>
        res.status(400).json({ success: false, message: `${err}` })
      );
  })
);

//Login User
exports.logIn = asyncHandler(
  tryCatch(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    const { password, email } = await req.body;
    const userAgent = await req.headers["user-agent"];
    const ip = await req.ip;
    const userInformation = getUserInfo(userAgent, ip);
    await User.findOne({ email: email })
      .select("+password")
      .then(async (user) => {
        if (!user) {
          throw new ErrorHandler("You have to Sign up first !", 400);
        }
        if (!user.isverified) {
          throw new ErrorHandler("Please verify your Email first !", 400);
        }
        checkPassword(password, user.password)
          .then(async (same) => {
            if (!same) {
              throw new ErrorHandler("Invalid Password.", 400);
            }
            // if (user.accessToken.length > maxDevice) {
            //   throw new ErrorHandler("Max device limit reached.", 400);
            // }

            const token = newToken(user);
            const hash = crypto
              .createHash("sha256")
              .update(user.role)
              .digest("hex");
            const currentUser = {
              id: user._id,
              name: user.name,
              email: user.email,
              role: hash,
              resID: user.resID,
              resName: user.resName,
              userInfo: userInformation,
              isAuthenticated: true,
            };
            user.accessToken.push(token);
            user.userInfo = userInformation;
            user.isLogged = true;
            await user.save();
            res.cookie(cookiesName[1], `${token}`, {
              httpOnly: true,
              secure: true,
              maxAge: cookieExpiry,
              sameSite: "None",
            });
            res.status(200).send({
              success: true,
              user: currentUser,
            });
            next();
          })
          .catch((err) =>
            res.status(400).json({
              success: false,
              message: `${err}`,
            })
          );
      })
      .catch((err) =>
        res.status(400).json({
          success: false,
          message: `${err}`,
        })
      );
  })
);

//Verification of users email
exports.verify = asyncHandler(
  tryCatch(async (req, res, next) => {
    const code = await req.params.code.split("=")[1];
    const id = await req.params.id.split("=")[1];
    console.log(typeof code);
    await User.findById(id)
      .select("+emailToken")
      .then(async (user) => {
        if (user.isverified) {
          throw new ErrorHandler("Email already verified.");
        } else if (user.emailToken !== code)
          throw new ErrorHandler("Verification code is wrong.");
        else {
          user.isverified = true;
          user.emailToken = undefined;
          await user.save();
          return res.redirect(process.env.CLIENT_URL);
        }
      })
      .catch((error) => {
        res.status(500).json({
          success: true,
          message: `Problem in verifying user:${error}`,
        });
      });
  })
);

// Logout the user
exports.logOut = asyncHandler(
  tryCatch(async (req, res, next) => {
    const token = (await req.cookies.ACST) ? await req.cookies.ACST : null;
    verifyToken(token)
      .then(async (isToken) => {
        if (isToken) {
          await User.findOne({ accessToken: token })
            .then(async (user) => {
              if (!user) {
                throw new ErrorHandler(
                  "You do not have permission to perform this action."
                );
              }
              user.accessToken = user.accessToken.filter((rt) => rt != token);
              user.isLogged = false;
              await user.save();
              res.clearCookie(cookiesName[1], {
                httpOnly: true,
                secure: true,
                sameSite: "None",
              });
              res.status(200).json({
                success: true,
                message: "Logout Successful.",
              });
            })
            .catch((error) => {
              res.status(500).json({
                success: true,
                message: `Problem in logging out:${error}`,
              });
            });
        }
      })
      .catch((error) => {
        res.status(500).json({
          success: true,
          message: `Problem in logging out:${error}`,
        });
      });
  })
);

//fetch all user (SuperAdmin Only)
exports.getUsers = asyncHandler(
  tryCatch(async (req, res, next) => {
    const user = await User.find({}).select("-accessToken");
    if (!user) {
      next(new ErrorHandler("No User Found"));
    }
    res.status(200).json({
      success: true,
      users: user,
    });
  })
);

//toggle user roles(superAdmin Only)
exports.makeAdmin = asyncHandler(
  tryCatch(async (req, res, next) => {
    const { id, resID, resName } = req.body;
    await User.findById(id)
      .then(async (user) => {
        if (!user) {
          next(new ErrorHandler("No User Found."));
        }
        if (!user.isverified) {
          next(new ErrorHandler("User not verified.", 400));
        }

        if (user.isverified && user.role === "user") {
          user.role = "admin";
          user.resID = resID;
          user.resName = resName;
        } else if (user.isverified && user.role === "admin") {
          user.role = "user";
          user.resID = undefined;
          user.resName = undefined;
        }
        const save = await user.save();
        if (save) {
          res.status(200).json({
            success: true,
            message: "Role Changed",
            user: save,
          });
          next();
        }
      })
      .catch((error) => {
        next(new ErrorHandler("Something went wrong"));
      });
  })
);

//wix registration and login
// Register user
exports.signUpAndLogin = asyncHandler(
  tryCatch(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { email, name, password } = await req.body;
    const userAgent = await req.headers["user-agent"];
    const ip = await req.ip;
    const userInformation = getUserInfo(userAgent, ip);
    User.findOne({ email: email })
      .then((user) => {
        if (!user) {
          const newUser = new User({
            name: name,
            email: email,
            password: password,
            userInfo: userInformation,
          });

          bcrypt.genSalt(10, (err, salt) => {
            if (err) {
              throw new ErrorHandler(`Error due to ${err}`);
            } else {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) {
                  throw new ErrorHandler(`Error due to ${err}`);
                } else {
                  newUser.password = hash;
                  newUser
                    .save()
                    .then((user) => {
                      if (user) {
                        console.log(user);
                        next();
                      }
                    })
                    .catch((err) =>
                      res
                        .status(400)
                        .json({ success: false, message: `${err}` })
                    );
                }
              });
            }
          });
        } else {
          res.status(409);
          throw new ErrorHandler("User already exists");
        }
      })
      .catch((err) =>
        res.status(400).json({ success: false, message: `${err}` })
      );
  })
);

//wix member login system
//no validation required and no verification check other is same as login

exports.wixlogIn = asyncHandler(
  tryCatch(async (req, res, next) => {
    const { id, email } = await req.body;
    console.log(req.body);
    const userAgent = await req.headers["user-agent"];
    const ip = await req.ip;
    const userInformation = getUserInfo(userAgent, ip);
    await User.findOne({ email: email })
      .select("+password")
      .then(async (user) => {
        if (!user) {
          throw new ErrorHandler("You have to Sign up first !", 400);
        }
        checkPassword(id, user.password)
          .then(async (same) => {
            if (!same) {
              throw new ErrorHandler("Invalid Password.", 400);
            }
            const token = newToken(user);
            const hash = crypto
              .createHash("sha256")
              .update(user.role)
              .digest("hex");
            const currentUser = {
              id: user._id,
              name: user.name,
              email: user.email,
              role: hash,
              resID: user.resID,
              resName: user.resName,
              userInfo: userInformation,
              isAuthenticated: true,
            };
            user.accessToken.push(token);
            user.userInfo = userInformation;
            user.isLogged = true;
            await user.save();
            res.cookie(cookiesName[1], `${token}`, {
              httpOnly: true,
              secure: true,
              maxAge: cookieExpiry,
              sameSite: "None",
            });
            res.status(200).send({
              success: true,
              user: currentUser,
            });
            // res.redirect(
            //   `http://localhost:3000/restaurant/terarrain/6814412901050500/${currentUser.name}/${hash}`
            // );
            next();
          })
          .catch((err) =>
            res.status(400).json({
              success: false,
              message: `${err}`,
            })
          );
      })
      .catch((err) =>
        res.status(400).json({
          success: false,
          message: `${err}`,
        })
      );
  })
);
