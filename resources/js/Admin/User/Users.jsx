import React, {useCallback, useContext, useMemo, useState} from "react";
import {Head, router} from '@inertiajs/react'
import Table1 from "../../Components/Table/Table1.jsx";
import ActionsCell from "../../Components/Table/Cell/ActionsCell.jsx";
import UserCell from "../../Components/Table/Cell/UserCell.jsx";
import OneLineCell from "../../Components/Table/Cell/OneLineCell";
import Header from "../../Components/AdminPages/Header.jsx";
import StatusCell from "../../Components/Table/Cell/StatusCell";
import {useTranslation} from "react-i18next";
import ColumnFilter from "../../Components/Table/ColumnFilter.jsx";
import {BlueButton, FilterButton} from "@/Components/AdminPages/Page";
import Page from "../../Components/AdminPages/Page.jsx";
import {CommonContext} from '../../reducer';
import TableActionsContainer from "@/Components/Table/TableActionsContainer.jsx";
import {ProfileTypeFilter, RoleFilter, UserActivityFilter, VerifiedFilter} from "@/Components/Table/SelectFilter.jsx";
import BooleanCell from "@/Components/Table/Cell/BooleanCell.jsx";


export default function Users() {
    const {t} = useTranslation(['admin', 'common'])

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
            Header: () => t('user.name'),
            accessor: (user) => {
                return {
                    name: user?.profile?.name ?? (user.profile?.first_name + ' ' + user.profile?.last_name),
                    image: user?.profile?.photo,
                    actionName: 'edit'
                };
            },
            width: 220,
            minWidth: 210,
            Filter: ColumnFilter,
            id: "name",
            Cell: UserCell,
        },
        {
            Header: () => t('user.email'),
            accessor: "email",
            Filter: ColumnFilter,
            disableFilters: false,
            width: 170,
            minWidth: 125,
            Cell: OneLineCell,
        },
        {
            Header: () => t('user.phone'),
            accessor: "phone",
            Filter: ColumnFilter,
            disableFilters: false,
            width: 160,
            minWidth: 130,
            Cell: OneLineCell,
        },
        {
            id: "role",
            Header: () => t('user.role'),
            accessor: (user) => user?.roles?.at(0)?.name,
            width: 180,
            minWidth: 170,
            Filter: RoleFilter,
            // disableFilters: true,
            Cell: ({value}) => {
                const {t} = useTranslation('common')
                const translated = value && {
                    'user': t('common:userTypes.user'),
                    'admin': t('common:userTypes.admin')
                }[value]
                return <OneLineCell value={translated}/>
            },
        },
        {
            id: "profile_type",
            Header: () => t('user.profileType'),
            accessor: (user) => user?.profile_type,
            width: 140,
            minWidth: 120,
            Filter: ProfileTypeFilter,
            // disableFilters: true,
            Cell: ({value}) => {
                const {t} = useTranslation('common')
                const translated = value && {
                    'App\\Models\\CompanyProfile': t('common:profileTypes.company'),
                    'App\\Models\\UserProfile': t('common:profileTypes.user'),
                }[value]
                return <OneLineCell value={translated}/>
            }
        },
        {
            id: 'is_verified',
            Header: () => t('user.isVerified'),
            accessor: (user) => user?.profile?.is_verified,
            width: 190,
            minWidth: 180,
            Filter: VerifiedFilter,
            Cell: BooleanCell,
        },
        {
            Header: () => t('table.active'),
            accessor: "status",
            Filter: UserActivityFilter,
            staticColumn: true,
            headerCenter: true,
            width: 152,
            minWidth: 152,
            //tooltip: (value) => t(`userStatus.${value}`),
            Cell: StatusCell,
        },
        {
            Header: () => t('table.actions'),
            accessor: "rowActions",
            disableFilters: true,
            headerCenter: true,
            width: 152,
            minWidth: 152,
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
                        tooltip: t('user.edit'),
                        action: () => router.get(route("admin.users.edit", item.id)),
                        disabled: false,
                    },
                    {
                        name: "delete",
                        type: "delete",
                        tooltip: t('user.delete'),
                        action: () => {
                            dispatch({
                                type: 'SHOW_MODAL', payload: {
                                    action: () => {
                                        router.delete(route("admin.users.destroy", item.id), {
                                            onSuccess: () => setRefresh(new Date())
                                        })
                                    },
                                    text: `${t('common:alert.confirmDelete')} '${item?.profile?.name ?? (item.profile?.first_name + ' ' + item.profile?.last_name)}'?`,
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
            <Header title={t('user.title')}/>
            <Head title="List Users"/>
            <TableActionsContainer>
                <BlueButton
                    onClick={() => {
                        router.get(route("admin.users.create"));
                    }}
                    label={t('user.add')}
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
