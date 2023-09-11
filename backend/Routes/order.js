const express = require("express");
const { checkRole } = require("../middleware/checkRole");
const { isAuthenticated } = require("../middleware/checkAuthentication");
const { allOrder, allOrderByID } = require("../Controller/orderController");
const router = express.Router();

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
