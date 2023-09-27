import { useState, useEffect } from "react";
import Spinner from "../../components/spinner";
import { TiTick } from "react-icons/ti";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { AiFillPrinter } from "react-icons/ai";
import { fetchOrderByID } from "../../function/fetchOrder";
import { GetStore, Store } from "../../config/store";
import { generatedPDF } from "../../function/invoice";
import { cashierValidation } from "../../validation/validate";
import { orderHeaders } from "../../config/tableHeader";

const initialValues = {
  cashier: "",
};

export function AdminOrderList() {
  const user = GetStore("user");
  const cashier = GetStore("cashier");

  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [ShowLoader, setShowLoader] = useState(true);
  const Update = () => {
    setIsOpen(true);
  };
  const { values, errors, touched, handleBlur, handleSubmit, handleChange } =
    useFormik({
      initialValues,
      validationSchema: cashierValidation,
      onSubmit: async (values, action) => {
        Store("cashier", values.cashier);
        toast.success("Cashier Stored!");
        action.resetForm();
        setIsOpen(false);
      },
    });

  useEffect(() => {
    async function fetchDataAsync() {
      try {
        const responseData = await fetchOrderByID(
          user.user.id,
          user.user.resID
        );
        console.log(responseData);
        setData(responseData);
        setShowLoader(false);
      } catch (error) {
        ShowLoader(true);
        toast.error(`Error fetching data: ${error}`);
      }
    }

    fetchDataAsync();
  }, [user.user.id, user.user.resID, ShowLoader]);

  const fetchPdf = (data, cashier) => async () => {
    try {
      const response = await generatedPDF(data, cashier);

      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(pdfBlob);

      window.open(url, "_blank");
    } catch (error) {
      ShowLoader(true);
      toast.error(`${error}`);
    }
  };
  const handlePrintButtonClick = (data) => async () => {
    if (!cashier) {
      setIsOpen(true);
    } else {
      fetchPdf(data, cashier)();
    }
  };
  return ShowLoader ? (
    <Spinner />
  ) : (
    <>
      <div className="flex flex-row w-full bg-white fixed overflow-scroll">
        <h1 className="text-green-800 font-bold text-2xl pb-4 pt-5 mx-2">
          Restaurant Name:{" "}
          <span className="text-green-500 text-md pb-2 font-semibold hover: cursor-pointer">
            {user.user.resName}
          </span>
        </h1>
        <h1 className="text-green-800 font-bold text-2xl pb-4 pt-5 mx-2">
          Total orders:{" "}
          {data && (
            <span className="text-green-500 text-md pb-2 font-semibold hover: cursor-pointer">
              {data.data.length ? data.data.length : "NO orders"}
            </span>
          )}
        </h1>
        {cashier && (
          <button
            className="ml-auto mt-4 mr-28 h-8 w-32 bg-green-900 text-white rounded-md"
            onClick={() => Update()}
          >
            Update Cashier
          </button>
        )}
      </div>
      <div className="overflow-x-auto mb-24 mt-24 h-[80vh]">
        <table className="min-w-full divide-y divide-gray-200 ">
          <thead className="bg-gray-50">
            <tr>
              {orderHeaders.map((item, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data && data.success ? (
              data.data.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.createdAt.split("T")[0]}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.userId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <button onClick={handlePrintButtonClick(item)}>
                      <AiFillPrinter className="text-green-900 w-8 h-6" />
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.shipping.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.shipping.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.products.map((x) => (
                      <div>
                        <span>{x.name}</span>
                      </div>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.products.map((x) => (
                      <div>
                        <span>{x._id}</span>
                      </div>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.products.map((x) => (
                      <div>
                        <span>{x.quantity}</span>
                      </div>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.products.map((x) => (
                      <div>
                        <span>{x.variation}</span>
                      </div>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.products.map((x) => (
                      <div>
                        <span>{x.variationPrice}</span>
                      </div>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${item.total ? item.total / 100 : "0.00"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${item.total ? (item.total - item.subtotal) / 100 : "0.00"}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.payment_status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.shipping.address.country
                      ? item.shipping.address.country +
                        "," +
                        item.shipping.address.city +
                        "(" +
                        item.shipping.address.state +
                        ")"
                      : "X"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.shipping.address.line1
                      ? item.shipping.address.line1
                      : "X"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.shipping.address.line2
                      ? item.shipping.address.line2
                      : "X"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.payment_status === "paid" ? (
                      <TiTick className="fill-current text-green-500 mr-4" />
                    ) : (
                      "No"
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.isSuccessPayment ? item.card : "No"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  No Item Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-sm text-red-500 font-semibold mb-4">
              Please enter a Cashier Name
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="resName" className="block text-gray-700">
                  Cashier Name:
                </label>
                <input
                  type="text"
                  id="cashier"
                  name="cashier"
                  value={values.cashier}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                    touched.cashier && errors.cashier ? "border-red-500" : ""
                  }`}
                  placeholder={cashier ? cashier : "Enter Cashier Name"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.cashier && errors.cashier && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.cashier}
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
