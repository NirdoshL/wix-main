const User = require("../model/User");
const Order = require("../Model/orderModel");
const { tryCatch } = require("../Utils/tryCatchController");
const ErrorHandler = require("../Utils/errorClass");

exports.allOrder = tryCatch(async (req, res, next) => {
  const order = await Order.find();
  if (order.length > 0) {
    res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      data: order,
    });
    next();
  } else {
    next(new ErrorHandler("Order Fetching error"));
  }
});

exports.allOrderByID = tryCatch(async (req, res, next) => {
  const { user, id } = await req.params;
  await User.findById(user)
    .then(async (user) => {
      if (user.resID === id) {
        const order = await Order.find({ "products.resID": id }).exec();
        if (order.length > 0) {
          res.status(200).json({
            success: true,
            message: "Order fetched successfully",
            data: order,
          });
          next();
        } else {
          next(new ErrorHandler("Order Fetching error"));
        }
      } else {
        next(new ErrorHandler("Something went wrong."));
      }
    })
    .catch((error) => {
      next(new ErrorHandler("Something went wrong."));
    });
});
