import React, { useState } from "react";
import { useFormik } from "formik";
import { Formfield } from "../../components";
import { GetStore } from "../../config/store";
import { resetValidation } from "../../validation/validate";
import {
  resetPassword,
  resetPasswordToken,
} from "../../function/passwordReset";
import EmailSettings from "./globalemail";

const initialValues = {
  old: "",
  pass: "",
  newpass: "",
  token: "",
};

export function Settings() {
  const user = GetStore("user");
  const [open, setOpen] = useState(false);
  const { values, errors, touched, handleBlur, handleSubmit, handleChange } =
    useFormik({
      initialValues,
      validationSchema: resetValidation,
      onSubmit: async (values, action) => {
        const { ...data } = values;
        await resetPassword(data);
        action.resetForm();
        setOpen(false);
      },
    });
  const openVerification = async () => {
    // sendVerification Code
    const isSend = await resetPasswordToken();
    //if response is true open
    if (isSend) {
      setOpen(true);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className=" flex items-center justify-center h-[70vh] bg-white">
          <div className="flex flex-col m-6 space-y-8 bg-white rounded-2xl md:flex-row md:space-y-0">
            <div className="flex flex-col justify-center p-8 md:p-14">
              <span className="mb-3 text-4xl text-green-600 font-bold">
                Settings
              </span>
              <hr />
              <p className="text-2xl text-green-500">Reset Password</p>
              {/* here */}
              <div className="flex flex-row">
                <Formfield
                  title={"Old Password"}
                  req={true}
                  type={"password"}
                  name={"old"}
                  value={values.old}
                  onchange={handleChange}
                  onblur={handleBlur}
                  id={"old"}
                  error={errors.old}
                  touched={touched.old}
                />
                <Formfield
                  title={"New Password"}
                  req={true}
                  type={"password"}
                  name={"newpass"}
                  value={values.newpass}
                  onchange={handleChange}
                  onblur={handleBlur}
                  id={"newpass"}
                  error={errors.newpass}
                  touched={touched.newpass}
                />
              </div>
              {/* here */}
              <Formfield
                title={"Re-enter New Password"}
                req={true}
                type={"password"}
                name={"pass"}
                value={values.pass}
                onchange={handleChange}
                onblur={handleBlur}
                id={"pass"}
                error={errors.pass}
                touched={touched.pass}
              />
              <button
                type="button"
                onClick={openVerification}
                className="w-24 bg-green-600 text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
              >
                Get Token
              </button>
            </div>
          </div>
        </div>
        {open && !errors.newpass && !errors.old && !errors.pass && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 w-[300px] rounded-lg shadow-lg md:w-[600px]">
              <h2 className="text-xl text-green-600 font-semibold mb-4">
                Verify Your Identity
              </h2>
              <p className="text-sm text-green-500 font-semibold mb-4">
                A verification code has been sent to{" "}
                {user.user.email.split("@")[0].slice(0, 2)}*****@gmail.com.
                Enter the code to continue.
              </p>
              <Formfield
                title={"Enter Verification Token"}
                req={true}
                type={"number"}
                name={"token"}
                value={values.token}
                onchange={handleChange}
                onblur={handleBlur}
                id={"token"}
                error={errors.token}
                touched={touched.token}
              />
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-600 text-white py-2 px-4 rounded-full focus:outline-none focus:ring focus:border-green-300"
                >
                  Reset
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-full focus:outline-none focus:ring focus:border-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
      <EmailSettings />
    </>
  );
}
