import React from "react";
import { useFormik } from "formik";
import { globalemailValidation } from "../../validation/validate";
import { Formfield } from "../../components";
import { sendEmail } from "../../function/sendGlobalEmail";

const initialValues = {
  users: "",
  subject: "",
  title: "",
  links: "",
  paragraph: "",
  linkaddress: "",
};

export default function EmailSettings() {
  const { values, errors, touched, handleBlur, handleSubmit, handleChange } =
    useFormik({
      initialValues,
      validationSchema: globalemailValidation,
      onSubmit: async (values, action) => {
        const { ...data } = values;
        await sendEmail(data);
        action.resetForm();
      },
    });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className=" flex items-center justify-center h-full bg-white">
          <div className="flex flex-col m-6 space-y-8 bg-white rounded-2xl md:flex-row md:space-y-0">
            <div className="flex flex-col justify-center p-8 md:p-14">
              <span className="mb-3 text-4xl text-green-600 font-bold">
                Target Email
              </span>
              <hr />
              <p className="text-2xl text-green-500">
                Send Email to targeted audience.
              </p>
              {/* here */}
              <div className="flex flex-row">
                <Formfield
                  title={" Send To"}
                  req={true}
                  type={"text"}
                  name={"users"}
                  value={values.users}
                  onchange={handleChange}
                  onblur={handleBlur}
                  id={"users"}
                  error={errors.users}
                  touched={touched.users}
                />
                <Formfield
                  title={"Email Subject"}
                  req={true}
                  type={"text"}
                  name={"subject"}
                  value={values.subject}
                  onchange={handleChange}
                  onblur={handleBlur}
                  id={"subject"}
                  error={errors.subject}
                  touched={touched.subject}
                />
              </div>
              {/* here */}
              <Formfield
                title={"Email Title"}
                req={true}
                type={"text"}
                name={"title"}
                value={values.title}
                onchange={handleChange}
                onblur={handleBlur}
                id={"title"}
                error={errors.title}
                touched={touched.title}
              />
              <Formfield
                title={"Email Description"}
                req={true}
                type={"text"}
                name={"paragraph"}
                value={values.paragraph}
                onchange={handleChange}
                onblur={handleBlur}
                id={"paragraph"}
                error={errors.paragraph}
                touched={touched.paragraph}
              />
              <div className="flex flex-row">
                <Formfield
                  title={"Links title"}
                  req={false}
                  type={"text"}
                  name={"links"}
                  value={values.links}
                  onchange={handleChange}
                  onblur={handleBlur}
                  id={"links"}
                  error={errors.links}
                  touched={touched.links}
                />
                <Formfield
                  title={"Attach Links"}
                  req={false}
                  type={"text"}
                  name={"linkaddress"}
                  value={values.linkaddress}
                  onchange={handleChange}
                  onblur={handleBlur}
                  id={"linkaddress"}
                  error={errors.linkaddress}
                  touched={touched.linkaddress}
                />
              </div>
              <button
                type="submit"
                className="w-32 bg-green-600 text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
              >
                Send Email
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
