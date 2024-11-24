import React from "react";

const ColumnDateCell = ({ value }) => {
  let localDate = new Date(value)
  return (
    <div>
      <span className="mr-2">
        {localDate.toLocaleDateString()}
      </span>
    </div>
  );
};

export default ColumnDateCell;
