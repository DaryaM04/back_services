import React, { Fragment, useState } from 'react';
import { Disclosure, Menu, Popover, Transition } from '@headlessui/react';
import { Link, usePage } from '@inertiajs/react';
import { useTranslation } from "react-i18next";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import {clsx} from "clsx";
import LanguageSelector from "@/Components/Header/LanguageSelector.jsx";

export default function Header({ children }) {
    const { url } = usePage();

    const { t } = useTranslation('public');

    return (
            <header className="sticky top-0 z-30">
                <Popover className="relative bg-white">
                    <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-6 sm:px-6 md:justify-start md:space-x-10 lg:px-8">
                        <div className="flex justify-start lg:w-0 lg:flex-1">
                            <a href="/" className='flex items-center gap-3'>
                                <div className='w-10 h-10 p-1 flex items-center border border-solid border-[#172B6E] me-3'>
                                    <img className={'no-shrink'} src="/img/logo-mobile.svg" />
                                </div>
                                <span className="text-base font-semibold leading-6 text-[#111827]">{t('guild')}</span>
                            </a>
                        </div>
                        <div className="-mr-2 -my-2 md:hidden flex-row flex justify-between">
                            <LanguageSelector/>
                            <Popover.Button className="ml-2 bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-dark">
                                <span className="sr-only">Open menu</span>
                                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                            </Popover.Button>
                        </div>

                        <Popover.Group as="nav" className="hidden md:flex md:items-center gap-10">
                            <Popover className="relative">
                                {({ open }) => (
                                    <>
                                        <Popover.Button
                                            className={clsx(
                                                open ? 'text-gray-900' : 'text-gray-500',
                                                'gap-1 group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark'
                                            )}
                                        >
                                        <span className="font-medium text-[#6B7280] text-base font-ubuntu sw-4 ">Solutions</span>
                                            <ChevronDownIcon
                                                className={clsx(
                                                    open ? 'text-gray-600' : 'text-gray-400',
                                                    'h-5 w-5 group-hover:text-gray-500'
                                                )}
                                                aria-hidden="true"
                                            />
                                        </Popover.Button>

                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-200"
                                            enterFrom="opacity-0 translate-y-1"
                                            enterTo="opacity-100 translate-y-0"
                                            leave="transition ease-in duration-150"
                                            leaveFrom="opacity-100 translate-y-0"
                                            leaveTo="opacity-0 translate-y-1"
                                        >
                                            <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform w-screen max-w-md lg:max-w-2xl lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                                                <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                                </div>
                                            </Popover.Panel>
                                        </Transition>
                                    </>
                                )}
                            </Popover>

                            <a href="#"
                               className="font-medium rounded-lg px-1.5 py-1 inline-flex items-center justify-center text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-dark"
                            >
                                Pricing
                            </a>
                            <a href="#"
                               className="font-medium rounded-lg px-1.5 py-1 inline-flex items-center justify-center text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-dark"
                            >
                                Docs
                            </a>
                        <Popover className="relative">
                            {({ open }) => (
                                    <Popover.Button
                                        className={clsx(
                                            open ? 'text-gray-900' : 'text-gray-500',
                                            'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark'
                                        )}
                                    >
                                        <span className="font-medium text-[#6B7280] text-base font-ubuntu sw-4 ml-1">More</span>
                                        <ChevronDownIcon
                                            className={clsx(
                                                open ? 'text-gray-600' : 'text-gray-400',
                                                'ml-2 h-5 w-5 group-hover:text-gray-500'
                                            )}
                                            aria-hidden="true"
                                        />
                                    </Popover.Button>
                            )}
                        </Popover>
                        </Popover.Group>

                        <div className="hidden md:flex items-center gap-4 md:gap-5 justify-end md:flex-1 lg:w-0">
                            {
                                // let's show all buttons on landing
                                url === '/' ? (
                                    <>
                                        <a href="/login"
                                           className="whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-dark rounded-md inline-flex items-center justify-center text-gray-500 bg-origin-border px-4 py-2 font-medium hover:text-gray-900 text-lg font-ubuntu sw-4">
                                            {t("LogIn")}
                                        </a>
                                        <a href="/register"
                                           className="whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-dark inline-flex items-center justify-center bg-primary bg-origin-border px-4 py-2 border border-transparent rounded-md shadow-sm font-medium text-white hover:bg-primary-dark text-lg font-ubuntu sw-4">
                                            {t("Registration")}
                                        </a>
                                    </>
                                ) : (
                                    url === '/register' ? (
                                        <a href="/login"
                                           className="whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-dark inline-flex items-center justify-center bg-primary bg-origin-border px-4 py-2 border border-transparent rounded-md shadow-sm font-medium text-white hover:bg-primary-dark text-lg font-ubuntu sw-4">
                                            {t("LogIn")}
                                        </a>
                                    ) : (
                                        <a href="/register"
                                           className="whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-dark inline-flex items-center justify-center bg-primary bg-origin-border px-4 py-2 border border-transparent rounded-md shadow-sm font-medium text-white hover:bg-primary-dark text-lg font-ubuntu sw-4">
                                            {t("Registration")}
                                        </a>
                                    )
                                )
                            }

                            <LanguageSelector/>
                        </div>
                    </div>

                    <Transition
                        as={Fragment}
                        enter="duration-200 ease-out"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="duration-100 ease-in"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Popover.Panel
                            focus
                            className="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                        >
                            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                                <div className="pt-5 pb-6 px-5">
                                    <div className="no-shrink flex items-center justify-between">
                                        <div>
                                            <img
                                                className="no-shrink h-8 w-auto"
                                                src="/img/logo-mobile.svg"
                                                alt="Workflow"
                                            />
                                        </div>
                                        <div className="-mr-2">
                                            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-dark">
                                                <span className="sr-only">Close menu</span>
                                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                            </Popover.Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="pb-6 pt-3 px-5">
                                    <div className="flex flex-col gap-2">
                                        <a href="/login"
                                           className={"bg-white text-center px-4 py-2 border-primary border text-primary rounded-md font-medium"}
                                        >
                                            {t("LogIn")}
                                        </a>
                                        <a
                                            href="/register"
                                            className="hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark w-full flex items-center justify-center bg-primary bg-origin-border px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:bg-primary-active"
                                        >
                                            {t("Registration")}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </Popover>
            </header>


    );
}
