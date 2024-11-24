import React, {useMemo} from 'react';
import {useTranslation} from "react-i18next";
import {
    useExpanded,
    useFilters,
    useFlexLayout,
    usePagination,
    useResizeColumns,
    useRowSelect,
    useSortBy,
    useTable
} from "react-table";
import ColumnFilter, {SelectStatusFilter} from "@/Components/Table/ColumnFilter.jsx";
import Header from "@/Components/AdminPages/Header.jsx";
import {BlueButton} from "@/Components/AdminPages/Page.jsx";
import {router} from "@inertiajs/react";
import StatusCell from "@/Components/Table/Cell/StatusCell.jsx";
import ActionsCell from "@/Components/Table/Cell/ActionsCell.jsx";


const NameCell = ({value, row}) => {
    const actionName = value.actionName;
    const action = row.values.rowActions?.find(e => e.name === actionName)?.action;
    return (
        <a className={`break-all ${actionName ? 'cursor-pointer' : ''}`} onClick={action}>
            <div className={` ${actionName ? 'text-[#4B5563] hover:text-indigo-900' : ''}`}>{value.name}</div>
        </a>
    )
}
const CitiesTable = ({cities}) => {
    const {t} = useTranslation(['admin', 'common'])
    console.log(cities)

    const data = cities

    // columns: serial_number, name, active, actions
    const columns = useMemo(() => ([
        {
            Header: "#",
            accessor: "id",
            disableFilters: true,
            Filter: "",
            width: 70,
        },
        {
            Header: t('table:name'),
            accessor: (row) => {
                return {
                    name: row.name,
                    actionName: 'edit'
                };
            },
            width: 300,
            Filter: ColumnFilter,
            id: "name",
            disableFilters: false,
            Cell: NameCell,
        },
        {
            Header: t('common:active'),
            accessor: "active",
            Filter: SelectStatusFilter,
            disableFilters: false,
            staticColumn: true,
            headerCenter: true,
            disableResizing: true,
            separatorShow: true,
            width: 152,
            tooltip: (value) => (value === 1),
            Cell: StatusCell,
        },
        {
            Header: t('common:actions'),
            accessor: "rowActions",
            disableFilters: true,
            headerCenter: true,
            Filter: "",
            width: 152,
            Cell: ActionsCell,
            disableResizing: true,
        },
    ]), []);

    const defaultColumn = useMemo(
        () => ({
            minWidth: 5,
            width: 150,
            maxWidth: 400,
            Filter: ColumnFilter,
        }), []);
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page
    } = useTable({
        columns,
        data,
        defaultColumn,
        manualPagination: true,
        pageCount: 1,
        disableMultiSort: true,
        manualSortBy: true,
        autoResetSortBy: false,
        manualFilters: true
    }, useFilters, useSortBy, useExpanded, usePagination, useRowSelect, useFlexLayout, useResizeColumns)


    return (
        <div>
            <Header title={t('common:users')}/>
            <div className="flex justify-end pb-2">
                <BlueButton label={t('common:addCity')}
                            onClick={() => router.get(route("admin.cities.create"))}
                />
            </div>

            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="w-full divide-y divide-gray-200" {...getTableProps()}>
                                <thead className="bg-gray-50">
                                {
                                    headerGroups.map(headerGroup => (
                                        <tr {...headerGroup.getHeaderGroupProps()}>
                                            {
                                                headerGroup.headers.map((column, idx) => {
                                                    const getSortByToggleProps = {
                                                        ...column.getSortByToggleProps(),
                                                    };
                                                    return (
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                            {...column.getHeaderProps()}
                                                        >
                                                            <div
                                                                className={`${column.headerCenter === true ? 'justify-center ' : ''}flex w-full items-center`}
                                                                {...(column.disableFilters ? null : getSortByToggleProps)}
                                                            >
                                                                <span className="flex items-center">
                                                                  {column.render("Header")}
                                                                </span>
                                                            </div>
                                                        </th>
                                                    )
                                                })
                                            }
                                        </tr>
                                    ))
                                }
                                </thead>
                                <tbody  {...getTableBodyProps()}>
                                {
                                    page.map((row, i) => {
                                        prepareRow(row);
                                        return (
                                            <React.Fragment key={i}>
                                                <tr {...row.getRowProps()}
                                                    className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b border-gray-300`}>
                                                    {
                                                        row.cells.map((cell) => {
                                                            return (
                                                                <td {...cell.getCellProps()}
                                                                    className="px-6 py-3 font-medium flex break-all items-center">
                                                                    {cell.render("Cell")}
                                                                </td>
                                                            );
                                                        })
                                                    }
                                                </tr>
                                            </React.Fragment>
                                        );
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CitiesTable;
