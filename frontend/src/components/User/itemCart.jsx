import React from "react";
import { ImCross } from "react-icons/im";
import { useDispatch } from "react-redux";
import {
  deleteItem,
  drecreaseQuantity,
  increaseQuantity,
} from "../../redux/productSlice";

const ItemCard = ({ item }) => {
  const dispatch = useDispatch();
  return (
    <div className="w-full mb-4 border py-2">
      <div className=" grid grid-cols-5 ">
        <div className="flex col-span-5 mdl:col-span-2 items-center gap-4 ml-4">
          <ImCross
            onClick={() => dispatch(deleteItem(item._id))}
            className="text-primeColor hover:text-red-500 duration-300 cursor-pointer"
          />
          <img className="w-32 h-32" src={item.image} alt="productImage" />
          <h1 className="font-titleFont font-semibold">{item.name}</h1>
        </div>
        <div className="col-span-5 mdl:col-span-3 flex items-center justify-between py-4 mdl:py-0 px-4 mdl:px-0 gap-6 mdl:gap-0">
          <div className="flex w-1/3 items-center text-lg font-semibold">
            Price: ${item.price}
          </div>

          {item.variationPrice !== null && (
            <div className="flex w-1/3 items-center text-lg font-semibold">
              Variation Price: ${item.variationPrice}
            </div>
          )}
          {item.variation !== null && (
            <div className="flex w-1/3 items-center text-lg font-semibold">
              Variation: {item.variation}
            </div>
          )}
          <div className="w-1/3 flex items-center gap-6 text-lg">
            <span
              onClick={() => dispatch(drecreaseQuantity({ _id: item._id }))}
              className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
            >
              -
            </span>
            <p>{item.quantity}</p>
            <span
              onClick={() => dispatch(increaseQuantity({ _id: item._id }))}
              className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
            >
              +
            </span>
          </div>
          <div className="w-1/3 flex items-center font-titleFont font-bold text-lg">
            <p>
              $
              {item.quantity *
                (item.variationPrice
                  ? item.variationPrice + item.price
                  : item.price)}
            </p>
          </div>
        </div>
      </div>
      <p className=" text-gray-800 text-[12px] flex items-center justify-center">
        Description: {item.des ? JSON.parse(item.des).en_US : ""}
      </p>
    </div>
  );
};

export default ItemCard;
