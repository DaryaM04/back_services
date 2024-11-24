import InputError from '@/Components/InputError.jsx';
import {Head, router, useForm} from '@inertiajs/react';
import React, {Fragment} from "react";
import {useTranslation} from "react-i18next";
import {FormTable} from "@/Components/Form/FormTable.jsx";
import {CaptionCell} from "@/Components/Form/CaptionCell.jsx";
import {ValueCell} from "@/Components/Form/ValueCell.jsx";
import {ActionsContainer} from "@/Components/Form/ActionsContainer.jsx";
import Page, {ActionButton, CancelButton} from "@/Components/AdminPages/Page.jsx";
import Header from "@/Components/AdminPages/Header.jsx";
import {
    OptionItemErrorText,
    OptionItemInputField,
    OptionItemName,
    OptionItemNameWithError,
    OptionItemSwitchField
} from "@/Components/AdminPages/OptionsList.jsx";
import Select from "react-select";

export default function editService({service, services}) {
    console.log(services)
    const service_options = services.map(service => ({
        id: service.id,
        value: service.id,
        label: service.name,
    }))
    const {t} = useTranslation(['admin', 'common'])
    const {data, setData, post, patch, put, processing, errors, reset} = useForm({
        name: service?.name ?? '',
        name_ru: service?.name_ru ?? "",
        name_he: service?.name_he ?? "",
        name_ar: service?.name_ar ?? "",
        parent_id: service?.parent_id || null,
        active: service?.active ?? false,
        global_active: service?.global_active ?? false,
    });

    const submit = (e) => {
        e.preventDefault();
        console.log(data)
        if (service?.id)
            put(route('admin.services.update', service.id))
        else
            post(route('admin.services.store'));
    };

    const casual_translation_fields = [
        { form_key: "name",},
        { form_key: "name_ru",},
        { form_key: "name_he",},
        { form_key: "name_ar",}
    ]

    return (
        <Page>
            <Header title={!service?.id
                ? t('services.create')
                : t('services.edit')}
                    className='flex justify-center'
            />
            <Head title="Create Service"/>

            <form onSubmit={submit}>
                <FormTable>
                    <CaptionCell>
                        <OptionItemNameWithError error={errors.name}>
                            {t('services.field_name') + ' *'}
                        </OptionItemNameWithError>
                    </CaptionCell>
                    <ValueCell>
                        {
                            casual_translation_fields.map(({form_key}) => (
                              <Fragment key={form_key}>
                                  <OptionItemNameWithError error={errors[form_key]}>
                                      {t(`services.${form_key}`) + " *"}
                                  </OptionItemNameWithError>
                                  <OptionItemInputField
                                    className={`mb-2 ${errors[form_key] ? 'border-red-500' : ''}`}
                                    value={data[form_key]}
                                    onChange={e => setData(form_key, e)}
                                    placeholder={t("services.enterName")}
                                  />
                                  <OptionItemErrorText errorText={errors[form_key]}/>
                              </Fragment>
                            ))
                        }
                    </ValueCell>

                    <CaptionCell>
                        <OptionItemNameWithError error={errors.parent_id}>
                            {t('services.parent')}
                        </OptionItemNameWithError>
                    </CaptionCell>
                    <ValueCell>
                        <Select
                            placeholder={t('services.selectService')}
                            options={service_options}
                            value={service_options.find(service => service.id === data.parent_id)}
                            onChange={item => setData('parent_id', item?.id ?? null)}
                            className="flex-1 shadow-sm block mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 border-gray-300 rounded-md"
                            isClearable={true}
                            styles={{
                                input: base => ({
                                    ...base,
                                    "input:focus": {
                                        boxShadow: "none"
                                    }
                                })
                            }}
                            theme={(theme) => ({
                                ...theme,
                                borderRadius: 5,
                                colors: {
                                    ...theme.colors,
                                    primary25: '#BFDBFE',
                                    primary: '#1D4ED8',
                                },
                            })}
                        />
                        <InputError message={errors.parent_id} className="mt-2"/>
                    </ValueCell>

                    <CaptionCell>
                        <OptionItemName>{t('common:active')}</OptionItemName>
                    </CaptionCell>
                    <ValueCell>
                        <OptionItemSwitchField
                            className=""
                            value={data.active}
                            onChange={(e) => setData('active', e)}
                        />
                    </ValueCell>
                </FormTable>

                <ActionsContainer>
                    <CancelButton className='' label={t('common:action.cancel')}
                                  onClick={() => router.get(route("admin.services.index"))}/>
                    <ActionButton className='' label={t('common:action.save')} onClick={submit}/>
                </ActionsContainer>
            </form>
        </Page>
    )
        ;
}
