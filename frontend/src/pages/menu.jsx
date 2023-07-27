import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Image from "../assets/3d1.png";
import { FetchMenuData } from "../function/fetchMenu";
import Spinner from "../components/spinner";
export function Menu() {
  const [data, setData] = useState([]);
  const [ShowLoader, setShowLoader] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 5000); // 6 seconds in milliseconds
    FetchMenuData();
    const interval = setInterval(() => {
      FetchMenuData();
      setData(JSON.parse(localStorage.getItem("menus")));
    }, 5000);
    setData(JSON.parse(localStorage.getItem("menus")));
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);
  return ShowLoader ? (
    <Spinner />
  ) : (
    <>
      <div className="w-full min-h-screen bg-blue-50 p-6">
        <h1 className="font-bold text-xl text-center md:text-3xl md:mt-12 mb-4">
          "All Your <span className="text-red-500"> Favorite Restaurants </span>{" "}
          in One Place!"
        </h1>
        <div className="flex flex-row flex-wrap justify-center">
          {data && data.success ? (
            data.data.map((item, index) => (
              <div
                key={index}
                className="flex flex-col bg-white rounded-lg shadow-md w-full m-6 overflow-hidden sm:w-52"
              >
                <img
                  src={Image}
                  alt={item.name}
                  className="h-20 m-6 object-contain"
                />
                <h2 className="px-2 pb-3">
                  Name:{" "}
                  <span className="text-green-500 px-2 pb-3">{item.name}</span>
                </h2>
                <span className="font-light text-green-500 px-2 pb-3">
                  {item.apiID}
                </span>
                <Link
                  to={`${item.name}/${item.apiID}`}
                  className="bg-green-500 text-white p-3 text-center hover:bg-green-800 transition-all duration-500"
                >
                  View Menu
                </Link>
              </div>
            ))
          ) : (
            <>
              <p>No Data Found</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
