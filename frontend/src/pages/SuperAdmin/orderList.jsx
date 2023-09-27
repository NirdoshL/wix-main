import { toast } from "react-toastify";
import { TiTick } from "react-icons/ti";
import { useState, useEffect } from "react";
import Spinner from "../../components/spinner";
import { fetchOrder } from "../../function/fetchOrder";
import { orderSuperHeaders } from "../../config/tableHeader";

export function OrderList() {
  const [data, setData] = useState([]);
  const [ShowLoader, setShowLoader] = useState(true);
  useEffect(() => {
    async function fetchDataAsync() {
      try {
        const responseData = await fetchOrder();
        setData(responseData);
        setShowLoader(false);
      } catch (error) {
        setShowLoader(false);
        toast.error(`Error fetching data: ${error}`);
      }
    }

    fetchDataAsync();
  }, []);

  return ShowLoader ? (
    <Spinner />
  ) : (
    <>
      <div className="flex flex-row w-full bg-white fixed overflow-scroll">
        <h1 className="text-green-800 font-bold text-2xl pb-4 pt-5 mx-2">
          Total orders:{" "}
          <span className="text-green-500 text-md pb-2 font-semibold hover: cursor-pointer">
            {data.data.length ? data.data.length : "No orders"}
          </span>
        </h1>
      </div>
      <div className="overflow-x-auto mt-24 h-[80vh]">
        <table className="min-w-full divide-y divide-gray-200 ">
          <thead className="bg-gray-50">
            <tr>
              {orderSuperHeaders.map((item, index) => (
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
                    {item.userId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.shipping.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.products.map((x, index) => (
                      <div>
                        <span key={index}>{x.name}</span>
                      </div>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.products.map((x, i) => (
                      <div>
                        <span key={i}>{x._id}</span>
                      </div>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.products.map((x, i) => (
                      <div>
                        <span key={i}>{x.quantity}</span>
                      </div>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.products.map((x, i) => (
                      <span key={i}>{x.variation}</span>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.products.map((x, i) => (
                      <span key={i}>{x.variationPrice}</span>
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
    </>
  );
}
