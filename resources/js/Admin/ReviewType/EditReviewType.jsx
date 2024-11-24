import {router, useForm, usePage} from "@inertiajs/react";
import {nanoid} from "nanoid";
import {useTranslation} from "react-i18next";
import Page, {ActionButton, CancelButton} from "@/Components/AdminPages/Page.jsx";
import Header from "@/Components/AdminPages/Header.jsx";
import {FormTable} from "@/Components/Form/FormTable.jsx";
import {CaptionCell} from "@/Components/Form/CaptionCell.jsx";
import {
    OptionItemErrorText,
    OptionItemInputField,
    OptionItemName, OptionItemNameWithError,
    OptionItemSwitchField
} from "@/Components/AdminPages/OptionsList.jsx";
import {ValueCell} from "@/Components/Form/ValueCell.jsx";
import Select from "react-select";
import {ActionsContainer} from "@/Components/Form/ActionsContainer.jsx";
import React, {Fragment} from "react";
import {useReviewTypeTypes} from "@/Admin/ReviewType/UseReviewTypeTypes.jsx";
import {useProfileTypes} from "@/Admin/ReviewType/UseProfileTypes.jsx";
import {ListContainer} from "@/Admin/ReviewType/List/ListContainer.jsx";
import {ListItem} from "@/Admin/ReviewType/List/ListItem.jsx";
import {ActiveItem} from "@/Admin/ReviewType/List/ActiveItem.jsx";
import {DeletableItem} from "@/Admin/ReviewType/List/DeletableItem.jsx";
import {EditableItem} from "@/Admin/ReviewType/List/EditableItem.jsx";
import {AddItem} from "@/Admin/ReviewType/List/AddItem.jsx";
import {clsx} from "clsx";


const useReviewTypeForm = (reviewType) => {
    const {mapper: profileTypeMapper} = useProfileTypes()
    const {mapper: reviewTypeMapper, types: reviewType_types} = useReviewTypeTypes()
    const form = useForm({
        name: reviewType?.name ?? "",
        name_ru: reviewType?.name_ru ?? "",
        name_he: reviewType?.name_he ?? "",
        name_ar: reviewType?.name_ar ?? "",
        active: reviewType?.active ?? false,
        type: reviewTypeMapper[reviewType?.type],
        values: reviewType?.values ?? [],
        profile_type: reviewType?.profile_type.map(pt => profileTypeMapper[pt]) ?? []
    })
    const {data, setData} = form
    const addValue = (value_translations) => {
        const review_type_value = {
            id: "local " + nanoid(),
            ...value_translations,
            active: true
        }
        setData('values', [review_type_value, ...data.values])
    }
    const setValue = (newValue) => {
        const {id} = newValue
        setData('values', data.values.map(rtv => rtv.id === id ? newValue : rtv))
    }
    const deleteValue = (id) => {
        setData('values', data.values.filter(rtv => rtv.id !== id))
    }
    return {...form, addValue, setValue, deleteValue}
}


export default function EditReviewType({reviewType}) {
    console.log("canon", reviewType)
    const {t} = useTranslation(['admin', 'common'])
    const {types: profile_types} = useProfileTypes()
    const {types: reviewType_types} = useReviewTypeTypes()

    const {errors} = usePage().props;
    const {
        data, setData,
        addValue, setValue, deleteValue
    } = useReviewTypeForm(reviewType)

    const casual_translation_fields = [
        { form_key: "name",},
        { form_key: "name_ru",},
        { form_key: "name_he",},
        { form_key: "name_ar",}
    ]

    const handleSave = () => {
        const preparedData = {
            ...data,
            values: data.values.map(item =>
                typeof item.id === 'string' && item.id.startsWith('local') ? {...item, id: null} : item),
            profile_type: data.profile_type.map(({value}) => value),
            type: data.type?.value
        }
        console.log(preparedData)
        if (reviewType?.id)
            router.put(route("admin.review-type.update", reviewType.id), preparedData)
        else
            router.post(route("admin.review-type.store"), preparedData)
    }

    return (
        <Page>
            <Header title={!reviewType?.id
                ? t('reviewTypes.add')
                : t('reviewTypes.edit')}
                    className='flex justify-center'
            />
            <FormTable>
                <CaptionCell>
                    <OptionItemNameWithError error={errors.title}>
                        {t('reviewTypes.headers.name') + " *"}
                    </OptionItemNameWithError>
                </CaptionCell>
                <ValueCell>
                    {
                        casual_translation_fields.map(({form_key}) => (
                          <Fragment key={form_key}>
                              <OptionItemNameWithError error={errors[form_key]}>
                                  {t(`reviewTypes.${form_key}`) + " *"}
                              </OptionItemNameWithError>
                              <OptionItemInputField
                                className={`mb-2 ${errors[form_key] ? 'border-red-500' : ''}`}
                                value={data[form_key]}
                                onChange={e => setData(form_key, e)}
                                placeholder={t("reviewTypes.enterName")}
                              />
                              <OptionItemErrorText errorText={errors[form_key]}/>
                          </Fragment>
                        ))
                    }
                </ValueCell>
                {/*<ValueCell>*/}
                {/*    <OptionItemInputField*/}
                {/*        className={`${errors.name ? 'border-red-500' : ''}`}*/}
                {/*        value={data.name}*/}
                {/*        onChange={(e) => setData("name", e)}*/}
                {/*        placeholder={t("reviewTypes.enterName")}*/}
                {/*    />*/}
                {/*    <OptionItemErrorText errorText={errors.name}/>*/}
                {/*</ValueCell>*/}

                <CaptionCell>
                    <OptionItemNameWithError error={errors.type}>
                        {t("reviewTypes.headers.type") + ' *'}
                    </OptionItemNameWithError>
                </CaptionCell>
                <ValueCell>
                    <div className={errors.type ? '' : ''}>
                        <Select
                            placeholder={t('common:select')}
                            value={data.type}
                            options={reviewType_types}
                            onChange={type => {
                                setData('type', type)
                            }}
                            className={clsx("flex-1 shadow-sm block mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 border-gray-300 rounded-md", errors.type && 'border rounded-lg border-red-500')}
                            styles={{
                                input: base => ({
                                    ...base,
                                    "input:focus": {
                                        boxShadow: "none"
                                    }
                                }),
                                placeholder: defaultStyles => {
                                    return {
                                        ...defaultStyles,
                                        color: '#4B5563',
                                    }
                                }
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
                    </div>
                    <OptionItemErrorText errorText={errors.type}/>
                </ValueCell>

                <CaptionCell>
                    <div className={'flex justify-start items-center gap-2'}>
                        <OptionItemNameWithError error={errors.profile_type}>
                            {t("reviewTypes.headers.profile_type")} *
                        </OptionItemNameWithError>
                        <div className={"tooltip white"}>
                            <svg className='iconHover' width="16" height="16" viewBox="0 0 14 14"
                                 fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" fill="#9CA3AF"
                                      d="M14 7C14 10.866 10.866 14 7 14C3.13401 14 0 10.866 0 7C0 3.13401 3.13401 0 7 0C10.866 0 14 3.13401 14 7ZM7.00001 4.375C6.67724 4.375 6.39415 4.54931 6.24154 4.81314C5.99956 5.23144 5.4643 5.37438 5.046 5.13241C4.62769 4.89043 4.48475 4.35517 4.72673 3.93686C5.17928 3.15453 6.02729 2.625 7.00001 2.625C8.44976 2.625 9.62501 3.80025 9.62501 5.25C9.62501 6.39294 8.89456 7.36528 7.87501 7.72563V7.875C7.87501 8.35825 7.48326 8.75 7.00001 8.75C6.51676 8.75 6.12501 8.35825 6.12501 7.875V7C6.12501 6.51675 6.51676 6.125 7.00001 6.125C7.48326 6.125 7.87501 5.73325 7.87501 5.25C7.87501 4.76675 7.48326 4.375 7.00001 4.375ZM7 11.375C7.48325 11.375 7.875 10.9832 7.875 10.5C7.875 10.0168 7.48325 9.625 7 9.625C6.51675 9.625 6.125 10.0168 6.125 10.5C6.125 10.9832 6.51675 11.375 7 11.375Z"
                                />
                            </svg>
                            <div className="tooltiptext text-sm !w-[300px]">
                                {t('reviewTypes.specifyProfileType')}
                            </div>
                        </div>
                    </div>
                </CaptionCell>
                <ValueCell>
                    <Select
                        placeholder={t('common:select')}
                        value={data.profile_type}
                        options={profile_types}
                        isMulti
                        onChange={profile_type => {
                            setData('profile_type', profile_type)
                        }}
                        className={clsx("flex-1 shadow-sm block mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 border-gray-300 rounded-md", errors.profile_type && 'border rounded-lg border-red-500')}
                        styles={{
                            input: base => ({
                                ...base,
                                "input:focus": {
                                    boxShadow: "none"
                                }
                            }),
                            placeholder: defaultStyles => {
                                return {
                                    ...defaultStyles,
                                    color: '#4B5563',
                                }
                            }
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
                    <OptionItemErrorText errorText={errors.profile_type}/>
                </ValueCell>

                <CaptionCell>
                    <OptionItemNameWithError error={errors.name}>
                        {t('reviewTypes.headers.name') + " *"}
                    </OptionItemNameWithError>
                </CaptionCell>
                <ValueCell>
                    <OptionItemInputField
                        className={`${errors.name ? 'border-red-500' : ''}`}
                        value={data.name}
                        onChange={(e) => setData("name", e)}
                        placeholder={t("reviewTypes.enterName")}
                    />
                    <OptionItemErrorText errorText={errors.name}/>
                </ValueCell>

                <CaptionCell>
                    <OptionItemName>
                        {t('common:active')}
                    </OptionItemName>
                </CaptionCell>
                <ValueCell>
                    <OptionItemSwitchField
                        value={data.active}
                        onChange={(e) => setData('active', e)}
                    />
                    <OptionItemErrorText errorText={errors.active}/>
                </ValueCell>

                <CaptionCell>
                    <OptionItemNameWithError error={errors.values}>
                        {t('reviewTypes.values')} *
                    </OptionItemNameWithError>
                </CaptionCell>
                <ValueCell>
                    <ListContainer className={errors.values && 'border-red-500'}>
                        <ListItem>
                            <AddItem submit={value_translations => addValue(value_translations)}/>
                        </ListItem>
                        {data.values.map((item) => {
                            console.log("item is", item)
                            return (
                              <ListItem key={item.id}>
                                  {
                                      typeof item.id === "string" && item.id.startsWith('local') ? (
                                          <DeletableItem onDelete={() => deleteValue(item.id)}/>
                                      ) : null
                                  }
                                  <ActiveItem isActive={item.active} onChange={active => setValue({...item, active})}/>
                                  <EditableItem submit={value => setValue({...item, value})} initialText={item.value}>
                                      {item.value}
                                  </EditableItem>
                                  <EditableItem submit={value_ru => setValue({...item, value_ru})}
                                                initialText={item.value_ru}>
                                      {item.value_ru}
                                  </EditableItem>
                                  <EditableItem submit={value_he => setValue({...item, value_he})}
                                                initialText={item.value_he}>
                                      {item.value_he}
                                  </EditableItem>
                                  <EditableItem submit={value_ar => setValue({...item, value_ar})}
                                                initialText={item.value_ar}>
                                      {item.value_ar}
                                  </EditableItem>
                              </ListItem>
                            );
                        })}
                    </ListContainer>
                    <OptionItemErrorText errorText={errors.values}/>
                </ValueCell>
            </FormTable>
            <ActionsContainer>
                <CancelButton className='' label={t('common:action.cancel')}
                              onClick={() => router.get(route("admin.review-type.index"))}/>
                <ActionButton className='' label={t('common:action.save')} onClick={handleSave}/>
            </ActionsContainer>
        </Page>
    )
}

