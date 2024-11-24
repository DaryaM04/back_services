import React, {useState} from "react";
import {router, useForm, usePage} from '@inertiajs/react';
import Header from "../../Components/AdminPages/Header.jsx";
import {useTranslation} from "react-i18next";
import Page, {ActionButton, CancelButton} from '../../Components/AdminPages/Page';
import {
    OptionItem, OptionItemCheckboxField,
    OptionItemErrorText,
    OptionItemInputEmailField,
    OptionItemInputField,
    OptionItemInputPasswordField,
    OptionItemName, OptionItemNameWithError, OptionItemRadioField,
    OptionItemSwitchField, OptionsList
} from '../../Components/AdminPages/OptionsList';
import {FormTable} from "@/Components/Form/FormTable.jsx";
import {CaptionCell} from "@/Components/Form/CaptionCell.jsx";
import {ValueCell} from "@/Components/Form/ValueCell.jsx";
import {clsx} from "clsx";
import {ActionsContainer} from "@/Components/Form/ActionsContainer.jsx";
import AvatarDropzone from "@/Components/Form/AvatarDropzone.jsx";
import Select from "react-select";
import PhoneInput from "@/Components/PhoneInput.jsx";


export default function EditUser({user, services, cities}) {
    console.log("props", usePage().props)
    console.log("received", user, services, cities)
    const cityOptions = cities.map(city => (
        {
            id: city.id,
            value: city.id,
            label: city.name
        }
    ))
    const {auth, errors} = usePage().props;

    const {t} = useTranslation(['admin', 'common']);

    const {data, setData} = useForm({
        id: user?.id ?? null,
        profileType: {
            'App\\Models\\CompanyProfile': 'company',
            'App\\Models\\UserProfile': 'user',
        }[user?.profile_type] ?? 'user',
        name: user?.profile?.name ?? "",
        first_name: user?.profile?.first_name ?? "",
        last_name: user?.profile?.last_name ?? "",
        email: user?.email ?? "",
        phone: user?.phone ?? "",
        photo: user?.profile?.photo ?? "",
        password: user?.password ?? "",
        password_confirmation: user?.password_confirmation ?? "",
        admin: (user?.roles ? (user?.roles?.at(0)?.name === 'admin') : null) ?? false,
        active: user?.status === "active",
        has_brigade: user?.profile?.has_brigade ?? false,
        city_id: user?.profile?.city_id ?? null,
        services: user?.profile?.services?.map(service => service.id) ?? [],
        is_verified: user?.profile?.is_verified ?? false
    })
    console.log("data", data)

    const passwordsMatch = () => data?.password === data?.password_confirmation;
    const [userImg, setUserImg] = useState(user?.profile?.photo);

    const onUserImgChange = (file) => {
        setData("photo", file);
        const reader = new FileReader();
        reader.onload = function (ev) {
            setUserImg(ev.target.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSave = () => {
        data.status = data.active ? 'active' : 'blocked';
        console.log('sending', data)
        if (user?.id) {
            router.post(route("admin.users.update", user.id), {...data, _method: "put"});
        } else {
            router.post(route("admin.users.store"), {...data});
        }
    }

    const onChangeCategory = (service) => {
        if (!data.services.find(item => item === service)) {
            setData("services", [...data.services, service]);
        } else {
            setData("services", data.services.filter(item => item !== service))
        }
    }
    console.log("errors", errors)
    const onProfileTypeChange = (type) => {
        if (user?.id)
            return;
        setData("profileType", type);
    }

    return (
        <Page>
            <Header title={!user?.id
                ? t('user.create')
                : t('user.edit')}
                    className='flex justify-center'
            />
            <FormTable>

                <CaptionCell>
                    <OptionItemNameWithError error={errors.profileType}>
                        {t('user.profileType')}
                    </OptionItemNameWithError>
                </CaptionCell>
                <ValueCell>
                    {
                        user?.id ? (
                            {
                                user: <OptionItemName>{t('common:user_type.private')}</OptionItemName>,
                                company: <OptionItemName>{t('common:user_type.company')}</OptionItemName>,
                            }[data.profileType]
                        ) : (
                            <>
                                <OptionItemRadioField disabled={user?.id} checked={data.profileType === 'user'}
                                                      name="typeAccount" label={t('common:user_type.private')}
                                                      onChange={() => onProfileTypeChange('user')}/>
                                <OptionItemRadioField disabled={user?.id} checked={data.profileType === 'company'}
                                                      name="typeAccount" label={t('common:user_type.company')}
                                                      onChange={() => onProfileTypeChange('company')}/>
                                <OptionItemErrorText errorText={errors.profileType}/>
                            </>
                        )
                    }
                </ValueCell>
                {
                    {
                        'company':
                            <>
                                <CaptionCell>
                                    <OptionItemNameWithError error={errors.name}>
                                        {t('user.company_name')} *
                                    </OptionItemNameWithError>
                                </CaptionCell>
                                <ValueCell>
                                    <OptionItemInputField value={data.name}
                                                          onChange={(e) => setData("name", e)}/>
                                    <OptionItemErrorText errorText={errors.name}/>
                                </ValueCell>
                            </>
                        , 'user':
                            <>
                                <CaptionCell>
                                    <OptionItemNameWithError error={errors.first_name || errors.last_name}>
                                        {t('admin:user.name')} *
                                    </OptionItemNameWithError>
                                </CaptionCell>
                                <ValueCell>
                                    <OptionItemNameWithError error={errors.first_name}>
                                        {t('common:private_props.firstname')}
                                    </OptionItemNameWithError>
                                    <OptionItemInputField value={data.first_name}
                                                          onChange={(e) => setData("first_name", e)}
                                                          className="mb-2"/>
                                    <OptionItemErrorText errorText={errors.first_name}/>

                                    <OptionItemNameWithError error={errors.last_name}>
                                        {t('common:private_props.lastname')}
                                    </OptionItemNameWithError>
                                    <OptionItemInputField value={data.last_name}
                                                          onChange={(e) => setData("last_name", e)}/>
                                    <OptionItemErrorText errorText={errors.last_name}/>
                                </ValueCell>

                                <CaptionCell>
                                    <OptionItemName>
                                        {t('user.has_brigade')}
                                    </OptionItemName>
                                </CaptionCell>
                                <ValueCell>
                                    <OptionItemSwitchField value={data.has_brigade}
                                                           onChange={checked => setData('has_brigade', checked)}/>
                                </ValueCell>
                            </>
                    }[data.profileType]
                }

                <CaptionCell>
                    <OptionItemNameWithError error={errors.phone}>
                        {t('user.phone')} *
                    </OptionItemNameWithError>
                </CaptionCell>
                <ValueCell>
                    <div className={'max-w-[420px]'}>
                        <PhoneInput phone={data.phone} setPhone={phone => setData('phone', phone)}/>
                        <OptionItemErrorText errorText={errors.phone}/>
                    </div>
                </ValueCell>

                <CaptionCell>
                    <OptionItemNameWithError error={errors.email}>
                        {t('user.email')}
                    </OptionItemNameWithError>
                </CaptionCell>
                <ValueCell>
                    <div className={'max-w-[420px]'}>
                        <OptionItemInputEmailField
                            className={`w-full ${errors.name ? 'border-red-500' : ''}`}
                            value={data.email}
                            onChange={(e) => setData("email", e)}
                        />
                        <OptionItemErrorText errorText={errors.email}/>
                    </div>
                </ValueCell>


                <CaptionCell>
                    <OptionItemNameWithError error={errors.password}>
                        {t('user.password')}
                        {user?.id ? '' : '*'}
                    </OptionItemNameWithError>
                </CaptionCell>
                <ValueCell>
                    <div className="max-w-[420px] mt-1 sm:mt-0 sm:col-span-2 border-gray-300 rounded-md">
                        <OptionItemInputPasswordField
                            value={data.password}
                            placeholder={t("user.password")}
                            onChange={(e) => setData("password", e)}
                            className={clsx(
                                !passwordsMatch() ? "border-red-300" : "border-gray-300",
                                // errors.password ? 'border-red-500' : '',
                                "shadow-sm block w-full mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 border-gray-300 rounded-md"
                            )}
                        />
                        <OptionItemErrorText errorText={errors.password}/>
                    </div>
                </ValueCell>

                <CaptionCell>
                    <OptionItemNameWithError error={errors.password}>
                        {t('user.repeatPassword')}
                        {user?.id ? '' : '*'}
                    </OptionItemNameWithError>
                </CaptionCell>
                <ValueCell>
                    <div className="max-w-[420px] mt-1 sm:mt-0 sm:col-span-2 border-gray-300 rounded-md">
                        <OptionItemInputPasswordField
                            value={data.password_confirmation}
                            placeholder={t("user.repeatPassword")}
                            onChange={(e) => setData("password_confirmation", e)}
                            className={clsx(
                                !passwordsMatch() ? "border-error" : "border-gray-300", errors.password ? 'border-error' : '',
                                "shadow-sm block w-full mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 border-gray-300 rounded-md"
                            )}
                        />
                        <OptionItemErrorText errorText={errors.password}/>
                    </div>
                    {/* {!passwordsMatch() && (<OptionItemErrorText errorText={errors.password} />)} */}
                </ValueCell>

                <CaptionCell>
                    <div className={'flex justify-start items-center gap-2'}>
                        <OptionItemNameWithError error={errors.city_id}
                                                 className={errors.name ? 'text-red-500' : ''}>
                            {t("common:city")} *
                        </OptionItemNameWithError>
                        <div className={"tooltip white"}>
                            <svg className='iconHover' width="16" height="16" viewBox="0 0 14 14"
                                 fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" fill="#9CA3AF"
                                      d="M14 7C14 10.866 10.866 14 7 14C3.13401 14 0 10.866 0 7C0 3.13401 3.13401 0 7 0C10.866 0 14 3.13401 14 7ZM7.00001 4.375C6.67724 4.375 6.39415 4.54931 6.24154 4.81314C5.99956 5.23144 5.4643 5.37438 5.046 5.13241C4.62769 4.89043 4.48475 4.35517 4.72673 3.93686C5.17928 3.15453 6.02729 2.625 7.00001 2.625C8.44976 2.625 9.62501 3.80025 9.62501 5.25C9.62501 6.39294 8.89456 7.36528 7.87501 7.72563V7.875C7.87501 8.35825 7.48326 8.75 7.00001 8.75C6.51676 8.75 6.12501 8.35825 6.12501 7.875V7C6.12501 6.51675 6.51676 6.125 7.00001 6.125C7.48326 6.125 7.87501 5.73325 7.87501 5.25C7.87501 4.76675 7.48326 4.375 7.00001 4.375ZM7 11.375C7.48325 11.375 7.875 10.9832 7.875 10.5C7.875 10.0168 7.48325 9.625 7 9.625C6.51675 9.625 6.125 10.0168 6.125 10.5C6.125 10.9832 6.51675 11.375 7 11.375Z"
                                />
                            </svg>
                            <div className="tooltiptext text-sm !w-[300px]">
                                {t('common:chooseClosestCity')}
                            </div>
                        </div>
                    </div>
                </CaptionCell>
                <ValueCell>
                    <div className={'max-w-[420px]'}>
                        <Select
                            placeholder={t('common:select')}
                            options={cityOptions}
                            value={cityOptions.find(e => e.id === data.city_id)}
                            onChange={e => setData('city_id', e?.id)}
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
                        <OptionItemErrorText errorText={errors.city_id}/>
                    </div>
                </ValueCell>

                <CaptionCell>
                    <OptionItemName>{t('user.image')}</OptionItemName>
                </CaptionCell>
                <ValueCell>
                    <AvatarDropzone
                        handleFile={onUserImgChange}
                        image={userImg}
                    />
                </ValueCell>


                {auth.user.id !== user?.id ? (
                    <>
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
                    </>
                ) : null}

                <CaptionCell>
                    <OptionItemName>{t('user.administrator')}</OptionItemName>
                </CaptionCell>
                <ValueCell>
                    <OptionItemSwitchField
                        className=""
                        value={data.admin}
                        onChange={(e) => {
                            setData('admin', e);
                            errors.admin = '';
                        }}
                    />
                </ValueCell>

                <CaptionCell>
                    <OptionItemName>{t('user.is_verified')}</OptionItemName>
                </CaptionCell>
                <ValueCell>
                    <OptionItemSwitchField
                      value={data.is_verified}
                      onChange={v => setData('is_verified', v)}
                    />
                </ValueCell>

                <CaptionCell>
                    <OptionItemNameWithError error={errors.services}>
                        {t("common:ServiceCategories")} *
                    </OptionItemNameWithError>
                </CaptionCell>
                <ValueCell>
                    <OptionsList>
                        {services.map((service) => {
                            return <OptionItem className="flex justify-between items-center" key={service.id}>
                                <OptionItemCheckboxField
                                    checked={data.services.includes(service.id)}
                                    label={service.name} onChange={() => onChangeCategory(service.id)}/>
                            </OptionItem>
                        })}
                    </OptionsList>
                    <OptionItemErrorText errorText={errors.services}/>
                </ValueCell>
            </FormTable>

            <ActionsContainer>
                <CancelButton className='' label={t('common:action.cancel')}
                              onClick={() => router.get(route("admin.users.index"))}/>
                <ActionButton className='' label={t('common:action.save')} onClick={handleSave}/>
            </ActionsContainer>
        </Page>
    );
}
