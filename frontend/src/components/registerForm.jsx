import React from "react";
import Image from "../assets/3d1.png";
import { useFormik } from "formik";
import { registerValidation } from "../validation/validate";
import { RegisterUser } from "../function/userHandle";
import { Link } from "react-router-dom";
// import { RegisterMenuData } from "../function/registerMenu";

const initialValues = {
  name: "",
  email: "",
  password: "",
  terms: false,
};

export function RegisterForm() {
  const { values, errors, touched, handleBlur, handleSubmit, handleChange } =
    useFormik({
      initialValues,
      validationSchema: registerValidation,
      onSubmit: async (values, action) => {
        const { ...data } = values;
        await RegisterUser(data);
        action.resetForm();
      },
    });
  return (
    <form onSubmit={handleSubmit}>
      <div className=" flex items-center justify-center min-h-screen bg-white">
        <div className="flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          <div className="flex flex-col justify-center p-8 md:p-14">
            <span className="mb-3 text-4xl text-green-600 font-bold">
              Register to MyDvls
            </span>
            <span className="font-light text-gray-400 mb-8">
              Please fill the form correctly.
            </span>
            {/* name*/}

            <div className="py-4">
              <span className="mb-2 text-md">
                UserName:
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
            {/* Email*/}

            <div className="py-4">
              <span className="mb-2 text-md">
                Email:
                <span className="mb-2 text-md text-red-600">*</span>
              </span>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                id="email"
              />
              {errors.email && touched.email ? (
                <span className="font-light text-red-400 mb-8">
                  {errors.email}
                </span>
              ) : null}
            </div>
            {/* password*/}

            <div className="py-4">
              <span className="mb-2 text-md">
                Password
                <span className="mb-2 text-md text-red-600">*</span>
              </span>
              <input
                autoComplete="false"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                id="password"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              />
              {errors.password && touched.password ? (
                <span className="font-light text-red-400 mb-8">
                  {errors.password}
                </span>
              ) : null}
            </div>

            {/* terms and privacy*/}
            <div className="flex items-start mdl:items-center gap-2">
              <input
                type="checkbox"
                name="terms"
                checked={values.terms}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-4 h-4 mt-1 mdl:mt-0 cursor-pointer"
              />
              <p className="text-sm text-primeColor">
                I agree to the dvls{" "}
                <span className="text-green-500">Terms of Service </span>and{" "}
                <span className="text-green-500">Privacy Policy</span>.
              </p>
              {errors.terms && touched.terms ? (
                <span className="font-light text-red-400 mb-8">
                  {errors.terms}
                </span>
              ) : null}
            </div>
            {/*  Register Button*/}
            <button
              type="submit"
              className="w-full bg-green-600 text-white p-2 rounded-lg mb-6 mt-2 hover:bg-white hover:text-black hover:border hover:border-gray-300"
            >
              Register
            </button>
            <p className="text-sm text-center font-titleFont font-medium">
              Already have an Account?{" "}
              <Link to="/">
                <span className="text-green-800 hover:text-green-600 duration-300">
                  log In
                </span>
              </Link>
            </p>
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
