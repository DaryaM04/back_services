import { useState } from "react";
import {useTranslation} from "react-i18next";
import {router, useForm} from "@inertiajs/react";
import {FormTable} from "@/Components/Form/FormTable.jsx";
import {CaptionCell} from "@/Components/Form/CaptionCell.jsx";
import {OptionItemInputField, OptionItemName, OptionItemNameTooltip, OptionItemNameWithError, OptionItemSwitchField, OptionsList} from "@/Components/AdminPages/OptionsList.jsx";
import {ValueCell} from "@/Components/Form/ValueCell.jsx";
import InputError from "@/Components/InputError.jsx";
import {ActionsContainer} from "@/Components/Form/ActionsContainer.jsx";
import AvatarDropzone from "@/Components/Form/AvatarDropzone.jsx";
import PhoneInput from "@/Components/PhoneInput.jsx";
import Select from 'react-select';
import { ActionButton, CancelButton } from "@/Components/AdminPages/Page";
import { ChevronLeftIcon } from "@heroicons/react/24/outline/index.js";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import BlackTooltip from "@/Components/Tooltip";

const EditWorksheet = (auth) => {
    const passport = {name: 'name'}
    const {t} = useTranslation([ 'common']);
    const languagesValue = [{id: 0, value: 'en', label: 'english'}, {id: 1, value: 'ru', label: 'Русский'}];
    const citiesValue = [{id: 0, value: 'en', label: 'New-York'}, {id: 1, value: 'ru', label: 'Москва'}, {id: 2, value: 'he', label: 'Israel'}, {id: 3, value: 'ar', label: 'Abu-Dabi'}]

    const {data, setData, errors} = useForm({
        name: passport?.name ?? "",
        first_name: '',
        second_name: '',
        profileType: "user",
        phone: '79456541232',
        profile_image: null,
        has_brigade: null,
        hidden: null,
        languages: {id: 0, value: 'en', label: 'english'},
        city_locate: null,
        city_work: null
    });

    const [imageUrl, setImageUrl] = useState(data?.profile_image)

    const handleImage = (file) => {
        const reader = new FileReader();
        reader.onload = function (ev) {
            setImageUrl(ev.target.result);
        };
        reader.readAsDataURL(file);
    }

    return(
        <>
            <div className='flex justify-center'>
                <h2 className='my-6 text-2xl font-bold bg-white-900'>{t('worksheet.editWorksheet')}</h2>
            </div>
            <FormTable>

               
                    {{
                        'company':
                        <>
                            <CaptionCell>
                                <OptionItemNameWithError className="mt-20" /*error={errors.user_id}*/>
                                    {t('company_props.name') + '*'}
                                </OptionItemNameWithError>
                            </CaptionCell>
                            <ValueCell>
                            <OptionItemInputField
                                className={`${errors.name ? 'border-red-500' : ''} mb-5`}
                                value={data.name}
                                onChange={value => setData('name', value)}
                                placeholder={t('company_props.name')}
                            />
                            <InputError message={errors.user_id} className="mt-2"/>
                            </ValueCell>
                        </>,
                        'user':
                        <>
                            <CaptionCell>
                                <OptionItemNameWithError className="mt-20" /*error={errors.user_id}*/>
                                    {t('private_props.fullName') + '*'}
                                </OptionItemNameWithError>
                            </CaptionCell>
                            <ValueCell>
                            <OptionItemInputField
                                className={`${errors.last_name ? 'border-red-500' : ''} mb-5`}
                                value={data.last_name}
                                onChange={value => setData('last_name', value)}
                                placeholder={t('private_props.lastname')}
                            />
                            <InputError message={errors.user_id} className="mt-2"/>
                            <OptionItemInputField
                                className={`${errors.first_name ? 'border-red-500' : ''}`}
                                value={data.first_name}
                                onChange={value => setData('first_name', value)}
                                placeholder={t('private_props.firstname')}
                            />
                            <InputError message={errors.user_id} className="mt-2"/>

                            
                            </ValueCell>
                        </>


                    }[data.profileType]}


                <CaptionCell>
                    <OptionItemNameWithError /*error={errors.user_id}*/>
                        {t('worksheet.languages') + '*'}
                    </OptionItemNameWithError>
                </CaptionCell>

                <ValueCell>
                    <Select
                            placeholder={t('common:select')}
                            options={languagesValue}
                            value = {data.languages}
                            isMulti
                            onChange={e => setData('languages', e.value)}
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
                    <InputError message={errors.user_id} className="mt-2"/>
                </ValueCell>


                <CaptionCell>
                    <OptionItemNameWithError /*error={errors.user_id}*/>
                        {t('worksheet.cityDistrict') + '*'}
                    </OptionItemNameWithError>
                </CaptionCell>

                <ValueCell>
                    <Select
                            placeholder={t('common:select')}
                            value={citiesValue.find(e => e.id === data.city_locate?.id)}
                            options={citiesValue}
                            onChange={e => setData('city_locate', e.value)}
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
                    <InputError message={errors.user_id} className="mt-2"/>
                </ValueCell>


                <CaptionCell>
                    <OptionItemNameWithError /*error={errors.user_id}*/>
                        {t('phone') + '*'}
                    </OptionItemNameWithError>
                </CaptionCell>

                <ValueCell>
                    <PhoneInput phone={data.phone} setPhone={phone => setData('phone', phone)}/>
                </ValueCell>


                <CaptionCell>
                    <OptionItemNameTooltip error={errors.profile_image} className="flex" tooltip={t('worksheet.imageHint')}>
                        <div>{t('worksheet.image')}</div>
                    </OptionItemNameTooltip>
                </CaptionCell>
                <ValueCell>
                    <AvatarDropzone image={imageUrl} handleFile={handleImage}/>
                </ValueCell>


                <CaptionCell>
                    <OptionItemName className={''}>
                            {t('worksheet.hasBrigadge')}
                    </OptionItemName>
                </CaptionCell>

                <ValueCell>
                        <OptionItemSwitchField value={data.has_brigade}
                            onChange={checked => setData('has_brigade', checked)}/>
                </ValueCell>

                <CaptionCell>
                    <OptionItemNameWithError /*error={errors.user_id}*/>
                        {t('worksheet.cityWork')}
                    </OptionItemNameWithError>
                </CaptionCell>

                <ValueCell>
                    <Select
                            placeholder={t('common:select')}
                            isMulti
                            value={citiesValue.find(e => e.id === data.city_work?.id)}
                            options={citiesValue}
                            onChange={e => setData('city_work', e.value)}
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
                    <InputError message={errors.user_id} className="mt-2"/>
                </ValueCell>

                {data.profileType === "user" && <><CaptionCell>
                    <OptionItemNameTooltip className={'flex'} tooltip={t('worksheet.hideHint')}>
                        {t('worksheet.hide')} 
                    </OptionItemNameTooltip>
                </CaptionCell>

                <ValueCell>
                        <OptionItemSwitchField value={data.hidden}
                            onChange={checked => setData('hidden', checked)}/>
                </ValueCell></>}


                <CaptionCell>
                    <OptionItemNameTooltip className="flex" tooltip={t('worksheet.hideHint')}>
                        {t('worksheet.calendar')} 
                    </OptionItemNameTooltip>
                </CaptionCell>

                <ValueCell>
                </ValueCell>
            </FormTable>
            <div className="flex justify-between items-center mt-20">
                <button className="text-blue-600 text-sm" onClick={() => {console.log('Delete')}}>{t('worksheet.deleteProfile')}</button>
                <ActionsContainer>
                    <CancelButton label={t('action.cancel')} onClick={() => {router.get(route('user.profile'))}}></CancelButton>
                    <ActionButton label={t('action.save')} onClick={() => {router.get(route('user.profile'))}}></ActionButton>
                </ActionsContainer>
            </div>
        </>
    )

}

export default EditWorksheet;