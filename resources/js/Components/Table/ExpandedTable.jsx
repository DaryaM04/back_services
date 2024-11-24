import React, { Fragment, useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useTable,
    useResizeColumns,
    useFlexLayout,
    useExpanded,
    useFilters,
  } from 'react-table'
import ColumnFilter from "./ColumnFilter.jsx";
import {CSSTransition} from 'react-transition-group';
import { matchSorter } from 'match-sorter';

function fuzzyTextFilterFn(rows, id, filterValue) {
    return rows.filter(row => {
        const exist = matchSorter([row], filterValue, { keys: [row => row.values[id]] }).length > 0;

        const nestedExist = exist || (row.subRows?.length && !!fuzzyTextFilterFn(row?.subRows, id, filterValue).length);

        return nestedExist;
    });
}




fuzzyTextFilterFn.autoRemove = val => !val


const nest = (items, id = null, depth = 0) =>
    items
        ?.filter(item => item.parent_id === id)
        .map(item => ({
            ...item,
            depth,
            subRows: nest(items, item.id, depth + 1)
        }));

// const flatten = (items) => {
//     let a = [];
//     for(let i = 0; i < items.length; i++ ) {
//       if(items[i].subRows) {
//         a = a.concat(flatten(items[i].subRows) )
//       }
//       a.push(items[i]);
//     }
//     return a;
//   }

/*
    Для поиска по вложенным полям требуется поле
            filter: "fuzzyText",
 */
function ExpandedTable({ columns: userColumns,
    data: flatData,
    refresh,
    showInputFilter
}) {

    const data = React.useMemo(() => {
        return nest(flatData);
    }, [flatData]);

    const filterTypes = React.useMemo(() => ({
        fuzzyText: fuzzyTextFilterFn,
    }), []);

    const defaultColumn = useMemo(() => ({
        minWidth: 100,
        width: 150,
        maxWidth: 500,
        // DefaultFilter
        Filter: ColumnFilter,
        // Cell: EditableCell
    }), []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    state,
    prepareRow,
    state: {expanded, filters },
  } = useTable(
    {
      columns: userColumns,
      data,
      initialState: {
        filters:  JSON.parse(window.localStorage.getItem('filters_' + window.location.pathname)) ?? [],
        expanded: JSON.parse(window.localStorage.getItem('expanded_' + window.location.pathname)) ?? {},
      },
      getSubRows: (row) => row.subRows,
      defaultColumn,
      filterTypes,
      autoResetExpanded: false
    },
    useFilters,
    useExpanded,
    useFlexLayout,
    useResizeColumns,
    )


  useEffect(() => {
    window.localStorage.setItem('filters_' + window.location.pathname, JSON.stringify(filters))
  }, [filters])

  useEffect(() => {
    window.localStorage.setItem('expanded_' + window.location.pathname, JSON.stringify(expanded))
  }, [expanded])

  useEffect(() => {
    // window.localStorage.setItem('pageSize_' + window.location.pathname, pageSize);
    // window.localStorage.setItem('pageIndex_' + window.location.pathname, 0);
  }, []);

  console.log(state)

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-visible border-b border-gray-200 sm:rounded-lg">

            <table {...getTableProps()} className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column, idx) => (
                        <th
                            scope="col"
                            className="flex flex-col justify-between px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            {...column.getHeaderProps()}
                        >
                                <div
                                    className={`${column.headerCenter === true ? 'justify-center' : ''} flex w-full items-center`}
                                    // {...(column.disableFilters
                                    //   ? null
                                    //   : '')}
                                >
                                    <span className="flex items-center">
                                        {column.render("Header")}
                                    </span>
                                </div>

                                {!column.disableFilters ? <CSSTransition
                                    in={showInputFilter}
                                    classNames="alert"
                                    timeout={100}
                                    unmountOnExit
                                    >
                                        <div>{column.canFilter ? column.render("Filter") : null}</div>
                                    </CSSTransition>
                                : null }

                                {column.disableResizing !== true && headerGroup.headers.length !== idx+1 ? (
                                    <div className={`resizer isResizing`}
                                        {...column.staticColumn !== true ? {...column.getResizerProps()} : null}>
                                    </div>
                                ) : null}
                                {column.separatorShow === true ? (
                                    <div className={`resizer isResizing`}/>
                                ) : null}
                        </th>
                    ))}
                    </tr>
                ))}
                </thead>

                <tbody {...getTableBodyProps()}>
                {
                rows.map((row, i) => {
                    prepareRow(row)
                    return (
                    <React.Fragment key={i}>
                        <tr {...row.getRowProps()}
                            className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b border-gray-300`}
                        >
                            {row.cells.map(cell => {
                            return (<td
                                        className="px-6 py-3 font-medium"
                                        // className={`p-2 whitespace-no  wrap text-sm text-gray-500 justify-center ${i === row.cells.length - 1 ? '' : 'border-r'} border-gray-300 flex flex-wrap items-center overflow-hidden`}
                                        {...cell.getCellProps()}
                                    >
                                    {cell.render('Cell')}
                                </td>)
                            })}
                        </tr>
                    </React.Fragment>
                    )
                })}
                </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ExpandedTable;
