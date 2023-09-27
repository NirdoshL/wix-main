const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OrderSchema = new Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: { type: String },
        quantity: { type: Number, default: 1 },
        name: { type: String },
        price: { type: String },
        resID: { type: String },
        variation: { type: String },
        variationPrice: { type: Number },
      },
    ],
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    shipping: { type: Object, required: true },
    delivery_status: { type: String, default: "pending" },
    payment_status: { type: String, required: true },
    bill_No: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);
module.exports = Order = mongoose.model("order", OrderSchema);
