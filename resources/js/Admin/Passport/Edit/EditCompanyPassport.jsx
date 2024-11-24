import {useTranslation} from "react-i18next";
import {router, useForm} from "@inertiajs/react";
import Page, {ActionButton, CancelButton, RedButton} from "@/Components/AdminPages/Page.jsx";
import Header from "@/Components/AdminPages/Header.jsx";
import React from "react";
import {FormTable} from "@/Components/Form/FormTable.jsx";
import {ActionsContainer} from "@/Components/Form/ActionsContainer.jsx";
import {CaptionCell} from "@/Components/Form/CaptionCell.jsx";
import {OptionItemInputField, OptionItemName, OptionItemNameWithError} from "@/Components/AdminPages/OptionsList.jsx";
import {ValueCell} from "@/Components/Form/ValueCell.jsx";
import InputError from "@/Components/InputError.jsx";

const mock = {
    id: 1,
    name: "Albert Mock",
    status: "active",
    profileType: "company",
    company_info: "1235551123",
    founder_id: "3915 152312",
    founder_name: "Globus Abobus"
}

export default function EditCompanyPassport({user}) {
    const {t} = useTranslation(['admin', 'common']);

    const {data, setData, errors} = useForm({
        status: user?.profile?.is_verified ?? 0,
        company_info: user?.profile?.tax_number ?? "",
        founder_id: user?.profile?.options?.founder_id ?? "",
        founder_name: user?.profile?.options?.founder_name ?? "",
    });
    console.log(data)

    return(
        <Page>
            <Header title={!user
                ? t('passport.company.create')
                : t('passport.company.edit')}
                    className='flex justify-center'
            />
            <FormTable>
                <CaptionCell>
                    <OptionItemNameWithError error={errors.company_info}>
                        {t('passport.company.info')}
                    </OptionItemNameWithError>
                </CaptionCell>
                <ValueCell>
                    <OptionItemName>{data.company_info}</OptionItemName>
                </ValueCell>

                <CaptionCell>
                    <OptionItemNameWithError error={errors.founder_name}>
                        {t('passport.company.founder_name')}
                    </OptionItemNameWithError>
                </CaptionCell>
                <ValueCell>
                    <OptionItemName>{data.founder_name}</OptionItemName>
                </ValueCell>

                <CaptionCell>
                    <OptionItemNameWithError error={errors.founder_id}>
                        {t('passport.company.founder_id')}
                    </OptionItemNameWithError>
                </CaptionCell>
                <ValueCell>
                    <OptionItemName>{data.founder_id}</OptionItemName>
                </ValueCell>

            </FormTable>
            <ActionsContainer>
                <CancelButton label={t('admin:actions.cancel')} onClick={() => router.get(route("admin.passport.index"))}/>
                <RedButton label={t('admin:actions.notApprove')} onClick={() => {setData('status', 'verify')}}/>
                <ActionButton label={t('admin:actions.confirm')} onClick={() => {}}/>
            </ActionsContainer>
        </Page>
    )
}
