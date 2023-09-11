import React, { useEffect, useState } from "react";
import Img from "../../assets/29.png";
import { fetchData } from "../../function/fetchMenu";
import { toast } from "react-toastify";
import ViewRestaurant from "./viewRestaurant";

const ShopNow = () => {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  useEffect(() => {
    async function fetchDataAsync() {
      try {
        const responseData = await fetchData();
        setData(responseData);
        console.log(responseData);
        setShowLoading(false);
      } catch (error) {
        setShowLoading(false);
        toast(`Error fetching data: ${error}`);
      }
    }

    fetchDataAsync();
  }, []);
  return showLoading ? (
    <p>No data found</p>
  ) : (
    <div className="w-full pb-20">
      <div className="text-3xl font-semibold ml-2 pb-6">Our Restaurant</div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
        {data &&
          data.data.map((restaurant) => (
            <ViewRestaurant
              key={restaurant.apiID}
              _id={restaurant.apiID}
              img={Img}
              restName={restaurant.name}
              location="Kathmandu Nepal"
            />
          ))}
      </div>
    </div>
  );
};

export default ShopNow;
