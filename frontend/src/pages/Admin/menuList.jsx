import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { GetStore } from "../../config/store";
import Spinner from "../../components/spinner";
import { tableHeaders } from "../../config/tableHeader";
import { fetchDataItem } from "../../function/fetchMenu";

export default function AdminMenuList() {
  const user = GetStore("user");
  const id = user.user.resID;
  const name = user.user.resName;
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  useEffect(() => {
    async function fetchDataItemAsync() {
      setShowLoading(true);
      try {
        const responseData = await fetchDataItem(id);
        setData(responseData);
        setShowLoading(false);
      } catch (error) {
        setShowLoading(false);
        toast.error(`Error fetching data: ${error}`);
      }
    }
    fetchDataItemAsync();
  }, [id]);

  return showLoading ? (
    <Spinner />
  ) : (
    <>
      <div className="flex flex-row w-full bg-white fixed overflow-scroll">
        <h1 className="text-green-800 font-bold text-2xl pb-4 pt-5 mx-2">
          Restaurant Name:{" "}
          <span className="text-green-500 text-md pb-2 font-semibold hover: cursor-pointer">
            {name}
          </span>
        </h1>
        <h1 className="text-green-800 font-bold text-2xl pb-4 pt-5 mx-2">
          Total Items:{" "}
          <span className="text-green-500 text-md pb-2 font-semibold hover: cursor-pointer">
            {data && data.data ? data.data.length : 0}
          </span>
        </h1>
      </div>
      <div className="overflow-x-auto mt-24 h-[80vh]">
        <table className="min-w-full divide-y divide-gray-200 ">
          <thead className="bg-gray-50 ">
            <tr>
              {tableHeaders.map((item, index) => (
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
                    {item._id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.apiID}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {JSON.parse(item.title).en_US}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${item.price ? item.price / 100 : "0.00"}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.menuId}
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
