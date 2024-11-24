import React, { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, XCircleIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { useTranslation } from "react-i18next";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ColumnFilter({ column }) {
  const { t } = useTranslation('common');
  const { filterValue, setFilter } = column;
  return (
    <span className="mt-1 relative flex items-center">
      <input
        type="text"
        value={filterValue || ''}
        placeholder={t('search')}
        onChange={(e) => setFilter(e.target.value || undefined)}
        className="
        shadow-sm block w-full border-gray-300 rounded-md
        focus:ring-indigo-500 focus:border-indigo-500
        text-xs"
      />
      <XCircleIcon onClick={() => setFilter('')} className='relative right-6 w-3 h-3 cursor-pointer text-gray-500' />
    </span>
  );
}

export function SelectColumnFilter({
  column: {
    filterValue, setFilter, preFilteredRows, id
  },
}) {
  const [selected, setSelected] = useState();
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);
  const onSelectChange = (e) => {
    setFilter(e || undefined);
    setSelected(e);
  };

  // Render a multi-select box
  return (
    <Listbox value={filterValue} onChange={onSelectChange}>
      {({ open }) => (
        <>
          <div className="mt-1 relative flex items-center w-full">
            <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-sm">
              <span className="block truncate">
                {selected !== undefined
                  ? selected
                  : ''
                }
              </span>
              <span className="absolute inset-y-0 right-0 z-50 flex items-center pr-2" onClick={() => setFilter(undefined)}>
                  <XCircleIcon className='w-3 h-3 text-gray-600' />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none text-sm top-8">
                {options.map((option) => (
                  <Listbox.Option
                    key={option}
                    className={({ active }) => classNames(
                      active ? 'bg-gray-200' : 'text-gray-900',
                      'cursor-default select-none relative py-2 pl-3 pr-3'
                    )
                    }
                    value={option}
                  >
                    {() => (
                      <>
                        <span className={
                          classNames(
                            selected === option
                              ? 'font-semibold'
                              : 'font-normal',
                            'block truncate text-xs'
                          )}
                        >
                          {option}
                        </span>

                        {selected === option ? (
                          <span
                            className={classNames(
                              selected === option ? 'text-gray-600' : 'text-indigo-600',
                              'absolute inset-y-0 left-0 flex items-center pl-1.5'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}

export function SelectStatusFilter({ column }) {
  const [selected, setSelected] = useState(column.filterValue);
  console.log(column.filterValue)
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    column.preFilteredRows?.forEach((row) => {
      options.add(row.values[column.id]);
    });
    if ([...options.values()].length) {
      window.localStorage.setItem('active_' + window.location.pathname, JSON.stringify([...options.values()]));
      return [...options.values()]
    }
    else {
      return JSON.parse(window.localStorage.getItem('active_' + window.location.pathname))
    }

  }, [column.id, column.preFilteredRows]);
  const onSelectChange = (e) => {
    column.setFilter(e || "0");
    setSelected(e);
  };
  const { t } = useTranslation('common');

  const selectedСheck = (value) => {
    if (value === 1 || value === 'active') {
      return t("common:active")
    }
    if (value === 0 || value === '0' || value === 'inactive') {
      return t("state.inactive")
    }
    if (value === 'blocked') {
      return t("state.blocked")
    }
  }
  // Render a multi-select box

  return (
    <Listbox value={column.filterValue} onChange={onSelectChange}>
      {({ open }) => (
        <>
          <div className="mt-1 relative flex items-center w-full">
            <Listbox.Button className="relative w-full h-[34px] bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-sm">
              <span className="block truncate">
                {selectedСheck(selected)}
              </span>
              <span className="absolute inset-y-0 right-0 z-50 flex items-center pr-2" onClick={(e) => {
                e.preventDefault();
                column.setFilter(undefined);
                setSelected(undefined);
              }}>
                  <XCircleIcon className='w-3 h-3 text-gray-600'/>
              </span>
            </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none text-sm top-8">
                {options.map((option) => (
                  option !== null && <Listbox.Option
                    key={option}
                    className={({ active }) => classNames(
                      active ? 'bg-gray-200' : 'text-gray-900',
                      'cursor-default select-none relative flex justify-center py-1'
                    )
                    }

                    value={option}
                  >
                    {() => (
                      <>
                        <span className={
                          classNames(
                            selected === option
                              ? 'font-semibold'
                              : 'font-normal',
                            'truncate text-xs flex justify-start'
                          )}
                        >
                          {selectedСheck(option)}
                        </span>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
