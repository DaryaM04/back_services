import {
    OptionItem,
    OptionItemCheckboxField,
    OptionItemFiles,
    OptionItemInputField,
    OptionItemName,
    OptionItemRadioField,
    OptionItemTitle,
    OptionsList
} from "@/Components/AdminPages/OptionsList.jsx";
import {SigninButton} from "@/Components/AdminPages/Page.jsx";
import Select from "react-select";
import {Head, Link, router, useForm} from '@inertiajs/react';
import {useTranslation} from "react-i18next";
import React, {useState} from 'react';
import {Header} from "@/Public/Auth/Components/Header.jsx";
import {Subheader} from "@/Public/Auth/Components/Subheader.jsx";

export default function AfterVerify({languages, services, cities}) {
    const {t} = useTranslation('public');
    const cityOptions = cities.map(city => (
        {
            id: city.id,
            value: city.id,
            label: city.name
        }
    ))
    const langOptions = languages.map(lang => ({
        id: lang.id,
        value: lang.id,
        label: t(`language.${lang.name}`)
    }))
    const {data, setData} = useForm({
        has_brigade: false,
        services: [],
        languages: [],
        profileType: '',
        city_id: null,
        first_name: "",
        last_name: "",
        name: ""
    });
    console.log(data)

    const submit = (e) => {
        e.preventDefault();
        const preparedData = {
            ...data,
        }
        console.log(preparedData)
        router.post(route('after.verify'), preparedData)
    };

    const onChangeCategory = (service) => {

        if (!data.services.find(item => item === service)) {
            setData("services", [...data.services, service]);
        } else {
            setData("services", data.services.filter(item => item !== service))
        }
    }

    return (
        <>
            <Head title={t("DetailedInformation")}/>

            <form className='space-y-6' onSubmit={submit}>
                <h2 className="text-4xl font-extrabold leading-10 mb-4 text-center">
                    {t('DetailedInformation')}
                </h2>
                <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-[28px]'>
                    <OptionsList>
                        <OptionItemTitle>{t("ChooseAnAccountType")}*</OptionItemTitle>
                        <OptionItem>
                            <div className='mb-4 flex gap-4'>
                                <OptionItemRadioField name="typeAccount" label={t('user_type.private')}
                                                      onChange={() => setData("profileType", 'user')}/>
                                <OptionItemRadioField name="typeAccount" label={t('user_type.company')}
                                                      onChange={() => setData("profileType", 'company')}/>
                            </div>
                            <div>
                                {
                                    {
                                        'company':
                                            <div className='mt-3'>
                                                <OptionItemName className="text-sm">{t('company_props.name')} *</OptionItemName>
                                                <OptionItemInputField value={data.name}
                                                                      onChange={(e) => setData("name", e)}/>
                                            </div>,
                                        'user':
                                            <div className='mt-3'>
                                                <OptionItemName className="text-sm">{t('private_props.firstname')} *</OptionItemName>
                                                <OptionItemInputField value={data.first_name}
                                                                      onChange={(e) => setData("first_name", e)}
                                                                      className="mb-2"/>
                                                <OptionItemName className="text-sm">{t('private_props.lastname')} *</OptionItemName>
                                                <OptionItemInputField value={data.last_name}
                                                                      onChange={(e) => setData("last_name", e)}/>
                                            </div>
                                    }[data.profileType]
                                }
                            </div>
                        </OptionItem>

                        <OptionItemTitle>
                            <div className={'flex justify-start items-center gap-2'}>
                                <span>{t("city")} *</span>
                                <div className={"tooltip white"}>
                                    <svg className='iconHover' width="16" height="16" viewBox="0 0 14 14"
                                         fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" fill="#9CA3AF"
                                              d="M14 7C14 10.866 10.866 14 7 14C3.13401 14 0 10.866 0 7C0 3.13401 3.13401 0 7 0C10.866 0 14 3.13401 14 7ZM7.00001 4.375C6.67724 4.375 6.39415 4.54931 6.24154 4.81314C5.99956 5.23144 5.4643 5.37438 5.046 5.13241C4.62769 4.89043 4.48475 4.35517 4.72673 3.93686C5.17928 3.15453 6.02729 2.625 7.00001 2.625C8.44976 2.625 9.62501 3.80025 9.62501 5.25C9.62501 6.39294 8.89456 7.36528 7.87501 7.72563V7.875C7.87501 8.35825 7.48326 8.75 7.00001 8.75C6.51676 8.75 6.12501 8.35825 6.12501 7.875V7C6.12501 6.51675 6.51676 6.125 7.00001 6.125C7.48326 6.125 7.87501 5.73325 7.87501 5.25C7.87501 4.76675 7.48326 4.375 7.00001 4.375ZM7 11.375C7.48325 11.375 7.875 10.9832 7.875 10.5C7.875 10.0168 7.48325 9.625 7 9.625C6.51675 9.625 6.125 10.0168 6.125 10.5C6.125 10.9832 6.51675 11.375 7 11.375Z"
                                        />
                                    </svg>
                                    <div className="tooltiptext text-sm !w-[300px]">
                                        {t('chooseClosestCity')}
                                    </div>
                                </div>
                            </div>
                        </OptionItemTitle>
                        <OptionItem className="pt-1">
                            <Select
                                placeholder={t('select')}
                                options={cityOptions}
                                value={cityOptions.find(e => e.id === data.city_id)}
                                onChange={e => setData('city_id', e?.id ?? null)}
                                className="flex-1 shadow-sm block mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 border-gray-300 rounded-md"
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
                        </OptionItem>

                        <OptionItemTitle>
                            {t('public:languages')} *
                        </OptionItemTitle>
                        <OptionItem className="pt-1">
                            <Select
                                isMulti
                                placeholder={t('select')}
                                options={langOptions}
                                value={langOptions.filter(e => data.languages.includes(e.id))}
                                onChange={e => setData('languages', e.map(e => e.id))}
                                className="flex-1 shadow-sm block mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 border-gray-300 rounded-md"
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
                        </OptionItem>

                        <OptionItemTitle>{t("ProfilePhoto")}</OptionItemTitle>
                        <OptionItem className="pt-1">
                            <OptionItemFiles handleFile={(e) => setData("image", e)}/>
                        </OptionItem>
                        {data.profileType === 'user' ?
                            <>
                                <OptionItemTitle className="mt-6">{t("Brigade")}</OptionItemTitle>
                                <OptionItem className="pt-1">
                                    <OptionItemCheckboxField onChange={(e) => setData("has_brigade", e)}
                                                             label={t("HasBrigade")}/>
                                </OptionItem>
                            </>
                            : ''}
                        <OptionsList>
                            <OptionItemTitle className="pt-3 pb-0">{t("ServiceCategories")} *</OptionItemTitle>
                            {services.map((service) => {
                                return <OptionItem className="flex justify-between items-center" key={service.id}>
                                    <OptionItemCheckboxField
                                        label={service.name} onChange={() => onChangeCategory(service.id)}/>
                                </OptionItem>
                            })}
                        </OptionsList>
                        <OptionItem>
                            <SigninButton onClick={submit} label={t("Continue")}/>
                        </OptionItem>
                    </OptionsList>
                </div>
            </form>
        </>
    );
}
