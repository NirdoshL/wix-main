const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/checkAuthentication");
const {
  signUp,
  logIn,
  logOut,
  verify,
  getUsers,
  makeAdmin,
} = require("../Controller/UserController");
const {
  userRegisterValidator,
  userLoginValidator,
} = require("../Validation/validator");
const { checkRole } = require("../middleware/checkRole");

// userRoutes
router.post("/register", userRegisterValidator, signUp);

router.post("/login", userLoginValidator, logIn);

router.get("/logout", isAuthenticated, logOut);

router.get("/verify/:id/:code", verify);

//superAdminRole
router.get(
  "/admin/getusers",
  checkRole("superadmin"),
  isAuthenticated,
  getUsers
);
router.patch(
  "/superadmin/changerole",
  checkRole("superadmin"),
  isAuthenticated,
  makeAdmin
);

module.exports = router;
