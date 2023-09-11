const express = require("express");
const {
  stripePayment,
  stripeHook_PaymentCapture,
} = require("../Controller/stripePayment");
const router = express.Router();

router.post("/create-checkout-session", stripePayment);
router.post(
  "/webhook",
  express.raw({ type: "*/*" }),
  stripeHook_PaymentCapture
);
module.exports = router;
