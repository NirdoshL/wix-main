const RegisterMenu = require("../Model/registerMenu");
const ErrorHandler = require("../Utils/errorClass");
const { tryCatch } = require("../Utils/tryCatchController");

exports.getMenu = tryCatch(async (req, res, next) => {
  const data = await RegisterMenu.find();
  if (data.length > 0) {
    res.status(200).json({
      success: true,
      message: "Data Fetched Successfully",
      data: data,
    });
    next();
  } else {
    next(new ErrorHandler());
  }
});

exports.registerMenu = tryCatch(async (req, res, next) => {
  const { apiID, locationID, name } = await req.body;
  await RegisterMenu.findOne({ apiID: apiID })
    .then(async (item) => {
      if (!item) {
        const newRegesteredMenu = new RegisterMenu({
          apiID: apiID,
          locationID: locationID,
          name: name,
        });
        const saveMenu = await newRegesteredMenu.save();
        if (saveMenu) {
          // res.status(200).json({
          //   success: true,
          //   message: "Menu Registered Successfully.",
          // });
          next();
        }
      } else {
        next(new ErrorHandler("Item with that ID already registered.", 409));
      }
    })
    .catch((err) => next(new ErrorHandler(`${err}`)));
});
