import React from "react";
const OneLineCell = ({value}) => {
  return (
    <div className="w-full text-left overflow-hidden whitespace-pre-line">
      {value}
    </div>
  );
};


export default OneLineCell;
