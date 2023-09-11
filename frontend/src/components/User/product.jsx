import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/productSlice";

const Product = (props) => {
  const dispatch = useDispatch();
  const priceArray = props.variationPrice
    ? Object.values(props.variationPrice)
    : null;
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [selectedVariationPrice, setSelectedVariationPrice] = useState(0);
  const [showVariationsPopup, setShowVariationsPopup] = useState(false);

  const handleRadioChange = (item, index) => {
    setSelectedVariation(item.title);
    setSelectedVariationPrice(priceArray !== null ? priceArray[index] : 0);
    // Store the selected title
  };

  const handleAddToCartClick = () => {
    if (selectedVariation !== null) {
      // Add the selected variation to the cart here
      dispatch(
        addToCart({
          _id: props._id,
          name: props.foodName,
          quantity: 1,
          resID: props.resID,
          image: props.img,
          badge: props.badge,
          price: props.price,
          variationPrice: parseFloat(selectedVariationPrice) / 100,
          variation: JSON.parse(selectedVariation).en_US, // Add the selected variation to the cart
        })
      );
      setShowVariationsPopup(false); // Close the popup
      setSelectedVariation(null); // Reset the selected variation
    } else {
      dispatch(
        addToCart({
          _id: props._id,
          name: props.foodName,
          resID: props.resID,
          quantity: 1,
          image: props.img,
          badge: props.badge,
          price: props.price,
          variation: null, // Add the selected food to the cart(for no variation foods)
        })
      );
    }
  };

  return (
    <div className="w-full relative group">
      <div className="max-w-80 max-h-80  relative overflow-y-hidden">
        <div>
          <img className="w-full h-full" alt="item-img" src={props.img} />
        </div>
        <div className="absolute top-6 left-8">
          {props.badge && (
            <div className="bg-primeColor w-[92px] h-[35px] text-white flex justify-center items-center text-base font-semibold hover:bg-red-500 duration-300 cursor-pointer">
              New
            </div>
          )}
        </div>
        <div className="w-full h-24 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
          <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
            <li
              onClick={() => {
                if (props.variations && props.variations.length > 0) {
                  setShowVariationsPopup(true);
                } else {
                  handleAddToCartClick();
                }
              }}
              className="text-white bg-green-800 hover:text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-red-900 flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              {props.variations && props.variations.length > 0 ? (
                "Choose Variation"
              ) : (
                <>
                  Add to Cart
                  <span>
                    <FaShoppingCart />
                  </span>
                </>
              )}
            </li>
          </ul>
        </div>
      </div>

      {showVariationsPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
          <div className="bg-white p-8 rounded-lg shadow-lg relative">
            <h2 className="text-2xl font-semibold mb-4">Choose Variations</h2>
            {/* Radio buttons for variations */}
            <div className="space-y-4">
              {props.variations.map((item, index) => (
                <div
                  className="flex items-center justify-between font-titleFont"
                  key={index}
                >
                  <label className="inline-flex text-red-500 items-center">
                    <input
                      type="radio"
                      value={item.title}
                      onChange={() => handleRadioChange(item, index)}
                      checked={selectedVariation === item.title}
                    />
                    <span
                      className={`ml-2 ${
                        selectedVariation === item.title ? "text-green-500" : ""
                      }`}
                    >
                      {JSON.parse(item.title).en_US}
                    </span>
                  </label>
                  <p className="text-red-900 text-[14px]">
                    {priceArray && typeof priceArray[index] === "number"
                      ? "$" + parseFloat(priceArray[index]) / 100
                      : ""}
                  </p>
                </div>
              ))}
              <button
                onClick={() => handleAddToCartClick()}
                className="flex right-0 bg-green-800 text-white hover:border-b-red-900"
              >
                Add to cart
                <span className="m-2">
                  <FaShoppingCart />
                </span>
              </button>
            </div>

            {/* Close button */}
            <button
              onClick={() => setShowVariationsPopup(false)}
              className="absolute text-lg top-0 right-0 m-4 text-red-500 hover:text-red-700"
            >
              <IoCloseSharp />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
        <div className="flex items-center justify-between font-titleFont">
          <h2 className="text-lg text-red-900 font-bold">{props.foodName}</h2>
          <p className="text-red-900 text-[14px]">
            {selectedVariation !== null
              ? "$" + props.price // Change this to selectedVariation price if available
              : props.price
              ? "$" + props.price
              : ""}
          </p>
        </div>
        <p className="text-[#767676] text-[14px]">
          {props.desc ? props.desc : ""}
        </p>
        {props.variations &&
          props.variations.map((item, index) => (
            <div
              className="flex items-center justify-between font-titleFont"
              key={index}
            >
              <h5 className="text-sm text-gray-900 font-bold">
                {JSON.parse(item.title).en_US}
              </h5>
              <p className="text-red-900 text-[14px]">
                {priceArray
                  ? typeof priceArray[index] === "number"
                    ? "$" + parseFloat(priceArray[index]) / 100
                    : ""
                  : item.price
                  ? "$" + parseFloat(item.price) / 100
                  : ""}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Product;
