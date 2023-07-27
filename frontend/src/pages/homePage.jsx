import React from "react";
import { Link } from "react-router-dom";
import Typed from "react-typed";
export function HomePage() {
  return (
    <div className="text-green-500">
      <div className="max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center">
        <h1 className="md:text-7xl sm:text-6xl text-4xl font-bold md:py-6">
          Welcome To MyDvls.
        </h1>
        <p className="md:text-5xl sm:text-4xl text-xl font-bold py-4">
          Services We Offer
        </p>
        <div className="flex justify-center items-center">
          <Typed
            className="md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2"
            strings={[
              "Web Development",
              "Cloud Services",
              "Managed Services",
              "Social Media Management",
              "Point of Sales",
            ]}
            typeSpeed={120}
            backSpeed={140}
            loop
          />
        </div>
        <p className="mt-4 md:text-1xl text-sm font-bold text-gray-500">
          Mydvls is your one-stop restaurant management solution, streamlining
          operations, optimizing performance, and enhancing customer
          experiences. Simplify your restaurant's success with our user-friendly
          platform designed to meet the needs of establishments big and small.
        </p>
        <Link
          className="bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black"
          to="/restaurants"
        >
          <button className="w-full">Get Started</button>
        </Link>
      </div>
    </div>
  );
}
