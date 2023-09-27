import React from "react";

export function Formfield({
  title,
  req,
  type,
  name,
  value,
  onchange,
  onblur,
  id,
  error,
  touched,
}) {
  return (
    <div className="py-4 w-[180px] m-2 md:w-[500px]">
      <span className="mb-2 text-md">
        {title}
        <span className="mb-2 text-md text-red-600">{req ? "*" : null}</span>
      </span>
      <input
        type={type}
        className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
        name={name}
        value={value}
        onChange={onchange}
        onBlur={onblur}
        id={id}
      />
      {error && touched ? (
        <span className="font-light text-red-400 mb-8">{error}</span>
      ) : null}
    </div>
  );
}
