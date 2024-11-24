import {useTranslation} from "react-i18next";
import {router, useForm} from "@inertiajs/react";
import {CaptionCell} from "@/Components/Form/CaptionCell.jsx";
import {OptionItemInputField, OptionItemName} from "@/Components/AdminPages/OptionsList.jsx";
import {ValueCell} from "@/Components/Form/ValueCell.jsx";
import InputError from "@/Components/InputError.jsx";
import Page, {ActionButton, Button, CancelButton} from "@/Components/AdminPages/Page.jsx";
import Header from "@/Components/AdminPages/Header.jsx";
import {FormTable} from "@/Components/Form/FormTable.jsx";
import {ActionsContainer} from "@/Components/Form/ActionsContainer.jsx";
import React from "react";

export default function ApprovePassport({passport}) {
    const {t} = useTranslation(['admin', 'common']);

    const {data, setData, errors} = useForm({
        name: passport?.name ?? "Alfred Einstein",
        status: passport?.status,
        isCompany: false,
        company_info: "",
        passport_id: passport?.passport_id ?? "12345678",
        passport_image: null,
        passport_video: null
    });
    console.log(data)


    const CompanyFields = () => (
        <>
            <CaptionCell>
                <OptionItemName
                    className={errors.company_info ? 'text-red-500' : ''}>
                    {t('companyInfo') + ' *'}
                </OptionItemName>
            </CaptionCell>
            <ValueCell>
                <OptionItemInputField
                    className={`${errors.company_info ? 'border-red-500' : ''}`}
                    value={data.company_info}
                    placeholder={t('enterCompanyInfo')}
                    onChange={(e) => setData('company_info', e)}
                />
                <InputError message={errors.company_info} className="mt-2"/>
            </ValueCell>
        </>
    )
    const PersonFields = () => (
        <>
            <CaptionCell>
                <OptionItemName
                    className={errors.passport_id ? 'text-red-500' : ''}>
                    {t('passport_id') + ' *'}
                </OptionItemName>
            </CaptionCell>
            <ValueCell>
                <OptionItemInputField
                    className={`${errors.passport_id ? 'border-red-500' : ''}`}
                    value={data.passport_id}
                    disabled={true}
                />
                <InputError message={errors.passport_id} className="mt-2"/>
            </ValueCell>

            <CaptionCell>
                <OptionItemName
                    className={errors.passport_image ? 'text-red-500' : ''}>
                    {t('passport_image') + ' *'}
                </OptionItemName>
            </CaptionCell>
            <ValueCell>
                {
                    data.passport_image ? (
                        <img src={data.passport_image} alt={'passport image'}/>
                    ) : (
                        <span>{t("imageNotProvided")}</span>
                    )
                }
            </ValueCell>

            <CaptionCell>
                <OptionItemName
                    className={errors.passport_video ? 'text-red-500' : ''}>
                    {t('passport_video') + ' *'}
                </OptionItemName>
            </CaptionCell>
            <ValueCell>
                {
                    data.passport_video ? (
                        <video src={data.passport_video}/>
                    ) : (
                        <span>{t("videoNotProvided")}</span>
                    )
                }
            </ValueCell>
        </>
    )

    return (
        <Page>
            <Header title={passport?.id
                ? t('common:createPassport')
                : t('common:editPassport')}
                    className='flex justify-center'
            />
            <FormTable>
                <CaptionCell>
                    <OptionItemName
                        className={errors.name ? 'text-red-500' : ''}>
                        {t('common:name') + ' *'}
                    </OptionItemName>
                </CaptionCell>
                <ValueCell>
                    <OptionItemInputField
                        className={`${errors.name ? 'border-red-500' : ''}`}
                        value={data.name}
                        disabled={true}
                    />
                    <InputError message={errors.name} className="mt-2"/>
                </ValueCell>

                <CaptionCell>
                    <OptionItemName
                        className={errors.name ? 'text-red-500' : ''}>
                        {t('isCompany') + ' *'}
                    </OptionItemName>
                </CaptionCell>
                <ValueCell>
                    <OptionItemInputField value={data.isCompany ? "company" : "not company"} disabled={true}/>
                    {/*<OptionItemSwitchField*/}
                    {/*    className=""*/}
                    {/*    value={data.isCompany}*/}
                    {/*    onChange={(e) => setData('isCompany', e)}*/}
                    {/*/>*/}
                </ValueCell>
                {
                    data.isCompany ? (
                        CompanyFields()
                    ) : (
                        PersonFields()
                    )
                }
            </FormTable>
            <ActionsContainer>
                <CancelButton label={t('common:cancel')} onClick={() => router.get(route("admin.users.index"))}/>
                <Button
                    label={t('common:notApprove')} onClick={() => {}} className={'bg-error text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-error-dark hover:bg-error-dark'}/>
                <ActionButton label={t('common:approve')} onClick={() => {}}/>
            </ActionsContainer>
        </Page>
    )
}
