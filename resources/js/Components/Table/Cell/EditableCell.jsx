import React, { useState, useEffect, useRef } from 'react';
import {
  PencilIcon,
  ClipboardDocumentIcon
} from '@heroicons/react/24/outline';

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue === null ? '' : initialValue);
  const [disabled, setDisabled] = useState(true);
  const inputEl = useRef(null);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  // We'll only update the external data when the input is blurred
  const onSave = () => {
    setDisabled(true);
    updateData(index, id, value);
  };

  const onEdit = () => {
    setDisabled(false);
    inputEl.current.focus();
  };

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue === null ? '' : initialValue);
  }, [initialValue]);

  useEffect(() => inputEl.current.focus(), [disabled]);

  return (
    <div className="flex">
      <div className="relative flex items-stretch flex-grow focus-within:z-10">
        <input
          type="text"
          ref={inputEl}
          value={value}
          onChange={onChange}
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md sm:text-sm border-transparent bg-transparent"
          disabled={disabled}
        />
      </div>
      <button
        type="button"
        className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        onClick={disabled ? () => setDisabled(false) : onSave}
      >
        {disabled
          ? <PencilIcon className="w-5 h-5" />
          : <ClipboardDocumentIcon className="w-5 h-5" />
        }
      </button>
    </div>
  );
};

export default EditableCell;
