import {Page} from "@/User/Components/Page.jsx";
import {useTranslation} from "react-i18next";
import {Header} from "@/User/Components/Header.jsx";
import React from "react";
import {FormTable} from "@/Components/Form/FormTable.jsx";
import {ActionsContainer} from "@/Components/Form/ActionsContainer.jsx";
import {ActionButton, CancelButton} from "@/Components/AdminPages/Page.jsx";
import {router, useForm} from "@inertiajs/react";
import {CaptionCell} from "@/Components/Form/CaptionCell.jsx";
import {OptionItemInputField, OptionItemNameWithError} from "@/Components/AdminPages/OptionsList.jsx";
import {ValueCell} from "@/Components/Form/ValueCell.jsx";
import InputError from "@/Components/InputError.jsx";

export default function CompanyPassport({passport}) {
    const {t} = useTranslation(['user', 'common']);
    const {data, setData, errors, post} = useForm({
        company_info: passport?.company_info ?? "",
        founder_id: passport?.founder_id ?? "",
        founder_name: passport?.founder_name ?? "",
    })
    console.log(data)

    const handleSave = () => {
        post(route('user.passport'))
    }

    return (
        <Page>
            <Header>
                {t('passport.title')}
            </Header>
            <FormTable>

                <CaptionCell>
                    <OptionItemNameWithError error={errors.company_info}>
                        {t('passport.company.company_info')} *
                    </OptionItemNameWithError>
                </CaptionCell>
                <ValueCell>
                    <OptionItemInputField
                        className={`${errors.company_info ? 'border-red-500' : ''}`}
                        value={data.company_info}
                        onChange={value => setData('company_info', value)}
                        placeholder={t('passport.company.company_info_placeholder')}
                    />
                    <InputError message={errors.company_info} className="mt-2"/>
                </ValueCell>

                <CaptionCell>
                    <OptionItemNameWithError error={errors.founder_name}>
                        {t('passport.company.founder_name')} *
                    </OptionItemNameWithError>
                </CaptionCell>
                <ValueCell>
                    <OptionItemInputField
                        className={`${errors.founder_name ? 'border-red-500' : ''}`}
                        value={data.founder_name}
                        onChange={value => setData('founder_name', value)}
                        placeholder={t('passport.company.founder_name')}
                    />
                    <InputError message={errors.founder_name} className="mt-2"/>
                </ValueCell>

                <CaptionCell>
                    <OptionItemNameWithError error={errors.founder_id}>
                        {t('passport.company.founder_id')} *
                    </OptionItemNameWithError>
                </CaptionCell>
                <ValueCell>
                    <OptionItemInputField
                        className={`${errors.founder_id ? 'border-red-500' : ''}`}
                        value={data.founder_id}
                        onChange={value => setData('founder_id', value)}
                        placeholder={t('passport.company.founder_id')}
                    />
                    <InputError message={errors.founder_id} className="mt-2"/>
                </ValueCell>

            </FormTable>
            <ActionsContainer>
                <CancelButton label={t('common:action.cancel')} onClick={() => router.get(route("user.profile"))}/>
                <ActionButton label={t('common:action.save')} onClick={handleSave}/>
            </ActionsContainer>
        </Page>
    )
}
