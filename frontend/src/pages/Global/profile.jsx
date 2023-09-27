// import React from "react";
// import Image from "../../assets/3d1.png";
// import { GetStore } from "../../config/store";
// import { BsFillFilePersonFill, BsPersonBoundingBox } from "react-icons/bs";
// import { MdMarkEmailRead, MdVerifiedUser } from "react-icons/md";

// export function Profile() {
//   const user = GetStore("user");
//   return (
//     <div className="font-sans antialiased text-gray-900 leading-normal tracking-wider bg-cover">
//       <div className="text-3xl font-semibold ml-2 pb-6">Profile</div>
//       <div className="max-w-4xl flex items-center h-auto lg:h-full flex-wrap mx-auto my-32 lg:my-0">
//         <div
//           id="profile"
//           className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0"
//         >
//           <div className="p-4 md:p-12 text-center lg:text-left">
//             <h1 className="text-3xl font-bold pt-8 lg:pt-0">
//               {user ? user.user.name : null}
//               <sub className="h-2 w-2">
//                 {user ? (
//                   user.user.isAuthenticated ? (
//                     <MdVerifiedUser className="fill-current text-green-500 mr-4" />
//                   ) : null
//                 ) : null}
//               </sub>
//             </h1>
//             <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
//             <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
//               <BsPersonBoundingBox className="fill-current text-green-700 mr-4" />
//               Your Role: {user ? user.user.role : null}
//             </p>
//             <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
//               <BsFillFilePersonFill className="fill-current text-green-700 mr-4" />{" "}
//               Your Name: {user.user.name}
//             </p>
//             <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
//               <MdMarkEmailRead className="fill-current text-green-700 mr-4" />{" "}
//               Your Email: {user.user.email}
//             </p>
//           </div>
//         </div>

//         <div className="w-full lg:w-1/5">
//           <img
//             alt="Profile"
//             src={Image}
//             className="rounded-none lg:rounded-lg hidden lg:block"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { GetStore } from "../../config/store";

export function Profile() {
  const user = GetStore("user");
  return (
    <div className="p-4 md:mt-[-80px] md:p-16 lg:p-32">
      <div className="p-4 md:p-8 bg-white shadow md:mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="grid grid-cols-3 text-center md:order-last mt-4 md:mt-0">
            <div>
              <p className="font-bold text-gray-700 text-xl">Status</p>
              <p className="text-gray-400">
                {user.user.isAuthenticated ? "Active" : "Away"}
              </p>
            </div>
            <div>
              <p className="font-bold text-gray-700 text-xl">Browser</p>
              <p className="text-gray-400">{user.user.userInfo.browser}</p>
            </div>
            <div>
              <p className="font-bold text-gray-700 text-xl">IP</p>
              <p className="text-gray-400">{user.user.userInfo.ip_address}</p>
            </div>
          </div>
          <div className="relative">
            <div className="h-24 w-24 m-2  md:w-48 md:h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          <div className="space-x-4 md:space-x-8 flex flex-col md:flex-row justify-center md:mt-0">
            <button className="text-white py-2 px-4 md:py-3 md:px-6 uppercase rounded bg-green-400 hover:bg-green-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 mb-2 md:mb-0">
              Edit
            </button>
          </div>
        </div>

        <div className="mt-4 md:mt-20 text-center border-b pb-4 md:pb-12">
          <h1 className="text-2xl md:text-4xl font-medium text-gray-700">
            {user.user.name}, <span className="font-light text-gray-500"></span>
          </h1>
          <p className="font-light text-gray-600 mt-2 md:mt-3">
            {user.user.email}
          </p>

          <p className="mt-4 md:mt-8 text-gray-500">
            Role ID: {user.user.role}
          </p>
          <p className="mt-2 text-gray-500">Bio: Nothing here.🤣</p>
        </div>
      </div>
    </div>
  );
}
