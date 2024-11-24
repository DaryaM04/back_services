import {useTranslation} from "react-i18next";
import React, {useCallback, useContext, useMemo, useState} from "react";
import {CommonContext} from "@/reducer.jsx";
import ColumnFilter, {SelectStatusFilter} from "@/Components/Table/ColumnFilter.jsx";
import StatusCell from "@/Components/Table/Cell/StatusCell.jsx";
import ActionsCell from "@/Components/Table/Cell/ActionsCell.jsx";
import {router} from "@inertiajs/react";
import Header from "@/Components/AdminPages/Header.jsx";
import Page, {BlueButton, FilterButton} from "@/Components/AdminPages/Page.jsx";
import Table1 from "@/Components/Table/Table1.jsx";
import NameCell from "@/Components/Table/Cell/NameCell.jsx";
import TableActionsContainer from "@/Components/Table/TableActionsContainer.jsx";

// this page is for further "Reviews Table"
export default function index() {
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
            width: 70,
        },
        {
            Header: t('cities.name'),
            accessor: (row) => {
                return {
                    name: row.name,
                    actionName: 'edit'
                };
            },
            width: 200,
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
            /*tooltip: (value) => (
                value === 1 ? t('state.active') : t('state.inactive')
            ),*/
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

    const addActions = useCallback((items) => {
        return items.map((item, i) => {
            return {
                ...item,
                rowActions: [
                    {
                        name: "edit",
                        type: "edit",
                        tooltip: t('reviews.edit'),
                        action: () => router.get(route("admin.review.edit", item.id)),
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
                                        router.delete(route("admin.review.destroy", item.id), {
                                            onSuccess: () => setRefresh(new Date())
                                        })
                                    },
                                    text: `${t('alert.confirmDelete')} '${item.name}'?`,
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
            <Header title={t('reviews.title')}/>

            <TableActionsContainer>
                <BlueButton
                    onClick={() => {
                        router.get(route("admin.review.create"));
                    }}
                    label={t('reviews.add')}
                />
                <FilterButton onClick={handleShowInput} setInputFilter={setInputFilter} tooltip={t('common:filter')}/>
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
