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
  signUpAndLogin,
  wixlogIn,
  generateOTPToken,
  updateUserDetails,
} = require("../Controller/UserController");
const {
  userRegisterValidator,
  userLoginValidator,
} = require("../Validation/validator");
const { checkRole } = require("../middleware/checkRole");
const { sendEmailtoUser } = require("../middleware/emailAdmin");

//check Authenticted

router.post("/auth/check", isAuthenticated);

// userRoutes
router.post("/register", userRegisterValidator, signUp);

router.post("/login", userLoginValidator, logIn);

router.patch("/update", isAuthenticated, updateUserDetails);

router.get("/verification/token", isAuthenticated, generateOTPToken);

router.get("/logout", logOut);

router.get("/verify/:id/:code", verify);

router.post("/super/email", sendEmailtoUser);

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

//this is only for wix
router.post("/register/wix/memberonly", userRegisterValidator, signUpAndLogin);

router.post("/login/wix/memberonly", wixlogIn);

module.exports = router;
