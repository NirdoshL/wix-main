import React from "react";
import { Puff } from "react-loader-spinner";

export default function Spinner() {
  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center ">
        <Puff
          height="80"
          width="80"
          radius={1}
          color="#4fa94d"
          ariaLabel="puff-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </>
  );
}
