import React from "react";

const ExpiredCell = ({ value }) => {
  return (
      <span
        className={`px-2 m-auto max-h-6 justify-center inline-flex text-xs leading-5 font-semibold rounded-full 
          ${Number(value) === 0 ? "bg-green-100" : "bg-red-100"} 
          ${Number(value) === 0 ? "text-green-800" : "text-red-800"}`
        }
      >
        {Number(value) === 1 ? "expired" : ""}
      </span>
  );
};

export default ExpiredCell;
