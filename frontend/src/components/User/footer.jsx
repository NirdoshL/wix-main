import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

export function UserFooter() {
  return (
    <div className="w-full text-black bg-[#F5F5F3] py-20">
      <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 px-4 gap-10">
        <div className="col-span-1 ml-6">
          <h3 className="text-xl font-bodyFont text-green-700 font-semibold mb-6">
            More About MyDvls Shop
          </h3>
          <div className="flex flex-col gap-6 text-black">
            <p className="text-base w-full xl:w-[80%]">
              We are one of the leading agencies in the technical space for the
              hospitality industry with our specialty being the service, retail
              and hotel industries. Pretty soon to come will be events , luxury
              and fintech as well.
            </p>
            <ul className="flex items-center text-white gap-2">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
              >
                <li className="w-7 h-7 bg-black  hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
                  <FaFacebook />
                </li>
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
              >
                <li className="w-7 h-7 bg-black  hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
                  <FaInstagram />
                </li>
              </a>
            </ul>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h3 className="text-xl text-green-700 font-bodyFont font-semibold mb-6">
            Quick Links
          </h3>
          <ul className="flex flex-col gap-2">
            <li className="font-titleFont text-base  hover:text-green-600 cursor-pointer duration-300">
              Order Online
            </li>
            <li className="font-titleFont text-base  hover:text-green-600 cursor-pointer duration-300">
              Menu
            </li>
            <li className="font-titleFont text-base  hover:text-green-600 cursor-pointer duration-300">
              Contact
            </li>
          </ul>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h3 className="text-xl font-bodyFont font-semibold text-green-700 mb-6">
            Address
          </h3>
          <address>
            <ul className="flex flex-col gap-2">
              <a
                href="https://www.google.com/maps/search/1751+Hover+Street,+Longmont+80504"
                target="_blank"
                rel="noopener noreferrer"
                class="font-titleFont text-base hover:text-green-600 hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300"
              >
                <li>1751 Hover Street, Longmont 80504</li>
              </a>

              <a href="tel:(303) 647-4098" target="_blank" rel="noreferrer">
                <li className="">(203) 637-****</li>
              </a>
              <a
                href="mailto:support@mydvls.com"
                target="_blank"
                rel="noreferrer"
              >
                <li className="">support@mydvls.com</li>
              </a>
            </ul>
          </address>
        </div>
      </div>
    </div>
  );
}
