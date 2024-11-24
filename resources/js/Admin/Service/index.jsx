import {Head, router} from '@inertiajs/react';
import Header from "@/Components/AdminPages/Header.jsx";
import React, {useCallback, useContext, useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import Page, {BlueButton, FilterButton} from "@/Components/AdminPages/Page.jsx";
import {CommonContext} from "@/reducer.jsx";
import ColumnFilter from "@/Components/Table/ColumnFilter.jsx";
import StatusCell from "@/Components/Table/Cell/StatusCell.jsx";
import ActionsCell from "@/Components/Table/Cell/ActionsCell.jsx";
import ExpandedTable from "@/Components/Table/ExpandedTable.jsx";
import ExpandableNameCell from "@/Components/Table/Cell/ExpandableNameCell.jsx";
import {ChevronDoubleDownIcon, ChevronDoubleRightIcon} from "@heroicons/react/24/outline/index.js";
import TableActionsContainer from "@/Components/Table/TableActionsContainer.jsx";
import {ActivityFilterBinary} from "@/Components/Table/SelectFilter.jsx";


export default function index({services}) {
    const {t} = useTranslation(['admin', 'common']);
    const [inputFilter, setInputFilter] = useState(false);
    const [refresh, setRefresh] = useState(0); //refresh data after deleting row
    const {dispatch} = useContext(CommonContext);

    const columns = useMemo(() => ([
        {
            Header: ({getToggleAllRowsExpandedProps, isAllRowsExpanded}) => (
                <div className={'flex items-center'}>
                    <span {...getToggleAllRowsExpandedProps()}>
                        {
                            isAllRowsExpanded ? (
                                <ChevronDoubleDownIcon className="w-5 h-5 -ms-1 me-1"/>
                            ) : (
                                <ChevronDoubleRightIcon className="w-5 h-5 -ms-1 me-1 rtl:scale-x-[-1]"/>
                            )
                        }
                    </span>
                    <span>
                        {t('services.name')}
                    </span>
                </div>
            ),
            accessor: 'name',
            width: 200,
            Filter: ColumnFilter,
            filter: "fuzzyText",
            id: "name",
            actionName: 'edit',
            disableFilters: false,
            Cell: ExpandableNameCell,
        },
        {
            Header: () => t('common:active'),
            accessor: "active",
            Filter: ActivityFilterBinary,
            disableFilters: false,
            staticColumn: true,
            headerCenter: true,
            disableResizing: true,
            separatorShow: true,
            width: 152,
            /*tooltip: (value) => (
                value === 1 ? t('common:state.active') : t('common:state.inactive')
            ),*/
            Cell: StatusCell,
        },
        {
            Header: () => t('table.actions'),
            accessor: "rowActions",
            disableFilters: true,
            headerCenter: true,
            Filter: "",
            width: 152,
            Cell: ActionsCell,
            disableResizing: true,
        },
    ]), []);

    const addActions = useCallback((items) => {
        return items?.map((item, i) => {
            return {
                ...item,
                rowActions: [
                    {
                        name: "edit",
                        type: "edit",
                        tooltip: t('services.edit'),
                        action: () => router.get(route("admin.services.edit", item.id)),
                        disabled: false,
                    },
                    {
                        name: "delete",
                        type: "delete",
                        tooltip: t('services.delete'),
                        action: () => {
                            dispatch({
                                type: 'SHOW_MODAL', payload: {
                                    action: () => {
                                        router.delete(route("admin.services.destroy", item.id), {
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

    const data = useMemo(() => addActions(services), [services])

    console.log(services)
    return (
        <Page>
            <Head title="List Service"/>
            <Header title={t('services.title')}/>

            <TableActionsContainer>
                <BlueButton
                    onClick={() => {
                        router.get(route("admin.services.create"));
                    }}
                    label={t('services.add')}
                />
                <FilterButton onClick={handleShowInput} setInputFilter={setInputFilter} tooltip={t('admin:filter')}/>
            </TableActionsContainer>
            <ExpandedTable
                columns={columns}
                data={data}
                refresh={refresh}
                showInputFilter={inputFilter}
            />
        </Page>
    );
}
