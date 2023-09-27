import * as Yup from "yup";

export const restaurantValidation = Yup.object({
  //Name validation
  name: Yup.string()
    .min(3, "Restaurant Name must be greater than 3 characters.")
    .max(30, "Restaurant Name limit reached.")
    .required("Restaurant Name is required."),

  //City Name validation
  city: Yup.string()
    .min(3, "City Name must be greater than 3 characters.")
    .max(30, "City Name limit reached.")
    .required("City Name is required."),

  //Address validation
  address1: Yup.string()
    .min(3, "Address 1 must be greater than 3 characters.")
    .max(30, "Address 1 limit reached.")
    .required("Address 1 is required."),

  //Address validation
  address2: Yup.string()
    .min(3, "Addresss 2 must be greater than 3 characters.")
    .max(30, "Addresss 2 limit reached.")
    .required("Addresss 2 is required."),

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

export const cashierValidation = Yup.object({
  //Name validation
  cashier: Yup.string()
    .min(3, "Cashier Name must be greater than 3 characters.")
    .max(24, "Cashier Name limit reached.")
    .required("Cashier Name is required."),
});

export const resetValidation = Yup.object({
  //old password validation
  old: Yup.string()
    .min(6, "Password must be greater than 6 characters.")
    .max(50, "Password limit reached.")
    .required("Password is required."),

  //password validation
  newpass: Yup.string()
    .min(6, "Password must be greater than 6 characters.")
    .max(50, "Password limit reached.")
    .required("Password is required."),

  //new password validation
  pass: Yup.string()
    .min(6, "Password must be greater than 6 characters.")
    .max(50, "Password limit reached.")
    .required("Password is required.")
    .test("passwords-match", "New Passwords must match", function (value) {
      return value === this.parent.newpass;
    }),

  token: Yup.string()
    .matches(/^\d{6}$/, "Token length is 6.")
    .required("Token is required."),
});

export const globalemailValidation = Yup.object({
  users: Yup.string()
    .min(3, "Users must be greater than 3 characters.")
    .required("Users is required."),

  subject: Yup.string()
    .min(5, "Subject must be greater than 5 characters.")
    .max(100, "Subject limit reached.")
    .required("Subject is required."),

  title: Yup.string()
    .min(3, "Title must be greater than 3 characters.")
    .max(100, "Title limit reached.")
    .required("Title is required."),

  paragraph: Yup.string()
    .min(10, "Paragraph must be greater than 10 characters.")
    .max(1000, "Paragraph limit reached.")
    .required("Paragraph is required."),

  links: Yup.string()
    .min(3, "Links must be greater than 3 characters.")
    .max(400, "Links limit reached."),

  linkaddress: Yup.string()
    .min(3, "Links Address must be greater than 3 characters.")
    .max(600, "Links Address limit reached."),
});
