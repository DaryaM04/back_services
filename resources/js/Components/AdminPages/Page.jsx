import React, { useEffect } from "react";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import BlackTooltip from "../../Components/Tooltip.jsx";
import {Link} from "@inertiajs/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Page({ children, className }) {
  return (
    <main className={classNames(className, `w-full h-fit`)}>
      {/* <main className={classNames(className, `xl:w-5/6 mx-auto w-full h-fit`)}> */}
      <div className="shadow bg-white px-4 pt-1 pb-4 rounded-xl border-b border-gray-200 sm:px-6">
        {children}
      </div>
    </main>
  );
}

export const UserNameAndAvatar = ({ name, avatar, id }) => {
  return (
    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:py-3 py-1">
      <div className="mx-1 sm:mt-0 sm:col-span-2">
        <Link className="flex items-center" href={route('admin.user.edit', id)}>
          <img
            className="h-12 w-12 rounded-full overflow-hidden object-cover"
            src={avatar}
            alt=""
          />
          <div className="ml-2 max-w-2xl text-indigo-600 hover:text-indigo-900">{name}</div>
        </Link>
      </div>
    </div>
  );
};

export const ButtonsRow = ({ children, className }) => {
  return (
    <div
      className={classNames(className, 'mt-8 sm:mt-8 sm:grid sm:grid-cols-3 sm:gap-3 sm:grid-flow-row-dense pb-4 px-4')} >
      {children}
    </div>
  );
};

export const Button = ({ label, onClick, className, disabled, btnRef }) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={classNames(className, 'inline-flex justify-center rounded-md border shadow-sm px-4 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark sm:text-sm')}
      onClick={onClick}
      ref={btnRef}
    >
      {label}
    </button>
  );
};


export const DownloadButton = ({ label, onClick, className, disabled, btnRef, type }) => {
  return (
    <button className={classNames(className, 'flex justify-center items-center px-3 h-10 text-sm sm:px-4 sm:text-base bg-[#4F46E5] text-white border-transparent rounded-lg hover:bg-indigo-700')}
      onClick={onClick}
      disabled={disabled}
      ref={btnRef}
      type={type}
    >
      <span className="pr-3">{label}</span>
      <ArrowDownTrayIcon className='w-4 h-4' />
    </button>
  );
};

export const CancelButton = ({ label, onClick, className, btnRef }) => {
  return (
    <Button
      label={label}
      className={classNames(className, 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50')}
      onClick={onClick}
      btnRef={btnRef}
    />
  );
};

export const ActionButton = ({ label, onClick, className, disabled, btnRef }) => {
  return (
    <Button
      label={label}
      disabled={disabled}
      className={classNames(className, 'bg-primary text-white border-transparent hover:bg-primary-dark min-w-[100px] focus:ring-primary-dark')}
      onClick={onClick}
      btnRef={btnRef}
    />
  );
};

export const FilterButton = ({ label, onClick, className, tooltip, setInputFilter = () => false }) => {
  useEffect(() => {
    if(window.location.pathname === '/admin/cp/category') {
      if(JSON.parse(window.localStorage.getItem('filters_' + window.location.pathname))?.length || !Object.keys(JSON.parse(window.localStorage.getItem('expanded_' + window.location.pathname)) || {}).length) {
              setInputFilter(true)
      }
      else {
         setInputFilter(false)
      }
    }
    if (JSON.parse(window.localStorage.getItem('filters_' + window.location.pathname))?.length) {
      setInputFilter(true)
    }
    else {
      setInputFilter(false)
    }
  }, [])
  return (
    <BlackTooltip tooltip={tooltip}>
      <button onClick={onClick} className={classNames(className, "flex gap-10 inline-flex justify-end rounded-md border  shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark sm:text-sm border-2 border-gray-300 border-width-2")}>
        <FunnelIcon
          className={`mt-auto cursor-pointer w-6 h-6 ml-auto text-gray-500`}
        />
      </button>
    </BlackTooltip>
  );
};

export const BlueButton = ({ label, onClick, className }) => {
  return (
    <button
      type="button"
      className={classNames(className, "max-w-xs justify-center rounded-md border border-transparent shadow-sm px-4 py-auto text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark sm:text-sm bg-primary hover:bg-primary-dark")}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export const WhiteButton = ({ label, onClick, className }) => {
  return (
    <button
      type="button"
      className={classNames(className, "max-w-xs mr-4 justify-center rounded-md border shadow-sm px-4 py-auto text-base font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm border-2")}
      onClick={onClick}
    >

      {label}
    </button>
  );
};

export const RedButton = ({ label, onClick, className }) => {
  return (
    <button
      type="button"
      className={classNames(className, "max-w-xs justify-center rounded-md border border-transparent shadow-sm px-4 py-auto text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700 sm:text-sm bg-red-500 hover:bg-red-700")}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export const SigninButton = ({ label, onClick, className }) => {
    return (
        <button onClick={onClick} className={classNames(className, "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2 focus:text-white")}>{ label}</button>
    )
}
