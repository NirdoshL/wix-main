import React from "react";
import { useFormik } from "formik";
import Image from "../../assets/3d1.png";
import { RegisterMenuData } from "../../function/registerMenu";
import { restaurantValidation } from "../../validation/validate";

const initialValues = {
  name: "",
  apiID: "",
  locationID: "",
};

export function RestaurantForm() {
  const { values, errors, touched, handleBlur, handleSubmit, handleChange } =
    useFormik({
      initialValues,
      validationSchema: restaurantValidation,
      onSubmit: async (values, action) => {
        const { ...data } = values;
        await RegisterMenuData(data);
        action.resetForm();
      },
    });
  return (
    <form onSubmit={handleSubmit}>
      <div className=" flex items-center justify-center min-h-screen bg-white">
        <div className="flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          <div className="flex flex-col justify-center p-8 md:p-14">
            <p>Testing ApiID: 1181234022895776</p>
            <p>Testing Name: EverestMaya</p>
            <p>Testing locationID: 70c512d8-eb4e-4524-8f1b-e86239409658</p>
            <span className="mb-3 text-4xl text-green-600 font-bold">
              Add Your Restaurant
            </span>
            <span className="font-light text-gray-400 mb-8">
              Please fill the form correctly.
            </span>
            <div className="py-4">
              <span className="mb-2 text-md">
                Restaurant Name
                <span className="mb-2 text-md text-red-600">*</span>
              </span>
              <input
                type="text"
                name="name"
                id="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              />
              {errors.name && touched.name ? (
                <span className="font-light text-red-400 mb-8">
                  {errors.name}
                </span>
              ) : null}
            </div>
            <div className="py-4">
              <span className="mb-2 text-md">
                Restaurant ID(API_ID)
                <span className="mb-2 text-md text-red-600">*</span>
              </span>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="apiID"
                value={values.apiID}
                onChange={handleChange}
                onBlur={handleBlur}
                id="apiID"
              />
              {errors.apiID && touched.apiID ? (
                <span className="font-light text-red-400 mb-8">
                  {errors.apiID}
                </span>
              ) : null}
            </div>
            <div className="py-4">
              <span className="mb-2 text-md">
                Location ID
                <span className="mb-2 text-md text-red-600">*</span>
              </span>
              <input
                type="text"
                name="locationID"
                value={values.locationID}
                onChange={handleChange}
                onBlur={handleBlur}
                id="locationID"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              />
              {errors.locationID && touched.locationID ? (
                <span className="font-light text-red-400 mb-8">
                  {errors.locationID}
                </span>
              ) : null}
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
            >
              Add Restaurant
            </button>
          </div>
          <div>
            <img
              src={Image}
              alt="img"
              className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
