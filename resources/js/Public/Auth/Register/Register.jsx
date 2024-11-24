import React, {useEffect} from 'react';
import {
    OptionItem,
    OptionItemErrorText,
    OptionItemInputPasswordField,
    OptionItemName,
    OptionsList
} from "@/Components/AdminPages/OptionsList.jsx";
import {SigninButton} from "@/Components/AdminPages/Page.jsx"
import {Head, Link, useForm} from '@inertiajs/react';
import {useTranslation} from "react-i18next";
import PhoneInput from "@/Components/PhoneInput.jsx";
import {Header} from "@/Public/Auth/Components/Header.jsx";
import {Subheader} from "@/Public/Auth/Components/Subheader.jsx";
import {ContentWrapper} from "@/Public/Auth/Components/ContentWrapper.jsx";

export default function Register() {
    const { data, setData, post, processing, errors, reset} = useForm({
        phone: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register.sendCode'));
    };
    const { t } = useTranslation('public');

    return (
        <>
            <Head title="Register" />
            <Header>
                {t("Registration")}
            </Header>
            <Subheader>
                {t("DoYouAlreadyHaveAnAccount")}
                &nbsp;
                <Link href={route('login')}
                      className="text-blue-700 hover:text-blue-800">
                    {t("LogIn")}
                </Link>
            </Subheader>
            <ContentWrapper>
                <form className='space-y-6' onSubmit={submit}>
                    <OptionsList>
                        <OptionItem>
                            <OptionItemName className={errors.phone ? 'text-red-500' : '' + 'text-sm'}>{t("Phone")}</OptionItemName>
                            <PhoneInput phone={data.phone} setPhone={phone => setData('phone', phone)}/>
                            <OptionItemErrorText errorText={errors.phone} />
                        </OptionItem>
                        <OptionItem>
                            <SigninButton onClick={submit} label={t("Register")} />
                        </OptionItem>
                    </OptionsList>
                </form>
            </ContentWrapper>
        </>
    );
}

// passwords

