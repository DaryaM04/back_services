import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal.jsx';
import { AsyncPaginate } from "react-select-async-paginate";

export default function PermissionList({ permissions, removePermission}) {

  return (
    <>
        <ul className='sm:col-span-2 w-full max-h-24 overflow-auto sm:max-h-16'>
          {permissions?.map(item => {
            return(
              <li key={`sperm${item.type}_${item.id}`}
                className="inline-flex items-center py-0.5 pl-2 pr-0.5 m-1 rounded-full text-xs border border-solid border-[#867FEB] font-medium bg-[#EEF2FF] text-gray-700 cursor-pointer hover:bg-gray-200"
                  onClick={() => {
                    removePermission(item);
                  }}
              >
                {item.name}
                <button
                  type="button"
                  className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-gray-400 hover:bg-gray-200 hover:text-gray-500 focus:outline-none focus:bg-gray-500 focus:text-white"
                >
                  <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                    <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7"/>
                  </svg>
                </button>

              </li>
            )})}
        </ul>
    </>
  );
}
