import { useFormik } from "formik";
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";
import Spinner from "../../components/spinner";
import { MdVerifiedUser } from "react-icons/md";
import React, { useState, useEffect } from "react";
import { toggleAccessValidation } from "../../validation/validate";
import { employeeData, toggleAccess } from "../../function/employee";

const initialValues = {
  id: "",
  resID: "",
  resName: "",
};

export function EmployeeList() {
  const [data, setData] = useState();
  const [ShowLoader, setShowLoader] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");

  const togglePopup = (userId) => {
    setIsOpen(!isOpen);
    setSelectedUserId(userId);
  };

  useEffect(() => {
    async function fetchDataAsync() {
      try {
        const responseData = await employeeData();
        setData(responseData);
        console.log("order", responseData);
        setShowLoader(false);
      } catch (error) {
        setShowLoader(false);
        toast(`Error fetching data: ${error}`);
      }
    }

    fetchDataAsync();
  }, []);

  const { values, errors, touched, handleBlur, handleSubmit, handleChange } =
    useFormik({
      initialValues,
      validationSchema: toggleAccessValidation,
      onSubmit: async (values, action) => {
        const data = {
          id: selectedUserId,
          resID: values.resID,
          resName: values.resName,
        };

        await toggleAccess(data);
        action.resetForm();
        setIsOpen(false);
      },
    });

  return ShowLoader ? (
    <Spinner />
  ) : (
    <>
      <div className="overflow-x-auto mt-24 h-[80vh]">
        <table className="min-w-full divide-y divide-gray-200 ">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                S.N
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Role
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Verified
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Browser
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Access
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data && data.success ? (
              data.users.map((user, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.isverified ? (
                      <MdVerifiedUser className="fill-current text-green-500 mr-4" />
                    ) : (
                      <RxCross2 className="fill-current text-red-500 mr-4" />
                    )}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.userInfo.browser}
                  </td>
                  {user.isverified && user.role === "user" && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white bg-red-500 hover:bg-red-600 rounded-md focus:outline-none focus:ring focus:border-red-300">
                      <button onClick={() => togglePopup(user._id)}>
                        Make Admin
                      </button>
                    </td>
                  )}
                  {user.isverified && user.role === "admin" && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white bg-green-500 hover:bg-green-600 rounded-md focus:outline-none focus:ring focus:border-green-300">
                      <button onClick={() => togglePopup(user._id)}>
                        Make User
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  No User Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl text-red-500 font-semibold mb-4">
              ⚠️ Warning!!!
            </h2>
            <p className="text-sm text-red-500 font-semibold mb-4">
              You are going to change Role.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="resName" className="block text-gray-700">
                  Restaurant Name:
                </label>
                <input
                  type="text"
                  id="resName"
                  name="resName"
                  value={values.resName}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                    touched.resName && errors.resName ? "border-red-500" : ""
                  }`}
                  placeholder="Enter Restaurant Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.resName && errors.resName && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.resName}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="resID" className="block text-gray-700">
                  Restaurant ID:
                </label>
                <input
                  type="text"
                  id="resID"
                  name="resID"
                  className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                    touched.resID && errors.resID ? "border-red-500" : ""
                  }`}
                  placeholder="Enter Restaurant ID"
                  value={values.resID}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.resID && errors.resID && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.resID}
                  </div>
                )}
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full focus:outline-none focus:ring focus:border-red-300"
                >
                  Submit
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-full focus:outline-none focus:ring focus:border-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
