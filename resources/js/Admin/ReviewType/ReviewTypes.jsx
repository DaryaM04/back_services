import {useTranslation} from "react-i18next";
import React, {useCallback, useContext, useMemo, useState} from "react";
import {CommonContext} from "@/reducer.jsx";
import ColumnFilter, {SelectStatusFilter} from "@/Components/Table/ColumnFilter.jsx";
import NameCell from "@/Components/Table/Cell/NameCell.jsx";
import StatusCell from "@/Components/Table/Cell/StatusCell.jsx";
import ActionsCell from "@/Components/Table/Cell/ActionsCell.jsx";
import {Head, router} from "@inertiajs/react";
import Header from "@/Components/AdminPages/Header.jsx";
import TableActionsContainer from "@/Components/Table/TableActionsContainer.jsx";
import Page, {BlueButton, FilterButton} from "@/Components/AdminPages/Page.jsx";
import Table1 from "@/Components/Table/Table1.jsx";
import {ActivityFilterBinary} from "@/Components/Table/SelectFilter.jsx";

export default function ReviewTypes() {
    const {t} = useTranslation(['admin', 'common']);
    const [inputFilter, setInputFilter] = useState(false);
    const [refresh, setRefresh] = useState(0); //refresh data after deleting row
    const {dispatch} = useContext(CommonContext);

    const columns = useMemo(() => ([
        {
            Header: "#",
            accessor: "id",
            disableFilters: true,
            Filter: "",
            minWidth: 70,
            width: 100,
        },
        {
            Header: () => t('reviewTypes.headers.name'),
            accessor: (row) => {
                return {
                    name: row.name,
                    actionName: 'edit'
                };
            },
            width: 160,
            minWidth: 140,
            Filter: ColumnFilter,
            id: "name",
            disableFilters: false,
            Cell: NameCell,
        },
        {
            Header: () => t('reviewTypes.headers.profile_type'),
            accessor: "profile_type",
            width: 160,
            minWidth: 160,
            // Filter: ColumnFilter,
            id: "profile_type",
            disableFilters: true,
            Cell: ({value}) => {
                const {t} = useTranslation(['admin', 'common'])
                return value.map(type => t(`reviewTypes.profile_type.${type}`)).join(', ')
            }
        },
        {
            Header: () => t('reviewTypes.headers.type'),
            accessor: "type",
            minWidth: 130,
            width: 150,
            // Filter: ColumnFilter,
            id: "type",
            disableFilters: true,
            Cell: ({value}) => {
                const {t} = useTranslation(['admin', 'common'])
                return t(`reviewTypes.type.${value}`)
            }
        },
        {
            Header: () => t('table.active'),
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
        return items.map((item, i) => {
            return {
                ...item,
                rowActions: [
                    {
                        name: "edit",
                        type: "edit",
                        tooltip: t('reviewTypes.edit'),
                        action: () => router.get(route("admin.review-type.edit", item.id)),
                        disabled: false,
                    },
                    {
                        name: "delete",
                        type: "delete",
                        tooltip: t('reviewTypes.delete'),
                        action: () => {
                            dispatch({
                                type: 'SHOW_MODAL', payload: {
                                    action: () => {
                                        router.delete(route("admin.review-type.destroy", item.id), {
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
            <Header title={t('reviewTypes.title')}/>
            <Head title="List reviews"/>
            <TableActionsContainer>
                <BlueButton
                    onClick={() => {
                        router.get(route("admin.review-type.create"));
                    }}
                    label={t('reviewTypes.add')}
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
    )
}
