import axios from "axios";
import { GetStore } from "../config/store";

export default function PayButton({ totalAmount, shipCharge, cartItems }) {
  const user = GetStore("user");
  const handleCheckout = () => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/stripe/create-checkout-session`,
        {
          cartItems,
          userId: user.user.id,
          totalAmount: totalAmount,
          email: user.user.email,
          name: user.user.name,
          shippingCharge: shipCharge,
        }
      )
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <button
        className="bg-green-800 m-2 rounded-md cursor-pointer hover:bg-green-500 active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-white hover:text-white duration-300"
        onClick={() => handleCheckout()}
      >
        Check out
      </button>
    </>
  );
}
