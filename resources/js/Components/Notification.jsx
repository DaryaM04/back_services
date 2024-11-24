import React, {Fragment, useState} from 'react'
import {useTranslation} from "react-i18next";
import { Transition } from '@headlessui/react'
import { ExclamationTriangleIcon, XCircleIcon, ExclamationCircleIcon, CheckCircleIcon} from '@heroicons/react/24/outline'
import { useEffect } from 'react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function Notification({ message, type, header, position }) {
  const [show, setShow] = useState(true)
  const { t } = useTranslation(['common']);

  position = position ?? 'top';
  type = type ?? 'success';
  header = header ?? t('common:success') + '!';

  let color, background;
  switch (type) {
    case 'success':
      color = 'text-green-700';
      background = 'bg-green-50';
      break;
    case 'fail':
      color = 'text-red-700';
      background = 'bg-red-50';
      break;
    case 'info':
      color = 'text-blue-700';
      background = 'bg-blue-50';
      break;
    case 'warning':
      color = 'text-yellow-700';
      background = 'bg-yellow-50';
      break;
  }

  useEffect(()=>{
    setTimeout(() => {
      setShow(false);
    }, 2900);
  },[])

  const ErrorMessages = () => {
    if (Array.isArray(message)) {
      return (
        <>
          {message.map((e, idx) => (
            <p key={idx} className={`mt-1 text-sm ${color}`}>{e}</p>
          ))}
        </>
      );
    } else {
      return (<p className={`mt-1 text-sm ${color}`}>{message}</p>);
    }
  }

  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live="assertive"
        className={classNames(
          position == 'bottom' ? '' : 'sm:items-start',
          'fixed z-50 inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 top-10'
        ) }
      >
        <div className={`w-full flex flex-col items-center space-y-4 sm:items-end sm:top-auto sm:left-auto ${position == 'top' ? 'absolute top-[-45px] left-0' : ''}`}>
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            appear={true}
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
            className={`max-w-sm w-full xxs:max-w-[310px] shadow-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden ${position === 'top' ? 'mt-12' : ''} ${background}`}>
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {type === "success" ? (<CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />) : ''}
                    {type === "fail" ? (<XCircleIcon className="h-6 w-6 text-red-400" />):''}
                    {type === "info" ? (<ExclamationCircleIcon className="h-6 w-6 text-blue-400" />):''}
                    {type === 'warning' ? (<ExclamationTriangleIcon className="h-6 w-6 text-yellow-400" />):''}
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className={`text-sm font-bold ${color}`}>{header}</p>
                    <ErrorMessages />
                  </div>
                  {/* <div className="ml-4 flex-shrink-0 flex">
                    <button
                      className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => {
                        setShow(false)
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  )
}
