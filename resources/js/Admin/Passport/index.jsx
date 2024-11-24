import {useTranslation} from "react-i18next";
import React, {useCallback, useContext, useMemo, useState} from "react";
import {CommonContext} from "@/reducer.jsx";
import ExpandCell, {CloseAllIcon, OpenAllIcon} from "@/Components/Table/Cell/ExpandCell.jsx";
import ColumnFilter, {SelectStatusFilter} from "@/Components/Table/ColumnFilter.jsx";
import CategoryNameCell from "@/Components/Table/Cell/CategoryNameCell.jsx";
import StatusCell from "@/Components/Table/Cell/StatusCell.jsx";
import ActionsCell from "@/Components/Table/Cell/ActionsCell.jsx";
import {Head, router} from "@inertiajs/react";
import Page, {BlueButton, FilterButton} from "@/Components/AdminPages/Page.jsx";
import Header from "@/Components/AdminPages/Header.jsx";
import Table1 from "@/Components/Table/Table1.jsx";
import TableActionsContainer from "@/Components/Table/TableActionsContainer.jsx";
import NameCell from "@/Components/Table/Cell/NameCell.jsx";
import OneLineCell from "@/Components/Table/Cell/OneLineCell.jsx";
import UserCell from "@/Components/Table/Cell/UserCell";

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
            disableResizing: true,
        },
        {
            Header: () => t('user.name'),
            accessor: (user) => {
                return {
                    name: user?.profile?.name ?? (user.profile?.first_name + ' ' + user.profile?.last_name),
                    image: user?.profile?.photo,
                    actionName: 'edit'
                };
            },
            width: 200,
            Filter: ColumnFilter,
            id: "name",
            Cell: UserCell,
        },
        {
            Header: t('user.profileType'),
            accessor: (passport) => passport?.profile_type,
            width: 100,
            Cell: ({value}) => {
                const translated = value && {
                    'App\\Models\\CompanyProfile': t('common:profileTypes.company'),
                    'App\\Models\\UserProfile': t('common:profileTypes.user'),
                }[value]
                return <OneLineCell value={translated}/>
            }
        },
        /*{
            Header: t('common:status'),
            accessor: "status",
            Filter: SelectStatusFilter,
            disableFilters: false,
            staticColumn: true,
            headerCenter: true,
            disableResizing: true,
            separatorShow: true,
            width: 152,
            tooltip: (value) => (
                value
            ),
            Cell: StatusCell,
        },*/
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
                        name: "approve",
                        type: "approve",
                        tooltip: t('passport.tooltip.approve'),
                        action: () => {
                            // const r = {
                            //     "App\\Models\\UserProfile": "admin.passport.approve-user",
                            //     "App\\Models\\CompanyProfile": "admin.passport.approve-company"
                            // }[item.profile_type]
                            router.get(route('admin.passport.approve', item.id))
                        },
                        disabled: false
                    },
                    {
                        name: "edit",
                        type: "edit",
                        tooltip: t('passport.tooltip.edit'),
                        action: () => {
                            // const path = {
                            //     "App\\Models\\UserProfile": "admin.passport.edit-user",
                            //     "App\\Models\\CompanyProfile": "admin.passport.edit-company"
                            // }[item.profile_type]
                            router.get(route("admin.passport.show", item.id));
                        },
                        disabled: false,
                    },
                    // {
                    //     name: "delete",
                    //     type: "delete",
                    //     tooltip: t('passport.tooltip.delete'),
                    //     action: () => {
                    //         dispatch({
                    //             type: 'SHOW_MODAL', payload: {
                    //                 action: () => {
                    //                     router.delete(route("admin.passport.destroy", item.id), {
                    //                         onSuccess: () => setRefresh(new Date())
                    //                     })
                    //                 },
                    //                 text: `${t('alert.confirmDelete')} '${item.name}'?`,
                    //                 type: 'delete'
                    //             }
                    //         });
                    //     },
                    //     disabled: false,
                    // },
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
            <Head title="List Passports"/>
            <Header title={t('passport.title')}/>

            <TableActionsContainer>
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

const mockPassports = [
    {
        id: 1,
        name: "Albert Mock",
        status: "await",
        profileType: "company"
    }
    , {
        id: 2,
        name: "Albert Mock 2",
        status: "verify",
        profileType: "user"
    }
    , {
        id: 3,
        name: "Albert Mock 3",
        status: "not verify",
        profileType: "user"
    }
]
