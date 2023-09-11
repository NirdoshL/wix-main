import * as Yup from "yup";

export const restaurantValidation = Yup.object({
  //Name validation
  name: Yup.string()
    .min(3, "Restaurant Name must be greater than 3 characters.")
    .max(30, "Restaurant Name limit reached.")
    .required("Restaurant Name is required."),

  //API_ID validation
  apiID: Yup.string()
    .min(6, "API_ID must be greater than 6 characters.")
    .max(50, "API_ID limit reached.")
    .required("API_ID is required."),

  //Location_ID validation
  locationID: Yup.string()
    .min(6, "Location_ID must be greater than 6 characters.")
    .max(50, "Location_ID limit reached.")
    .required("Location_ID is required."),
});

export const toggleAccessValidation = Yup.object({
  //Name validation
  resName: Yup.string()
    .min(3, "Restaurant Name must be greater than 3 characters.")
    .max(30, "Restaurant Name limit reached.")
    .required("Restaurant Name is required."),

  //ID validation
  resID: Yup.string()
    .min(6, "Restaurant Id must be greater than 6 characters.")
    .max(50, "Restaurant Id limit reached.")
    .required("Restaurant Id is required."),
});

export const loginValidation = Yup.object({
  //email validation
  email: Yup.string()
    .max(50, "Email limit reached.")
    .email("Invalid Email")
    .required("Email is required."),

  //Location_ID validation
  password: Yup.string()
    .min(6, "Password must be greater than 6 characters.")
    .max(50, "Password limit reached.")
    .required("Password is required."),
});

export const registerValidation = Yup.object({
  //Name validation
  name: Yup.string()
    .min(3, "UserName must be greater than 3 characters.")
    .max(24, "UserName limit reached.")
    .required("UserName is required."),

  //email validation
  email: Yup.string()
    .max(50, "Email limit reached.")
    .email("Invalid Email")
    .required("Email is required."),

  //Location_ID validation
  password: Yup.string()
    .min(6, "Password must be greater than 6 characters.")
    .max(50, "Password limit reached.")
    .required("Password is required."),
  //Checkbox
  terms: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),
});
