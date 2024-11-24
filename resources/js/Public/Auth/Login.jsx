import React, {useEffect} from 'react';
import {Head, Link, useForm} from '@inertiajs/react';
import {useTranslation} from "react-i18next";
import {
    OptionItem,
    OptionItemCheckboxField,
    OptionItemErrorText,
    OptionItemInputPasswordField,
    OptionItemName,
    OptionsList
} from "@/Components/AdminPages/OptionsList.jsx";
import {SigninButton} from "@/Components/AdminPages/Page.jsx"
import PhoneInput from "@/Components/PhoneInput.jsx";

export default function Login({status, canResetPassword}) {
    const {data, setData, post, processing, errors, reset} = useForm({
        phone: '',
        password: '',
        remember: false,
    });


    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    const { t } = useTranslation('public');

    return (
        <>
            <Head title={t('Log in')}/>
            <h2 className="text-4xl font-extrabold leading-10 mb-4 text-center">
                {t("LogIn")}
            </h2>
            <div className='mb-6 text-base text-gray-500 text-center font-medium'>
                {t("YouDoNotHaveAnAccount")}
                <Link href={route('register')}
                    className="text-base text-blue-700 hover:text-blue-800"> {t("public:Registration")}</Link>
            </div>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            <div className='bg-white py-8 shadow sm:rounded-lg sm:px-[28px]'>
                <form className='space-y-6 w-80 md:w-auto'>
                    <OptionsList>
                        <OptionItem>
                            <OptionItemName
                                className={errors.phone ? 'text-red-500' : '' + 'text-sm'}>{t('Phone')}</OptionItemName>
                                <PhoneInput phone={data.phone} setPhone={phone => setData('phone', phone)}/>
                            <OptionItemErrorText errorText={errors.phone}/>
                        </OptionItem>
                        <OptionItem>
                            <OptionItemName
                                className={errors.password ? 'text-red-500' : '' + 'text-sm'}>{t('Password')}</OptionItemName>
                            <OptionItemInputPasswordField
                                className={`w-full ${errors.password ? 'border-red-500' : ''}`}
                                value={data.password}
                                onChange={(e) => setData("password", e)}/>
                            <OptionItemErrorText errorText={errors.password}/>
                        </OptionItem>
                        <OptionItem className="flex justify-between items-start md:items-center md:flex-row -mt-3">
                            <OptionItemCheckboxField checked={data.remember}
                                                     onChange={v => setData("remember", v)}
                                                     label={t('RememberMe')}/>
                            {canResetPassword && (
                                <Link
                                    href={route('recovery.index')}
                                    className="text-sm font-medium text-blue-700  hover:text-blue-800"
                                >
                                    {t("ForgotYourPassword")}
                                </Link>
                            )}
                        </OptionItem>
                        <OptionItem>
                            <SigninButton onClick={submit} label={t("LogIn")} />
                        </OptionItem>
                    </OptionsList>
                </form>
            </div>


        </>
    );
}
