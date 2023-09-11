import { Link } from "react-router-dom";
import emptyCart from "../../assets/emptyCart.png";
import PayButton from "../../components/payButton";
import React, { useEffect, useState } from "react";
import { resetCart } from "../../redux/productSlice";
import ItemCard from "../../components/User/itemCart";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productReducer.products);
  const [totalAmt, setTotalAmt] = useState("");
  const [shippingCharge, setShippingCharge] = useState("");
  useEffect(() => {
    let price = 0;
    products.map((item) => {
      price +=
        (item.variationPrice ? item.variationPrice : item.price) *
        item.quantity;
      return price;
    });
    setTotalAmt(price);
  }, [products]);
  useEffect(() => {
    if (totalAmt <= 20) {
      setShippingCharge(25);
    } else if (totalAmt <= 50) {
      setShippingCharge(20);
    } else if (totalAmt > 100) {
      setShippingCharge(0);
    }
  }, [totalAmt]);
  return (
    <div className="max-w-container mx-auto px-4">
      <div className="text-3xl font-semibold ml-2 pb-6">Your Cart</div>
      {products.length > 0 ? (
        <div className="pb-20">
          <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
            <h2 className="col-span-2">Product</h2>
            <h2>Price</h2>
            <h2>Quantity</h2>
            <h2>Sub Total</h2>
          </div>
          <div className="mt-5">
            {products.map((item) => (
              <div key={item._id}>
                <ItemCard item={item} />
              </div>
            ))}
          </div>

          <button
            onClick={() => dispatch(resetCart())}
            className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
          >
            Reset cart
          </button>

          <div className="max-w-7xl gap-4 flex justify-end mt-4">
            <div className="w-96 flex flex-col gap-4">
              <h1 className="text-2xl font-semibold text-right">Cart totals</h1>
              <div>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Subtotal
                  <span className="font-semibold tracking-wide font-titleFont">
                    ${totalAmt}
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Shipping Charge
                  <span className="font-semibold tracking-wide font-titleFont">
                    ${shippingCharge}
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                  Total
                  <span className="font-bold tracking-wide text-lg font-titleFont">
                    ${Math.round(totalAmt + shippingCharge)}
                  </span>
                </p>
              </div>
              <div className="flex justify-end">
                {/* Stripe payment Button  */}
                <PayButton
                  totalAmount={Math.round(totalAmt + shippingCharge)}
                  shipCharge={Math.round(shippingCharge)}
                  cartItems={products}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20">
          <div>
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src={emptyCart}
              alt="emptyCart"
            />
          </div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold uppercase">
              Your Cart feels lonely.
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              Your Shopping cart lives to serve. Give it purpose - fill it with
              some foods and make it happy.
            </p>
            <Link to="/">
              <button className="bg-green-800 rounded-md cursor-pointer hover:bg-green-500 active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-white hover:text-white duration-300">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
