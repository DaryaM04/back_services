import React from 'react';

const TwoLineCell = ({ value }) => {
  return (
    <div
      className="w-full text-left overflow-hidden whitespace-pre-line"
      style={{
        'display': '-webkit-box',
        'WebkitLineClamp': 2,
        'WebkitBoxOrient': 'vertical',
      }}
    >
      {value}
    </div>
  );
};

export default TwoLineCell;
