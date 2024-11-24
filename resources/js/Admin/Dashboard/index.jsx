import Page from "@/Components/AdminPages/Page.jsx";
import {Head} from "@inertiajs/react";
import Header from "@/Components/AdminPages/Header.jsx";
import React from "react";
import {useTranslation} from "react-i18next";

export default function index() {
    const {t} = useTranslation(['admin', 'common'])
    return (
        <Page>
            <Head title="Dashboard"/>
            <Header title={t('dashboard')}/>
        </Page>
    )
}
