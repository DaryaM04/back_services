import React from 'react';
import {
  ChevronDoubleDownIcon,
  ChevronDoubleRightIcon,
  ChevronDownIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';


const ExpandCell = ({ row }) => {
  return (
    <>
        {/* Use the row.canExpand and row.getToggleRowExpandedProps prop getter
        to build the toggle for expanding a row */}
        { row.canExpand ? (
          <span
            {...row.getToggleRowExpandedProps({
              // style: {
              //   // We can even use the row.depth property
              //   // and paddingLeft to indicate the depth
              //   // of the row
              //   paddingLeft: `${row.depth * 2}rem`,
              // },
            })}
          >
            {/* {row.isExpanded ? '👇' : '👉'} */}
            {row.isExpanded ? <CloseIcon/> : <OpenIcon/>}
          </span>
        ) : null }
    </>
  );
}

export const OpenIcon = () => <ChevronRightIcon className="w-5 h-5 mx-1 text-indigo-600"/>;

export const CloseIcon = () => <ChevronDownIcon className="w-5 h-5 mx-1 text-indigo-600"/>;

export const OpenAllIcon = () => <ChevronDoubleRightIcon className="w-5 h-5 mx-1"/>;

export const CloseAllIcon = () => <ChevronDoubleDownIcon className="w-5 h-5 mx-1"/>;

export default ExpandCell;
