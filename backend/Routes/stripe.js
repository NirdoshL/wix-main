const express = require("express");
const router = express.Router();
const {
  stripePayment,
  stripeHook_PaymentCapture,
} = require("../Controller/stripePayment");

router.post("/create-checkout-session", stripePayment);

router.post(
  "/webhook",
  express.raw({ type: "*/*" }),
  stripeHook_PaymentCapture
);

module.exports = router;
