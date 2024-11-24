import React, {Fragment, useState} from "react";
import {useTranslation} from "react-i18next";
import {Listbox, Transition} from "@headlessui/react";
import {XCircleIcon} from "@heroicons/react/24/outline/index.js";
import {clsx} from "clsx";
import {usePage} from "@inertiajs/react";


export function SelectFilter({column, options}) {
    const selected = options.find(({value}) => value === column.filterValue);
    console.log(selected)

    const onSelectChange = (e) => {
        column.setFilter(e || undefined);
    };

    const drop = (e) => {
        e.preventDefault();
        column.setFilter(undefined);
    }

    return (
        <Listbox value={column.filterValue} onChange={onSelectChange}>
            {({open}) => (
                <div className="mt-1 relative flex items-center w-full">
                    <Listbox.Button
                        className="relative w-full h-[34px] bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-sm">
                    <span className="block truncate">
                        {selected?.label}
                    </span>
                        <span className="absolute inset-y-0 right-0 z-50 flex items-center pr-2"
                              onClick={drop}>
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
                        <Listbox.Options
                            className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none text-sm top-8">
                            {options.map(option => {
                                if (!option) return null;
                                return (
                                    <Listbox.Option
                                        key={option.label}
                                        className={({active}) => clsx(active ? 'font-semibold bg-gray-200' : 'font-normal text-gray-900',
                                            'cursor-default select-none relative flex justify-center py-1')}
                                        value={option.value}
                                    >
                                        <span className={clsx('truncate text-xs flex justify-start')}>
                                            {option.label}
                                        </span>
                                    </Listbox.Option>
                                )
                            })}
                        </Listbox.Options>
                    </Transition>
                </div>
            )}
        </Listbox>
    )
}


// Requires 'profile_type_domain' prop
export function ProfileTypeFilter({column}) {
    const {t} = useTranslation('common')
    const {profile_type_domain} = usePage().props
    const profileTypes = profile_type_domain.map(value => ({
        value: value,
        label: t(`profileTypes.${value}`)
    }))
    // const profileTypes = [
    //     {
    //         value: 'user',
    //         label: t('profileTypes.user')
    //     }, {
    //         value: 'company',
    //         label: t('profileTypes.company')
    //     }
    // ]
    return <SelectFilter column={column} options={profileTypes}/>
}

// Requires 'role_domain' prop
export function RoleFilter({column}) {
    const {t} = useTranslation('common')
    const {role_domain} = usePage().props
    const roles = role_domain.map(value => ({
        value: value,
        label: t(`userTypes.${value}`)
    }))
    // const roles = [
    //     {
    //         value: 'user',
    //         label: t('userTypes.user')
    //     }, {
    //         value: 'admin',
    //         label: t('userTypes.admin')
    //     }
    // ]
    return <SelectFilter column={column} options={roles}/>
}

export function ActivityFilter({column}) {
    const {t} = useTranslation('common')
    const options = [
        {
            value: 'active',
            label: t('state.active')
        }, {
            value: 'inactive',
            label: t('state.inactive')
        }
    ]
    return <SelectFilter column={column} options={options}/>
}

export function UserActivityFilter({column}) {
    const {t} = useTranslation('common')
    const {user_status_domain} = usePage().props
    const options = user_status_domain.map(value => ({
        value: value,
        label: t(`userStatus.${value}`)
    }))
    // const options = [
    //     {
    //         value: 'active',
    //         label: t('state.active')
    //     }, {
    //         value: 'blocked',
    //         label: t('state.blocked')
    //     }
    // ]
    return <SelectFilter column={column} options={options}/>
}

export function ActivityFilterBinary({column}) {
    const {t} = useTranslation('common')
    const options = [
        {
            value: '1',
            label: t('common:state.active')
        }, {
            value: '0',
            label: t('common:state.inactive')
        }
    ]
    return <SelectFilter column={column} options={options}/>
}

export function VerifiedFilter({column}) {
    const {t} = useTranslation('admin')
    const options = [
        {
            value: '1',
            label: t('user.verified.true')
        }, {
            value: '0',
            label: t('user.verified.false')
        }
    ]
    return <SelectFilter column={column} options={options}/>
}
