import { useState, useEffect } from "react";
import Spinner from "../../components/spinner";
import { TiTick } from "react-icons/ti";
import { toast } from "react-toastify";
import { fetchOrderByID } from "../../function/fetchOrder";
import { GetStore } from "../../config/store";

export function AdminOrderList() {
  const user = GetStore("user");
  const [data, setData] = useState([]);
  const [ShowLoader, setShowLoader] = useState(true);
  useEffect(() => {
    async function fetchDataAsync() {
      try {
        const responseData = await fetchOrderByID(
          user.user.id,
          user.user.resID
        );
        setData(responseData);
        setShowLoader(false);
      } catch (error) {
        setShowLoader(false);
        toast(`Error fetching data: ${error}`);
      }
    }

    fetchDataAsync();
  }, [user.user.id, user.user.resID]);

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
          <span className="text-green-500 text-md pb-2 font-semibold hover: cursor-pointer">
            {data.data.length ? data.data.length : "NO orders"}
          </span>
        </h1>
      </div>
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
                User ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                User Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Phone Number
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Product
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Product ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Quantity
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Variations
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Variation Price
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Price
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Charge
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Payment process
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Country
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Address 1
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Address 2
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Payment Success
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Card detail
              </th>
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.shipping.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.products.map((x) => (
                      <span>{x.name}</span>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.products.map((x) => (
                      <span>{x._id}</span>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.products.map((x) => (
                      <span>{x.quantity}</span>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.products.map((x) => (
                      <span>{x.variation}</span>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.products.map((x) => (
                      <span>{x.variationPrice}</span>
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
