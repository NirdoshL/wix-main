const express = require("express");
const router = express.Router();
const {
  getItems,
  getMenuItems,
  fetchMenuAndData,
  toggleShow,
} = require("../Controller/menuController");
const { checkRole } = require("../middleware/checkRole");
const { menuRegisterValidator } = require("../Validation/validator");
const { isAuthenticated } = require("../middleware/checkAuthentication");
const { registerMenu, getMenu } = require("../Controller/registerController");
// const { checkRole } = require("../middleware/checkRole");

// checkRole("value") checks the role
//isAuthenticated checks whether user is logged or not

router.post(
  "/register",
  checkRole("superadmin"),
  menuRegisterValidator,
  registerMenu,
  getItems
);
router.get("/menus", isAuthenticated, getMenu);
router.get("/menus/:id", isAuthenticated, getMenuItems);
router.get("/menus/section/data/:id", fetchMenuAndData);
router.get("/menus/restaurant/toggle/:id", checkRole("superadmin"), toggleShow);

module.exports = router;
