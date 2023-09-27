const express = require("express");
const router = express.Router();
const { checkRole } = require("../middleware/checkRole");
const { isAuthenticated } = require("../middleware/checkAuthentication");
const { allOrder, allOrderByID } = require("../Controller/orderController");

router.get(
  "/admin/get/allorder",
  isAuthenticated,
  checkRole("superadmin", "admin"),
  allOrder
);

router.get(
  "/admin/get/allorder/:user/:id",
  isAuthenticated,
  checkRole("superadmin", "admin"),
  allOrderByID
);

module.exports = router;
