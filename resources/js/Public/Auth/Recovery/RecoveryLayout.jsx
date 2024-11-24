import {Head} from "@inertiajs/react";
import React from "react";
import {useTranslation} from "react-i18next";
import {Header} from "@/Public/Auth/Components/Header.jsx";
import {ContentWrapper} from "@/Public/Auth/Components/ContentWrapper.jsx";

export default function RecoveryLayout({children}) {
  const {t} = useTranslation('public');
  return (
    <>
        <Head title={t('Recovery')}/>
        <Header>
            {t('Recovery')}
        </Header>
        <ContentWrapper>
            {children}
        </ContentWrapper>
    </>
  )
}
