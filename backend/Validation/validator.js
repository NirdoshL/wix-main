const { checkSchema } = require("express-validator");

//User Registration validation
exports.userRegisterValidator = checkSchema({
  name: {
    exists: {
      errorMessage: "UserName is required.",
      options: { checkFalsy: true },
    },
    isString: { errorMessage: "UserName should be string." },
    isLength: {
      options: { min: 3, max: 24 },
      errorMessage: "Password should be between 6-50 characters.",
    },
  },
  email: {
    isEmail: { errorMessage: "Please provide valid email." },
  },
  password: {
    exists: { errorMessage: "Password is required." },
    isString: { errorMessage: "Password should be string." },
    isLength: {
      options: { min: 5, max: 50 },
      errorMessage: "Password should be between 6-50 characters.",
    },
  },
});

//User Login validation
exports.userLoginValidator = checkSchema({
  email: {
    isEmail: { errorMessage: "Please provide valid email." },
  },
  password: {
    exists: { errorMessage: "Password is required." },
    isString: { errorMessage: "Password should be string." },
    isLength: {
      options: { min: 5, max: 50 },
      errorMessage: "Password should be between 6-50 characters.",
    },
  },
});

//Menu Registration validation
exports.menuRegisterValidator = checkSchema({
  name: {
    exists: {
      errorMessage: "RestaurantName is required.",
      options: { checkFalsy: true },
    },
    isString: { errorMessage: "RestaurantName should be string." },
    isLength: {
      options: { min: 3, max: 24 },
      errorMessage: "RestaurantName should be between 6-50 characters.",
    },
  },
  apiID: {
    exists: {
      errorMessage: "Api ID is required.",
      options: { checkFalsy: true },
    },
    isString: { errorMessage: "Api ID should be string." },
    isLength: {
      options: { min: 6, max: 50 },
      errorMessage: "Api ID should be between 6-50 characters.",
    },
  },
  locationID: {
    exists: {
      errorMessage: "Location ID is required.",
      options: { checkFalsy: true },
    },
    isString: { errorMessage: "Location ID should be string." },
    isLength: {
      options: { min: 6, max: 50 },
      errorMessage: "Location ID should be between 6-50 characters.",
    },
  },
  city: {
    exists: {
      errorMessage: "City is required.",
      options: { checkFalsy: true },
    },
    isString: { errorMessage: "City should be string." },
    isLength: {
      options: { min: 3, max: 24 },
      errorMessage: "City should be between 3-24 characters.",
    },
  },
  address1: {
    exists: {
      errorMessage: "Address 1 is required.",
      options: { checkFalsy: true },
    },
    isString: { errorMessage: "Address 1 should be string." },
    isLength: {
      options: { min: 3, max: 24 },
      errorMessage: "Address 1 should be between 3-24 characters.",
    },
  },
  address2: {
    exists: {
      errorMessage: "Address 2 is required.",
      options: { checkFalsy: true },
    },
    isString: { errorMessage: "Address 2 should be string." },
    isLength: {
      options: { min: 3, max: 24 },
      errorMessage: "Address 2 should be between 3-24 characters.",
    },
  },
});
