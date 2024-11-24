import {Menu, Transition} from "@headlessui/react";
import React, {Fragment, useEffect, useLayoutEffect} from "react";
import {router, usePage} from "@inertiajs/react";
import {useTranslation} from "react-i18next";

export default function LanguageSelector() {
    const {langs} = usePage().props
    const {i18n} = useTranslation();
    document.documentElement.dir = i18n.dir()

    const doChangeLang = async (lang) => {
        await i18n.changeLanguage(lang)
        document.documentElement.lang = lang
        document.documentElement.dir = i18n.dir()
        router.reload()
    }

    return (
        <Menu as="div" className="relative">
            <Menu.Button
                className="h-8 w-8 max-w-xs bg-white flex items-center border-2 border-gray-300 justify-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 z-50">
                <span>{i18n.language}</span>
            </Menu.Button>
            <Transition as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className="origin-top-right absolute left-[-7px] mt-2 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {langs.map((item, index) => (
                        <Menu.Item
                            key={index}
                        >
                            {({active}) => (
                                <button
                                    type={'button'}
                                    className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700`}
                                    onClick={() => doChangeLang(item)}
                                >
                                    {item}
                                </button>
                            )}
                        </Menu.Item>
                    ))}
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
