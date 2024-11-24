import {router, useForm} from "@inertiajs/react";
import {useTranslation} from "react-i18next";
import Page, {ActionButton, CancelButton} from "@/Components/AdminPages/Page.jsx";
import Header from "@/Components/AdminPages/Header.jsx";
import React, {Fragment} from "react";
import {FormTable} from "@/Components/Form/FormTable.jsx";
import {CaptionCell} from "@/Components/Form/CaptionCell.jsx";
import {
    OptionItemErrorText,
    OptionItemInputField,
    OptionItemName,
    OptionItemNameWithError,
    OptionItemSwitchField
} from "@/Components/AdminPages/OptionsList.jsx";
import {ValueCell} from "@/Components/Form/ValueCell.jsx";
import {ActionsContainer} from "@/Components/Form/ActionsContainer.jsx";

export default function EditCity({city}) {
    const {data, setData, patch, post, processing, errors, reset} = useForm({
        name: city?.name ?? "",
        name_ru: city?.name_ru ?? "",
        name_he: city?.name_he ?? "",
        name_ar: city?.name_ar ?? "",
        active: city?.active ?? false,
    });
    const casual_translation_fields = [
        { form_key: "name",},
        { form_key: "name_ru",},
        { form_key: "name_he",},
        { form_key: "name_ar",}
    ]

    const {t} = useTranslation(['admin', 'common']);

    const submit = (e) => {
        e.preventDefault();

        console.log(data)
        if(city?.id)
            patch(route('admin.cities.update', city.id))
        else
            post(route('admin.cities.store'));
    };
    return (
        <Page>
            <Header title={!city?.id
                ? t('cities.add')
                : t('cities.edit')}
                    className='flex justify-center'
            />
            <FormTable>
                <CaptionCell>
                    <OptionItemName>
                        {t(`cities.field_name`) + " *"}
                    </OptionItemName>
                </CaptionCell>

                <ValueCell>
                    {
                        casual_translation_fields.map(({form_key}) => (
                            <Fragment key={form_key}>
                                <OptionItemNameWithError error={errors[form_key]}>
                                    {t(`cities.${form_key}`) + " *"}
                                </OptionItemNameWithError>
                                <OptionItemInputField
                                    className={`mb-2 ${errors[form_key] ? 'border-red-500' : ''}`}
                                    value={data[form_key]}
                                    onChange={e => setData(form_key, e)}
                                    placeholder={t("cities.enterName")}
                                />
                                <OptionItemErrorText errorText={errors[form_key]}/>
                            </Fragment>
                        ))
                    }
                </ValueCell>

                <CaptionCell>
                    <OptionItemName>{t('table.active')}</OptionItemName>
                </CaptionCell>
                <ValueCell>
                    <OptionItemSwitchField
                        value={data.active}
                        onChange={(e) => setData('active', e)}
                    />
                </ValueCell>
            </FormTable>
            <ActionsContainer>
                <CancelButton className='' label={t('common:action.cancel')}
                              onClick={() => router.get(route("admin.cities.index"))}/>
                <ActionButton className='' label={t('common:action.save')} onClick={submit}/>
            </ActionsContainer>
        </Page>
    )
}
