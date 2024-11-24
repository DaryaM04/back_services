import React from "react";

const DateCell = ({ value }) => {
  let localDate = new Date(value)
  return (
    <div className="w-full text-center overflow-hidden whitespace-pre-line">
      <span className="mr-2">
        {localDate.toLocaleDateString()}
      </span>
    </div>
  );
};

export default DateCell;
