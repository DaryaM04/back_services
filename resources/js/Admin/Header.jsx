import React, {Fragment, useEffect, useLayoutEffect, useState} from 'react';
import {Dialog, Menu, Transition} from '@headlessui/react';
import {Link, usePage} from '@inertiajs/react';
import {BuildingLibraryIcon, CurrencyDollarIcon, XCircleIcon as XCircleIcon,} from '@heroicons/react/24/outline';
import Accordion from '../Components/Accordion';
import {useTranslation} from "react-i18next";
import {clsx} from "clsx";
import LanguageSelector from "@/Components/Header/LanguageSelector.jsx";

const icons = {
    "UsersIcon": <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M12 4.35418C12.7329 3.52375 13.8053 3 15 3C17.2091 3 19 4.79086 19 7C19 9.20914 17.2091 11 15 11C13.8053 11 12.7329 10.4762 12 9.64582M15 21H3V20C3 16.6863 5.68629 14 9 14C12.3137 14 15 16.6863 15 20V21ZM15 21H21V20C21 16.6863 18.3137 14 15 14C13.9071 14 12.8825 14.2922 12 14.8027M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z"
            stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,
    "BuildingLibraryIcon": <BuildingLibraryIcon/>,
    "CurrencyDollarIcon": <CurrencyDollarIcon/>,
    "DashboardIcon": <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M8 13V12M12 13V10M16 13V8M8 21L12 17L16 21M3 4H21M4 4H20V16C20 16.5523 19.5523 17 19 17H5C4.44772 17 4 16.5523 4 16V4Z"
            stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,
    "ServiceIcon": <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01"
            stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>,
    "CityIcon": <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M19 21V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V21M19 21L21 21M19 21H14M5 21L3 21M5 21H10M9 6.99998H10M9 11H10M14 6.99998H15M14 11H15M10 21V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V21M10 21H14"
            stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,
    "ReviewIcon": <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_511_1964)">
            <path
                d="M11.049 2.92664C11.3483 2.00537 12.6517 2.00538 12.951 2.92664L14.4699 7.60055C14.6038 8.01254 14.9877 8.29148 15.4209 8.29149L20.3354 8.29168C21.3041 8.29172 21.7068 9.53127 20.9232 10.1007L16.9474 12.9895C16.5969 13.2441 16.4503 13.6955 16.5841 14.1075L18.1026 18.7815C18.4019 19.7028 17.3475 20.4689 16.5638 19.8995L12.5878 17.011C12.2373 16.7564 11.7627 16.7564 11.4122 17.011L7.43622 19.8995C6.65252 20.4689 5.5981 19.7028 5.8974 18.7815L7.41589 14.1075C7.54974 13.6955 7.40309 13.2441 7.05263 12.9895L3.07683 10.1007C2.29317 9.53127 2.69592 8.29172 3.66461 8.29168L8.57911 8.29149C9.01231 8.29148 9.39623 8.01254 9.53011 7.60055L11.049 2.92664Z"
                stroke="white" strokeWidth="2"/>
        </g>
        <defs>
            <clipPath id="clip0_511_1964">
                <rect width="24" height="24" fill="white"/>
            </clipPath>
        </defs>
    </svg>,
    "ApproveIcon": <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M9.00012 12.0001L11.0001 14.0001L15.0001 10.0001M7.83486 4.69717C8.55239 4.63991 9.23358 4.35775 9.78144 3.89087C11.0599 2.80135 12.9403 2.80135 14.2188 3.89087C14.7667 4.35775 15.4478 4.63991 16.1654 4.69717C17.8398 4.83079 19.1695 6.16043 19.3031 7.83486C19.3603 8.55239 19.6425 9.23358 20.1094 9.78144C21.1989 11.0599 21.1989 12.9403 20.1094 14.2188C19.6425 14.7667 19.3603 15.4479 19.3031 16.1654C19.1695 17.8398 17.8398 19.1695 16.1654 19.3031C15.4479 19.3603 14.7667 19.6425 14.2188 20.1094C12.9403 21.1989 11.0599 21.1989 9.78144 20.1094C9.23358 19.6425 8.55239 19.3603 7.83486 19.3031C6.16043 19.1695 4.83079 17.8398 4.69717 16.1654C4.63991 15.4478 4.35775 14.7667 3.89087 14.2188C2.80135 12.9403 2.80135 11.0599 3.89087 9.78144C4.35775 9.23358 4.63991 8.55239 4.69717 7.83486C4.83079 6.16043 6.16043 4.83079 7.83486 4.69717Z"
            stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
}

const useDesktopSidebarState = () => {
    const storageName = 'DesktopHeaderState'
    const initial = !(localStorage.getItem(storageName) === 'false') // right way to cast string to bool
    const [state, setState] = useState(initial)
    const setStateWithLocalStorage = (state) => {
        // original setState compatibility included
        if(typeof state === 'function') {
            const stateFunction = state
            setState(state => {
                const value = stateFunction(state)
                localStorage.setItem(storageName, value)
                return value
            })
        } else {
            setState(state)
            localStorage.setItem(storageName, state)
        }
    }
    return [state, setStateWithLocalStorage]
}

export default function Header({children}) {
    const {auth, userMenu, leftMenu} = usePage().props;
    const user = auth.user;

    console.log(leftMenu)
    const setCurrentNavItem = (navArr) => {
        navArr.forEach((navItem) => {
            if (Array.isArray(navItem.items)) {
                setCurrentNavItem(navItem.items);
            } else {
                // startsWith is quick fix; bugs with 'admin/review-type' and 'admin/review'
                navItem.href === location.href || location.href.startsWith(navItem.href)
                    ? navItem.current = true
                    : navItem.current = false;
            }
        });
    };
    setCurrentNavItem(leftMenu);

    // const selectedNavItem = (() => {
    //     const href = location.href
    //     return leftMenu.find(item => {
    //         if(Array.isArray(item.items))
    //             throw new Error("Now is time to implement accordion menu!")
    //         return item.href === href
    //     })
    // })()

    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    // const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(false);
    const [desktopSidebarOpen, setDesktopSidebarOpen] = useDesktopSidebarState(false);
    return (
        <div>
            <div className="h-screen flex overflow-hidden bg-gray-100">

                <MobileLeftMenu leftMenu={leftMenu} setSidebarOpen={setMobileSidebarOpen}
                                sidebarOpen={mobileSidebarOpen}/>

                {/* desktop left menu */}
                <DesktopLeftMenu leftMenu={leftMenu} setSidebarOpen={setDesktopSidebarOpen}
                                 sidebarOpen={desktopSidebarOpen}/>

                {/* top header */}
                <TopHeader setSidebarOpen={setMobileSidebarOpen} userMenu={userMenu} user={user}>
                    <div
                        className="flex flex-col z-0 relative h-full overflow-x-hidden p-1 sm:p-4 md:p-4 xl:p-8 focus:outline-none">
                        {children}
                    </div>
                </TopHeader>
            </div>
        </div>
    )
}

function NavItems({items, setSidebarOpen}) {
    const {t} = useTranslation('admin')

    return (
        items.map((navItem) => {
            const classNames = navItem.current ? (
                'bg-white/[15%] text-white'
            ) : (
                navItem.active === undefined || navItem.active ? (
                    'text-indigo-100 hover:bg-white/10'
                ) : (
                    'text-gray-500 cursor-default'
                )
            )
            if (Array.isArray(navItem.items)) {
                throw new Error("Now is time to implement accordion menu!")
            } else {
                return (
                    <Link
                        key={navItem.name}
                        href={navItem.href}
                        className={
                            `${navItem.current
                                ? 'bg-white/[15%] text-white'
                                : navItem.active === undefined || navItem.active
                                    ? 'text-indigo-100 hover:bg-white/10'
                                    : 'text-gray-500 cursor-default'
                            }
                       group flex items-start px-2 py-2 text-sm font-medium rounded-md`
                        }
                        onClick={() => {
                            navItem.action()
                            if (setSidebarOpen)
                                setSidebarOpen(false)
                        }}
                    >
                        {
                            navItem.icon &&
                            <div className="ms-1.5 me-4 flex-shrink-0 h-6 w-6 text-indigo-300" aria-hidden="true">
                                {icons[navItem.icon]}
                            </div>
                        }
                        <span className={'mt-[3px] truncate'}>
                            {t(`${navItem.name}`)}
                        </span>
                        {
                            (navItem.answersCount !== null && navItem.answersCount > 0) &&
                            <span
                                className="absolute right-0 mr-3 px-3 py-[2px] rounded-full bg-amber-50 text-gray-600 text-xs leading-4 font-medium">
                                    {navItem.answersCount > 20 ? '20+' : navItem.answersCount}
                                </span>
                        }
                    </Link>
                );
            }
        })
    );
}


function MobileLeftMenu({leftMenu, sidebarOpen, setSidebarOpen}) {
    const {t} = useTranslation('admin')
    return (
        <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog as="div" className="xl:hidden fixed inset-0 flex z-40" onClose={setSidebarOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75"/>
                </Transition.Child>
                <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="-translate-x-full rtl:translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="-translate-x-full rtl:translate-x-full"
                >
                    <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-primary-superdark">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-in-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in-out duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="absolute top-0 end-0 -me-12 pt-2">
                                <button
                                    type="button"
                                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <span className="sr-only">Close sidebar</span>
                                    <XCircleIcon className="h-6 w-6 text-white" aria-hidden="true"/>
                                </button>
                            </div>
                        </Transition.Child>
                        <div className="flex-shrink-0 flex items-center px-4">
                            <Link href={route("admin.dashboard")} className={'flex gap-3 items-center'}>
                                <Logo/>
                                <h1 className={'text-white truncate'}>
                                    {t("guild")}
                                </h1>
                            </Link>
                        </div>
                        <div className="mt-5 flex-1 h-0 overflow-y-auto">
                            <nav className="px-2 space-y-1">
                                <NavItems items={leftMenu}/>
                            </nav>
                        </div>
                    </div>
                </Transition.Child>
                <div className="flex-shrink-0 w-14" aria-hidden="true">
                    {/* Dummy element to force sidebar to shrink to fit close icon */}
                </div>
            </Dialog>
        </Transition.Root>
    )
}

function DesktopLeftMenu({leftMenu, setSidebarOpen, sidebarOpen}) {
    const {t} = useTranslation('admin')


    return (
        <div className="hidden xl:flex bg-primary-superdark flex-shrink-0">
            <div className={clsx("transition-[width] overflow-hidden ", !sidebarOpen ? "w-[74px]" : "w-64")}>
                <div className={"flex flex-col"}>
                    <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto overflow-x-hidden">
                        {
                            sidebarOpen ? (
                                <>
                                    <button onClick={() => setSidebarOpen(!sidebarOpen)}
                                            className={'flex gap-6 items-center px-4'}>
                                        <Logo/>
                                        <h1 className={'text-white truncate'}>
                                            {t("guild")}
                                        </h1>
                                    </button>
                                    <div className="mt-5 flex-1 flex flex-col">
                                        <nav className="flex-1 px-2 space-y-1">
                                            <NavItems items={leftMenu}/>
                                        </nav>
                                    </div>
                                </>
                            ) : (
                                <div className={'flex flex-col items-center gap-1'}>
                                    <button onClick={() => setSidebarOpen(!sidebarOpen)}
                                            className={'flex items-center px-4 mb-5'}>
                                        <Logo/>
                                    </button>
                                    <nav className={'contents'}>
                                        {
                                            leftMenu.map(item => {
                                                const classNames = item.current ? (
                                                    'bg-white/[15%] text-white'
                                                ) : (
                                                    item.active === undefined || item.active ? (
                                                        'text-indigo-100 hover:bg-white/10'
                                                    ) : (
                                                        'text-gray-500 cursor-default'
                                                    )
                                                )
                                                return (
                                                    <Link
                                                        key={item.name}
                                                        href={item.href}
                                                        className={`items-start px-2 py-2 text-sm font-medium rounded-md ${classNames}`}
                                                        onClick={() => {
                                                            item.action()
                                                        }}
                                                    >
                                                        {
                                                            item.icon &&
                                                            <div
                                                                className="flex-shrink-0 h-6 w-6 text-indigo-300"
                                                                aria-hidden="true">
                                                                {icons[item.icon]}
                                                            </div>
                                                        }
                                                    </Link>
                                                )
                                            })
                                        }
                                    </nav>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

function TopHeader({setSidebarOpen, userMenu, user, children}) {
    const {t} = useTranslation('common')
    return (
        <div className="flex flex-col w-0 flex-1 overflow-hidden h-full">
            <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
                <button
                    type="button"
                    className="xl:hidden px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-dark"
                    onClick={() => setSidebarOpen(true)}
                >
                    <span className="sr-only">Open sidebar</span>
                    {/*<MenuAlt2Icon className="h-6 w-6" aria-hidden="true"/>*/}
                    <img
                        className="block h-8 w-auto"
                        src="/img/logo-mobile.svg"
                        alt="guild"
                    />
                </button>
                <div className="flex-1 px-4 flex justify-between">

                    <header className="flex-1 flex w-full">
                        {/*<h1*/}
                        {/*  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-2 text-xl md:text-3xl font-bold leading-tight text-gray-900 text-center flex items-center">{state.pageHeader}</h1>*/}
                    </header>

                    <div className="gap-4 flex items-center md:gap-6">
                        <LanguageSelector/>
                        <Menu as="div" className="relative">
                            <div>
                                <Menu.Button
                                    className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 z-50">
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src={user.avatar ? user.avatar : '/img/no-user-photo.jpg'}
                                        alt=""
                                    />
                                </Menu.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items
                                    className="origin-top-right absolute end-0 mt-2 w-min lg:min-w-[200px] rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    {userMenu.map((item) => (
                                        <Menu.Item key={item.name}>
                                            {({active}) => (
                                                <Link
                                                    href={item.href}
                                                    className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700`}
                                                >
                                                    {t(`common:${item.name}`)}
                                                </Link>
                                            )}
                                        </Menu.Item>
                                    ))}
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                </div>
            </div>
            {children}
        </div>
    )
}

function Logo({className, ...props}) {
    return (
        <svg className={clsx(className, 'h-10 w-auto shrink-0')} width="40" height="40" viewBox="0 0 40 40"
             fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="39" height="39" stroke="white"/>
            <path
                d="M17.4126 32.4376C17.6127 31.9367 17.7081 31.4021 17.6932 30.865C17.7237 29.3764 18.1329 27.9184 18.8843 26.621C19.6338 25.3258 20.7026 24.2321 21.9947 23.438C22.4731 23.1885 22.8945 22.8473 23.2333 22.4349C23.5721 22.0225 23.8214 21.5476 23.966 21.0389C24.1107 20.5301 24.1476 19.9982 24.0747 19.4751C24.0017 18.9521 23.8204 18.4489 23.5416 17.996C23.1693 17.391 22.6334 16.895 21.9947 16.565C21.6285 16.318 21.2767 16.052 20.9414 15.767L20.1011 14.967C18.5612 13.3932 17.6977 11.3071 17.687 9.135C17.7029 8.59777 17.608 8.06288 17.4079 7.56188C17.2077 7.06089 16.9064 6.60395 16.5216 6.218C16.1386 5.83249 15.6797 5.52595 15.1721 5.31668C14.6646 5.10742 14.1189 4.99971 13.5676 5C13.0166 5.00076 12.4714 5.10894 11.9642 5.31815C11.4569 5.52735 10.998 5.83334 10.6146 6.218C10.2305 6.60462 9.92964 7.06183 9.72954 7.56287C9.52944 8.06391 9.43413 8.59872 9.44919 9.136C9.45818 9.83344 9.65576 10.5163 10.0221 11.116C10.3872 11.7147 10.9084 12.209 11.5331 12.549C14.0623 14.105 15.8222 17.08 15.8222 20.006C15.816 22.1592 14.9689 24.2298 13.4524 25.799L11.5392 27.451C10.9149 27.79 10.3934 28.284 10.0272 28.884C9.66005 29.483 9.46359 30.167 9.45433 30.865C9.4386 31.4022 9.5336 31.9371 9.73374 32.438C9.93389 32.939 10.2351 33.396 10.6197 33.782C11.0028 34.1674 11.4618 34.4739 11.9693 34.6832C12.4768 34.8924 13.0225 35.0002 13.5738 35C14.1249 34.9994 14.6703 34.8913 15.1777 34.682C15.6852 34.4728 16.1442 34.1668 16.5278 33.782C16.9117 33.3955 17.2125 32.9384 17.4126 32.4376Z"
                fill="white"/>
            <path
                d="M22.9996 11.36C22.546 10.698 22.3043 9.919 22.3043 9.123C22.305 8.05673 22.7394 7.034 23.5128 6.278C24.1853 5.62024 25.0723 5.2105 26.0216 5.11909C26.9708 5.02768 27.9232 5.26028 28.7154 5.777C29.3939 6.2199 29.9222 6.84836 30.2335 7.583C30.5449 8.31848 30.6262 9.12692 30.4672 9.9071C30.3082 10.6873 29.916 11.4045 29.3397 11.969C28.7652 12.5319 28.0311 12.9156 27.2312 13.0711C26.4314 13.2266 25.602 13.1468 24.849 12.842C24.0952 12.5369 23.4516 12.0211 22.9996 11.36Z"
                fill="white"/>
            <path
                d="M24.1362 27.518C24.814 27.076 25.6111 26.84 26.4258 26.84V26.838C26.9673 26.8386 27.5033 26.9432 28.0032 27.1457C28.5031 27.3482 28.9569 27.6446 29.3387 28.018C30.0134 28.6779 30.433 29.544 30.5267 30.47C30.6204 31.3959 30.3824 32.3249 29.853 33.1C29.401 33.762 28.757 34.2785 28.0026 34.584C27.2495 34.8888 26.4202 34.9686 25.6203 34.8131C24.8204 34.6576 24.0864 34.2739 23.5118 33.711C22.9353 33.1464 22.543 32.429 22.384 31.6486C22.225 30.8683 22.3064 30.0596 22.618 29.324C22.9294 28.5894 23.4577 27.9609 24.1362 27.518Z"
                fill="white"/>
            <path
                d="M36.2764 17.758C36.7288 18.4198 36.9705 19.1974 36.9707 19.9931C36.97 21.0597 36.5355 22.0827 35.7621 22.839C35.3802 23.2122 34.9264 23.5086 34.4265 23.7111C33.9267 23.9136 33.3907 24.0182 32.8492 24.019C32.0337 24.019 31.2366 23.783 30.5596 23.341C29.8811 22.8981 29.3528 22.2696 29.0414 21.535C28.7298 20.7994 28.6484 19.9907 28.8074 19.2104C28.9664 18.43 29.3587 17.7126 29.9353 17.148C30.5099 16.5849 31.2441 16.2011 32.0442 16.0456C32.8443 15.8901 33.6739 15.9699 34.427 16.275C35.1809 16.5804 35.8246 17.0966 36.2764 17.758Z"
                fill="white"/>
            <path
                d="M4.8597 16.647C5.53753 16.205 6.33364 15.969 7.1493 15.969C7.69068 15.9701 8.22653 16.075 8.72618 16.2776C9.22583 16.4803 9.67948 16.7767 10.0612 17.15C10.7355 17.8097 11.155 18.6754 11.2487 19.601C11.3424 20.5265 11.1046 21.4552 10.5755 22.23C10.1236 22.8914 9.47995 23.4075 8.7261 23.713C7.97281 24.0164 7.14381 24.0953 6.34428 23.9399C5.54475 23.7845 4.81073 23.4017 4.23536 22.84C3.65905 22.2755 3.26684 21.5583 3.10785 20.7781C2.94886 19.9979 3.03014 19.1895 3.34153 18.454C3.65276 17.719 4.18107 17.0902 4.8597 16.647Z"
                fill="white"/>
        </svg>
    )
}
