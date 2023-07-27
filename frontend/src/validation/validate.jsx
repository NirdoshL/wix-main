import * as Yup from "yup";

export const restaurantValidation = Yup.object({
  //Name validation
  name: Yup.string()
    .min(3, "Restaurant Name must be greater than 3 characters.")
    .max(30, "Restaurant Name limit reached.")
    .required("Restaurant Name is required"),

  //API_ID validation
  apiID: Yup.string()
    .min(6, "API_ID must be greater than 6 characters.")
    .max(50, "API_ID limit reached.")
    .required("API_ID is required"),

  //Location_ID validation
  locationID: Yup.string()
    .min(6, "Location_ID must be greater than 6 characters.")
    .max(50, "Location_ID limit reached.")
    .required("Location_ID is required."),
});
