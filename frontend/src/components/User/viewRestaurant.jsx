import React from "react";
import { useNavigate } from "react-router-dom";

export default function ViewRestaurant(props) {
  const rootId = props._id;
  const navigate = useNavigate();
  const productItem = props;
  const handleRestaurantDetails = () => {
    navigate(`/restaurant/${props.restName}/${rootId}`, {
      state: {
        item: productItem,
      },
    });
  };
  return (
    <div className="w-full relative group">
      <button onClick={handleRestaurantDetails}>
        <div className="max-w-80 max-h-80 relative overflow-y-hidden ">
          <div>
            <img className="w-full h-full" alt="res-img" src={props.img} />
          </div>
        </div>
        <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
          <div className="flex items-center justify-between font-titleFont">
            <h2 className="text-lg text-primeColor font-bold">
              {props.restName}
            </h2>
            <p className="text-[#767676] text-[14px]">{props.location}</p>
          </div>
        </div>
      </button>
    </div>
  );
}
