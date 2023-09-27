import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { IoCloseSharp } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
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
  };

  const handleAddToCartClick = () => {
    if (selectedVariation !== null) {
      dispatch(
        addToCart({
          _id: props._id,
          name: props.foodName,
          quantity: 1,
          resID: props.resID,
          image: props.img,
          des: props.des,
          price: Math.round(parseInt(props.price)),
          variationPrice: selectedVariationPrice
            ? Math.round(parseInt(selectedVariationPrice) / 100)
            : 0,
          variation: JSON.parse(selectedVariation).en_US,
        })
      );
      setShowVariationsPopup(false);
      setSelectedVariation(null);
    } else {
      dispatch(
        addToCart({
          _id: props._id,
          name: props.foodName,
          resID: props.resID,
          quantity: 1,
          image: props.img,
          des: props.des,
          price: Math.round(parseInt(props.price)),
          variation: null,
        })
      );
    }
  };

  return (
    // <div className="w-full relative group">
    //   <div className="max-w-80 max-h-80  relative overflow-y-hidden">
    //     <div>
    //       <img
    //         className="w-full h-28 rounded-md  object-cover"
    //         alt="item-img"
    //         src={props.img}
    //       />
    //     </div>
    //   </div>
    //   {showVariationsPopup && (
    //     <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
    //       <div className="bg-white p-8 rounded-lg shadow-lg relative">
    //         <h2 className="text-2xl text-green-800 font-semibold mb-4">
    //           Choose Variations
    //         </h2>
    //         <div className="space-y-4">
    //           {props.variations.map((item, index) => (
    //             <div
    //               className="flex items-center justify-between font-titleFont"
    //               key={index}
    //             >
    //               <label className="inline-flex items-center">
    //                 <input
    //                   type="radio"
    //                   value={item.title}
    //                   onChange={() => handleRadioChange(item, index)}
    //                   checked={selectedVariation === item.title}
    //                   className={`appearance-none checked:bg-green-500 h-4 w-4 border border-red-500 rounded-full cursor-pointer`}
    //                 />
    //                 <span
    //                   className={`ml-2 ${
    //                     selectedVariation === item.title
    //                       ? "text-green-500"
    //                       : "text-red-500"
    //                   }`}
    //                 >
    //                   {JSON.parse(item.title).en_US}
    //                 </span>
    //               </label>
    //               <p className="text-red-900 text-[14px]">
    //                 {priceArray && typeof priceArray[index] === "number"
    //                   ? "$" + parseInt(priceArray[index]) / 100
    //                   : ""}
    //               </p>
    //             </div>
    //           ))}
    //           <button
    //             onClick={() => handleAddToCartClick()}
    //             className="text-white cursor-pointer rounded-sm bg-green-800 font-normal border-b-[1px] border-b-gray-200 flex items-center justify-center pb-1 duration-300 w-full"
    //           >
    //             Add to cart
    //             <span className="m-2">
    //               <FaShoppingCart />
    //             </span>
    //           </button>
    //         </div>

    //         <button
    //           onClick={() => setShowVariationsPopup(false)}
    //           className="absolute text-lg top-0 right-0 m-4 text-red-500 hover:text-red-700"
    //         >
    //           <IoCloseSharp />
    //         </button>
    //       </div>
    //     </div>
    //   )}
    //   <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
    //     <div className="flex items-center justify-between font-titleFont">
    //       <h2 className="text-lg text-red-900 font-bold">{props.foodName}</h2>
    //       <p className="text-red-900 font-semibold text-[14px]">
    //         {selectedVariation !== null
    //           ? "$" + parseInt(props.price)
    //           : props.price
    //           ? "$" + parseInt(props.price)
    //           : ""}
    //       </p>
    //     </div>
    //     <p className="text-red-800 text-[12px] truncate">
    //       {props.des ? JSON.parse(props.des).en_US : ""}
    //     </p>
    //   </div>
    //   <div className="w-fullbg-white">
    //     <ul className="w-full h-full flex flex-col items-end justify-center font-titleFont px-2 border-l border-r">
    //       <li
    //         onClick={() => {
    //           if (props.variations && props.variations.length > 0) {
    //             setShowVariationsPopup(true);
    //           } else {
    //             handleAddToCartClick();
    //           }
    //         }}
    //         className="text-white cursor-pointer rounded-sm bg-green-800 font-normal border-b-[1px] border-b-gray-200 flex items-center justify-center pb-1 duration-300 w-full"
    //       >
    //         {props.variations && props.variations.length > 0 ? (
    //           "Choose Variation"
    //         ) : (
    //           <>
    //             Add to Cart
    //             <span className="mx-2">
    //               <FaShoppingCart />
    //             </span>
    //           </>
    //         )}
    //       </li>
    //     </ul>
    //   </div>
    // </div>

    // new code
    <div className="w-full relative group">
      <div className="card m-2 transform cursor-pointer border rounded-lg shadow-md transition-all duration-200   hover:shadow-lg hover:border-gray-400 ">
        <div className="m-3 flex flex-row">
          <div
            className={`m-3 flex ${props.img ? "w-2/3" : "w-full"} flex-col`}
          >
            <h2 className="text-ellip mb-2 mr-4 text-[14px] font-bold">
              {props.foodName}
              {!props.img && (
                <span className="float-right inline animate-pulse rounded-full bg-teal-100 px-2 align-top font-mono font-semibold text-sm text-red-800">
                  {selectedVariation !== null
                    ? "$" + parseInt(props.price)
                    : props.price
                    ? "$" + parseInt(props.price)
                    : ""}
                </span>
              )}
            </h2>
            <p className="text-ellip font-mono text-[12.5px] font-light text-gray-700 transition-all duration-200 hover:text-gray-900">
              {props.des ? JSON.parse(props.des).en_US : ""}
            </p>
            <button
              onClick={() => {
                if (props.variations && props.variations.length > 0) {
                  setShowVariationsPopup(true);
                } else {
                  handleAddToCartClick();
                }
              }}
              className={`m-3 h-6 
                w-[200px]
               rounded-md bg-green-700 text-white`}
            >
              {props.variations && props.variations.length > 0 ? (
                "Choose Variations"
              ) : (
                <span>Add to cart</span>
              )}
            </button>
          </div>
          {props.img && (
            <div className="flex w-1/3 flex-col items-center justify-center">
              <span className="float-right inline animate-pulse rounded-full bg-teal-100 px-2 m-3 align-top font-mono font-semibold text-sm text-red-800">
                {selectedVariation !== null
                  ? "$" + parseInt(props.price)
                  : props.price
                  ? "$" + parseInt(props.price)
                  : ""}
              </span>
              <img
                className="h-[100px] rounded-md"
                src={props.img}
                alt="item-img"
              />
            </div>
          )}
        </div>
      </div>
      {showVariationsPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
          <div className="bg-white p-8 rounded-lg shadow-lg relative">
            <h2 className="text-2xl text-green-800 font-semibold mb-4">
              Choose Variations
            </h2>
            <div className="space-y-4">
              {props.variations.map((item, index) => (
                <div
                  className="flex items-center justify-between font-titleFont"
                  key={index}
                >
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value={item.title}
                      onChange={() => handleRadioChange(item, index)}
                      checked={selectedVariation === item.title}
                      className={`appearance-none checked:bg-green-500 h-4 w-4 border border-red-500 rounded-full cursor-pointer`}
                    />
                    <span
                      className={`ml-2 ${
                        selectedVariation === item.title
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {JSON.parse(item.title).en_US}
                    </span>
                  </label>
                  <p className="text-red-900 text-[14px]">
                    {priceArray && typeof priceArray[index] === "number"
                      ? "$" + parseInt(priceArray[index]) / 100
                      : ""}
                  </p>
                </div>
              ))}
              <button
                onClick={() => handleAddToCartClick()}
                className="text-white cursor-pointer rounded-sm bg-green-700 font-normal border-b-[1px] border-b-gray-200 flex items-center justify-center pb-1 duration-300 w-full"
              >
                Add to cart
                <span className="m-2">
                  <FaShoppingCart />
                </span>
              </button>
            </div>

            <button
              onClick={() => setShowVariationsPopup(false)}
              className="absolute text-lg top-0 right-0 m-4 text-red-500 hover:text-red-700"
            >
              <IoCloseSharp />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
