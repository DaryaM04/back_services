import React from 'react';

const ButtonCell = ({ value }) => {
  console.log(value)
  return (
    <div className="w-full grid justify-items-center">
      <button
        className="inline-flex justify-center w-50 rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm
            bg-indigo-500 hover:bg-indigo-700"
        type="button"
        onClick={ null }
      >
        { name ?? 'Button'}
      </button>
    </div>
  );
};

export default ButtonCell;
