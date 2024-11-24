import React, {Fragment, useCallback, useEffect, useMemo, useState} from "react";
import axios from "axios";
// import './../../../css/app.css';
import {
  useExpanded,
  useFilters,
  useFlexLayout,
  usePagination,
  useResizeColumns,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpDownIcon
} from "@heroicons/react/24/outline";
import {useTranslation} from "react-i18next";
import {CSSTransition} from 'react-transition-group';
import {Listbox, Transition} from "@headlessui/react";
import LoadingSpinner from "../LoadingSpinner";
import ColumnFilter from "./ColumnFilter.jsx";
// import GlobalFilter from './GlobalFilter.jsx';
// import EditableCell from './EditableCell.jsx';

export default function Table1({
  columns,
  addActions,
  renderRowSubComponent,
  refresh,
  dataValue,
  ...props
}) {
  const { t } = useTranslation(['common']);

  const [loading, setLoading] = useState(false);
  const [controlledPageCount, setControlledPageCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState(dataValue ?? []);
  console.log('table data', data);
  const {
    // options: {
    //   showGlobalFilter = false,
    //   showColumnSelection = false,
    //   showElementsPerPage = true,
    //   showGoToPage = false,
    //   showPagination = true,
    //   showRowCheckboxes = false,
    // } = {
    //   showGlobalFilter,
    //   showColumnSelection,
    //   showElementsPerPage,
    //   showGoToPage,
    //   showPagination,
    //   showRowCheckboxes,
    // },
    showInputFilter = false,
    pageSizes = null,
  } = props;

  //console.log(columns)

  const showElementsPerPage = props?.options?.showElementsPerPage ?? true;
  const showPagination = props?.options?.showPagination ?? true;

  const defaultColumn = useMemo(
    () => ({
      minWidth: 5,
      width: 150,
      maxWidth: 400,
      // DefaultFilter
      Filter: ColumnFilter,
      // Cell: EditableCell
    }),
    []
  );

  // const IndeterminateCheckbox = React.forwardRef(
  //   ({ indeterminate, ...rest }, ref) => {
  //     const defaultRef = React.useRef();
  //     const resolvedRef = ref || defaultRef;

  //     useEffect(() => {
  //       resolvedRef.current.indeterminate = indeterminate;
  //     }, [resolvedRef, indeterminate]);

  //     return (
  //       <>
  //         <input type="checkbox" ref={resolvedRef} {...rest} />
  //       </>
  //     );
  //   }
  // );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,

    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    previousPage,
    nextPage,
    setPageSize,
    preFilteredRows,
    allColumns,
    visibleColumns,
    getToggleHideAllColumnsProps,
    state,
    state: { pageIndex, pageSize, expanded, filters },

    selectedFlatRows,
    setGlobalFilter,
    setFilter
  } = useTable(
    {
      columns,
      data,
      defaultColumn,

      initialState: {
        pageIndex: JSON.parse(window.localStorage.getItem('pageIndex_' + window.location.pathname)) ?? 0,
        pageSize: JSON.parse(window.localStorage.getItem('pageSize_' + window.location.pathname)) ?? 10,
        sortBy: JSON.parse(window.localStorage.getItem('sortBy_' + window.location.pathname)) ?? [],
        filters: JSON.parse(window.localStorage.getItem('filters_' + window.location.pathname)) ?? [],
      },
      manualPagination: controlledPageCount !== null,
      pageCount: controlledPageCount,

      disableMultiSort: true,
      manualSortBy: true,
      autoResetSortBy: false,
      manualFilters: true
    },
    // useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    useFlexLayout,
    useResizeColumns,
    );
  const [sorting, setSorting] = useState({ sortBy: state.sortBy[0]?.id, sortDir: state.sortBy[0]?.desc ? 'desc' : 'asc' });

  const fetchData = useCallback(({ pageIndex, pageSize, filters, sorting }) => {
    setLoading(true);
    const sortBy = sorting?.sortBy ?? '';
    const sortDir = sorting?.sortDir ?? '';
    const filtersArr = filters.map(n => {
      if(Array.isArray(n.id)) {
        const name = n.value.split(' ')
        return n.id.map((id, i) => `filters[${id}]=${name[i]}`).join('&')
      }
      return `filters[${n.id}]=${n.value}`
    }).join('&');
    axios
      .get(`${route(route().current())}?page=${pageIndex}&perpage=${pageSize}&sortby=${sortBy ?? ''}&sortdir=${sortDir ?? ''}&${filtersArr}`)
      .then((resp) => {
        setTotal(resp.data.total);
        setControlledPageCount(resp.data.last_page);
        setData(addActions(resp.data.data));
      })
      .then(() => setLoading(false));
  }, [pageIndex, pageSize, filters, sorting]);

  // saved values of page
  useEffect(() => {
    window.localStorage.setItem('pageSize_' + window.location.pathname, pageSize);
    window.localStorage.setItem('pageIndex_' + window.location.pathname, 0);
  }, [pageSize]);

  useEffect(() => {
    window.localStorage.setItem('pageIndex_' + window.location.pathname, pageIndex);
  }, [pageIndex]);

  useEffect(() => {
    window.localStorage.setItem('filters_' + window.location.pathname, JSON.stringify(filters));
  }, [filters]);

  // fetching data
  useEffect(() => {
    if (dataValue == null && loading !== true) {
      fetchData({ pageIndex: pageIndex + 1, pageSize, filters, sorting });
    }
    if (dataValue) setData(dataValue);
  }, [pageSize, pageIndex, filters, sorting, refresh, dataValue]);


  // sorting
  useEffect(() => {
    window.localStorage.setItem('sortBy_' + window.location.pathname, JSON.stringify(state.sortBy));
    let sortBy, sortDir;
    if (state.sortBy.length) {
      sortBy = state.sortBy[0]?.id;
      sortDir = state.sortBy[0]?.desc ? 'desc' : 'asc';
    }
    setSorting({ sortBy, sortDir });
  }, [state.sortBy[0]?.desc, state.sortBy[0]?.id]);

  const SortingIndicator = useCallback(({ column, className }) => {
    if (column.isSorted) {
      if (column.isSortedDesc) {
        return <BarsArrowDownIcon className={className} />;
      }
      return <BarsArrowUpIcon className={className} />;
    }

    if (column.disableFilters !== true) {
      return <ChevronUpDownIcon className={`${className} text-gray-300`} />;
    }
    return null;
  }, []);


  const Pagination = useCallback(() => {

    const NumberOfElementsSelector = ({ buttonTestId }) => {
      const pSizes = pageSizes ? pageSizes : [5, 10, 25, 50, 100];

      function getNoun(number, one, two, five) {
        let n = Math.abs(number);
        n %= 100;
        if (n >= 5 && n <= 20) {
          return five;
        }
        n %= 10;
        if (n === 1) {
          return one;
        }
        if (n >= 2 && n <= 4) {
          return two;
        }
        return five;
      }

      const getLocalizedNumberOfElements = (number) => {
        // return getNoun(number, t('common:element.one'), t('common:element.three'), t('common:element.ten'));
        return t('elements.plural', {count: number})
      };

      return (
        <Listbox
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e));
            gotoPage(0);
          }}
        >
          {({ open }) => (
            <>
              <div className="relative flex items-center" style={{ width: "220px" }}>
                <Listbox.Button data-test-id={buttonTestId}
                  className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-sm">
                  <span className="block truncate">
                    {getLocalizedNumberOfElements(pageSize)}
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-600"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none text-sm bottom-8">
                    {pSizes.map((pSize, i) => (
                      <Listbox.Option
                        key={`pSize${i === pSizes.length - 1 ? `All` : pSize}`}
                        className={({ active }) => `${active ? "bg-gray-200" : "text-gray-900"} cursor-default select-none relative py-2 pl-8 pr-4`}
                        value={pSize}
                      >
                        {() => (
                          <>
                            <span className={`${pageSize === pSize ? "font-semibold" : "font-normal"} block truncate text-xs'`}>
                              {getLocalizedNumberOfElements(pSize)}
                            </span>

                            {pageSize === pSize ? (
                              <span
                                className={`${pageSize === pSize ? "text-gray-600" : "text-indigo-600"} absolute inset-y-0 left-0 flex items-center pl-1.5`}>
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
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
    };

    return (
      <div className="flex items-center justify-between min-w-full">
        <div className="flex-1 flex flex-wrap justify-between sm:hidden">
          {showElementsPerPage && (
            <div className="w-full flex justify-center mb-2">
              <NumberOfElementsSelector />
            </div>
          )}
          <div className="w-full flex justify-between">
            <button
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              onClick={previousPage}
              disabled={!canPreviousPage}
              key="buttonPrev"
            >
              Previous
            </button>
            <button
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              onClick={nextPage}
              disabled={!canNextPage}
              key="buttonNext"
            >
              Next
            </button>
          </div>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          {showElementsPerPage && <NumberOfElementsSelector buttonTestId="pageCountButton" />}
          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button
                className="relative inline-flex items-center px-2 py-2 rounded-s-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                onClick={previousPage}
                disabled={!canPreviousPage}
                key="prev"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5 rtl:scale-x-flip" aria-hidden="true" />
              </button>
              {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
              {pageOptions.map((item) => {
                if (
                  item === 0 ||
                  item === pageCount - 1 ||
                  item === pageIndex - 1 ||
                  item === pageIndex ||
                  item === pageIndex + 1
                ) {
                  return (
                    <button
                      className={`${item === pageIndex
                          ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                          : "border-gray-300 text-gray-500 hover:bg-gray-50"
                        }
                            relative inline-flex items-center px-4 py-2 border text-sm font-medium bg-white`}
                      key={`paginationItem${item}`}
                      onClick={() => gotoPage(item)}
                    >
                      {item + 1}
                    </button>
                  );
                }
                if (item === pageIndex - 2 || item === pageIndex + 2) {
                  return (
                    <button
                      className="border-gray-300 text-gray-500 relative inline-flex items-center px-4 py-2 border text-sm font-medium bg-white"
                      key={`dots${item}`}
                    >
                      ...
                    </button>
                  );
                }
                return null;
              })}
              <button
                className="relative inline-flex items-center px-2 py-2 rounded-e-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                onClick={nextPage}
                disabled={!canNextPage}
                key="next"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5 rtl:scale-x-flip" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto pb-8 ">
        <div className="py-2 align-middle inline-block min-w-full">
          <div className="shadow overflow-visible border-b border-gray-200 sm:rounded-lg">
            <table
              {...getTableProps()}
              className="w-full divide-y divide-gray-200"
            >

              <thead className="bg-gray-100 ">
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column, idx) => {
                      const getSortByToggleProps = {
                        ...column.getSortByToggleProps(),
                      };
                      return (
                          <th
                              scope="col"
                              className="flex flex-col justify-between px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              {...column.getHeaderProps()}
                          >
                              <div
                                  className={`${column.headerCenter === true ? 'justify-center ' : ''}flex w-full items-center`}
                                  {...(column.disableFilters
                                      ? null
                                      : getSortByToggleProps)}
                              >
                            <span className="flex items-center"
                            >
                              {column.render("Header")}
                                <SortingIndicator
                                    column={column}
                                    className={`w-4 h-4`}
                                />
                            </span>
                              </div>

                              {!column.disableFilters
                                  ? <CSSTransition
                                      in={showInputFilter}
                                      classNames="alert"
                                      timeout={10}
                                      unmountOnExit
                                  >
                                      <div>{column.canFilter ? column.render("Filter") : null}</div>
                                  </CSSTransition>
                                  : ''}

                              {column.disableResizing !== true && headerGroup.headers.length !== idx + 1 ? (
                                  <div
                                      className={`resizer isResizing`}
                                      {...column.staticColumn !== true ? {...column.getResizerProps()} : null}
                                  ></div>
                              ) : null}
                              {column.separatorShow === true ? (
                                  <div className={`resizer isResizing`}/>
                              ) : null}
                          </th>
                      );
                    })}
                  </tr>
                ))}
              </thead>

              <tbody {...getTableBodyProps()}>
                {
                  // Loop over the table rows
                  loading ? <tr className="h-24 flex justify-center items-center"><td><LoadingSpinner /></td></tr>
                    : page.map((row, i) => {
                      // Prepare the row for display
                      prepareRow(row);
                      return (
                        <React.Fragment key={i}>
                          <tr
                            className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b border-gray-300`}
                            // className="bg-white "
                            {...row.getRowProps()}
                          >
                            {
                              // Loop over the rows cells
                              row.cells.map((cell, idx) => {
                                // Apply the cell props
                                return (
                                  <th
                                    className="px-6 py-3 font-medium flex items-center"
                                    // className={`p-2 whitespace-no  wrap text-sm text-gray-500 justify-center ${idx === row.cells.length - 1 ? '' : 'border-r'} border-gray-300 flex flex-wrap items-center overflow-hidden`}
                                    {...cell.getCellProps()}
                                  >
                                    {cell.render("Cell")}
                                  </th>
                                );
                              })
                            }
                          </tr>
                          {/* subComponent */}
                          {row.isExpanded ? (
                            <tr>
                              <td colSpan={visibleColumns.length}>
                                {renderRowSubComponent({ row })}
                              </td>
                            </tr>
                          ) : null}
                        </React.Fragment>
                      );
                    })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* <div className="px-2 pt-3 flex flex-wrap items-center justify-center sm:justify-between w-full space-y-2 sm:space-y-0">
        {showColumnSelection && <VisibleColumnsSelector/>}
      </div> */}
      {showPagination && (
        <div className="px-2 py-3 flex flex-wrap items-center justify-center w-full space-y-2">
          <Pagination />
        </div>
      )}
      {/* <div className="px-2 py-3 flex flex-wrap items-center justify-center w-full space-y-2">
        {showGoToPage && <PageSelector/>}
        {showPagination && <Pagination />}
      </div> */}
      {/* <div className="px-2 py-3 flex flex-wrap items-center justify-center w-full space-y-2">
        {props.buttons !== undefined && props.buttons}
      </div> */}
    </div>
  );
}
