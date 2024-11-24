import React from 'react';
import {CheckIcon, XCircleIcon} from "@heroicons/react/24/outline";

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

export default function PostFileList ({ items, setData }) {
  const handleSetData = (e) => {
    setData('files', items.map(itm => {
      if (itm.original_name === e.original_name) return e;
      return itm;
    }));
  }

  return (
    <>
      <ul className="mb-3">
        {items.map((e, idx) => (
          <FileItem key={idx} item={e} setData={handleSetData} pendingFiles={items.filter(file => file.new === true).length > 0}/>
        ))}
      </ul>
    </>
  );
}

const FileItem = ({item, setData, pendingFiles}) => {
  const handleDelete = () => {
    const itm = item;
    itm.deleted = !itm.deleted;
    setData(itm);
  }

  return (
    <li className="p-1">
      <div className={`flex items-center ${item.deleted ? 'line-through':''}`}>
        {item.new === true
          ? <CheckIcon
            height="18"
            width="18"
            color="green"
          />
          : null
        }
        <a className={`text-indigo-500 underline ${pendingFiles && item.new !== true ? 'pl-[22px]' : ''}`} href={item.path} download={item.original_name}>
          {item.original_name}
        </a>
        <XCircleIcon className="pl-2 h-5 w-5 text-red-600 cursor-pointer" onClick={handleDelete} />
      </div>
    </li>
  );
}

export function PostFileListRO ({ items }) {
  return (
    <ul className="mb-3">
      {items.map((item) => (
        <li className="p-1">
          <div className={`flex items-center`}>
            <a className={`text-indigo-500 underline`} href={item.path} download={item.original_name}>
              {item.original_name}
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
}
