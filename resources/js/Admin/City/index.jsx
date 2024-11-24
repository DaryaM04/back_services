import {Head, router} from '@inertiajs/react';
import React, {useCallback, useContext, useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import Header from "@/Components/AdminPages/Header.jsx";
import Page, {BlueButton, FilterButton} from "@/Components/AdminPages/Page.jsx";
import Table1 from "@/Components/Table/Table1.jsx";
import {CommonContext} from "@/reducer.jsx";
import ColumnFilter, {SelectStatusFilter} from "@/Components/Table/ColumnFilter.jsx";
import StatusCell from "@/Components/Table/Cell/StatusCell.jsx";
import ActionsCell from "@/Components/Table/Cell/ActionsCell.jsx";
import TableActionsContainer from "@/Components/Table/TableActionsContainer.jsx";
import {ActivityFilterBinary} from "@/Components/Table/SelectFilter.jsx";


const NameCell = ({value, row}) => {
    const actionName = value.actionName;
    const action = row.values.rowActions?.find(e => e.name === actionName)?.action;
    return (
        <a className={`break-all ${actionName ? 'cursor-pointer' : ''}`} onClick={action}>
            <div className={` ${actionName ? 'text-[#4B5563] hover:text-indigo-900' : ''}`}>{value.name}</div>
        </a>
    )
}
export default function index() {
    const {t} = useTranslation(['admin', 'common']);

    const [inputFilter, setInputFilter] = useState(false);
    const [refresh, setRefresh] = useState(0); //refresh data after deleting row
    const {dispatch} = useContext(CommonContext);
    // columns: serial_number, name, active, actions
    const columns = useMemo(() => ([
        {
            Header: "#",
            accessor: "id",
            disableFilters: true,
            Filter: "",
            minWidth: 100,
            disableResizing: true,
            width: 100,
        },
        {
            Header: () => t('cities.name'),
            accessor: (row) => {
                return {
                    name: row.name,
                    actionName: 'edit'
                };
            },
            width: 690,
            minWidth: 690,
            Filter: ColumnFilter,
            id: "name",
            Cell: NameCell,
        },
        {
            Header: () => t('table.active'),
            accessor: "active",
            Filter: ActivityFilterBinary,
            headerCenter: true,
            staticColumn: true,
            disableResizing: true,
            separatorShow: true,
            width: 152,
            minWidth: 152,
            /*tooltip: (value) => (
                value === 1 ? t('common:state.active') : t('common:state.inactive')
            ),*/
            Cell: StatusCell,
        },
        {
            Header: () => t('common:actions'),
            accessor: "rowActions",
            disableFilters: true,
            headerCenter: true,
            disableResizing: true,
            Filter: "",
            minWidth: 152,
            width: 152,
            Cell: ActionsCell,
        },
    ]), []);

    const addActions = useCallback((items) => {
        return items.map((item, i) => {
            return {
                ...item,
                rowActions: [
                    {
                        name: "edit",
                        type: "edit",
                        tooltip: t('cities.edit'),
                        action: () => router.get(route("admin.cities.edit", item.id)),
                        disabled: false,
                    },
                    {
                        name: "delete",
                        type: "delete",
                        tooltip: t('cities.delete'),
                        action: () => {
                            dispatch({
                                type: 'SHOW_MODAL', payload: {
                                    action: () => {
                                        router.delete(route("admin.cities.destroy", item.id), {
                                            onSuccess: () => setRefresh(new Date())
                                        })
                                    },
                                    text: `${t('common:alert.confirmDelete')} '${item.name}'?`,
                                    type: 'delete'
                                }
                            });
                        },
                        disabled: false,
                    },
                ],
            };
        });
    }, []);

    const handleShowInput = () => {
        if (inputFilter === true) setInputFilter(false)
        else setInputFilter(true)
    }

    return (
        <Page>
            <Header title={t('cities.title')}/>
            <Head title="List Cities"/>
            <TableActionsContainer>
                <BlueButton
                    onClick={() => {
                        router.get(route("admin.cities.create"));
                    }}
                    label={t('cities.add')}
                />
                <FilterButton onClick={handleShowInput} setInputFilter={setInputFilter} tooltip={t('admin:filter')}/>
            </TableActionsContainer>
            <Table1
                columns={columns}
                addActions={addActions}
                showInputFilter={inputFilter}
                refresh={refresh}
            />
        </Page>
    );
}
