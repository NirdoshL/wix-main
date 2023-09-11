import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { resetCart } from "../../redux/productSlice";

export default function CheckSuccess() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetCart());
  }, [dispatch]);

  return (
    <div className="bg-gray-100 h-40vh flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex items-center justify-center">
          <svg
            className="animate-bounce w-12 h-12 text-green-500 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h2 className="text-2xl font-semibold">Payment Successful</h2>
        </div>
        <p className="mt-4 text-gray-600">
          Thank you for your purchase! Your payment was successful.
        </p>
        <Link
          to="/cart"
          preventScrollReset={true}
          className="mt-6 block bg-green-600 text-center rounded-full text-white"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
