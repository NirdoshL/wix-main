import React from "react";

export function GlobalError() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-6xl font-bold text-green-600">404</div>
      <div className="text-2xl font-medium text-gray-600">Page Not Found</div>
      <p className="text-gray-500 mt-2">
        Oops! The page you are looking for does not exist.
      </p>
      <button
        className="mt-4 px-6 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        onClick={() => window.history.back()}
      >
        Go Back
      </button>
    </div>
  );
}
