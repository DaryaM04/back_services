import { OptionItemTextAreaField, OptionItemInputNumberField, OptionItemNameWithError, OptionsList } from '@/Components/AdminPages/OptionsList';
import AvatarDropzone from '@/Components/Form/AvatarDropzone';
import {router, useForm} from "@inertiajs/react";
import { CaptionCell } from '@/Components/Form/CaptionCell';
import { FormTable } from '@/Components/Form/FormTable';
import { ValueCell } from '@/Components/Form/ValueCell';
import {Head} from '@inertiajs/react';
import Select from 'react-select';
import {ActionsContainer} from "@/Components/Form/ActionsContainer.jsx";
import { ActionButton, CancelButton } from "@/Components/AdminPages/Page";
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {Header} from '../Components/Header';
import {Page} from "@/User/Components/Page.jsx";
import InputError from '@/Components/InputError';
import {clsx} from "clsx";

export default function EditPortfolio({services, portfolio}){
    console.log(services)
    const {data, setData, errors = {}, post, put} = useForm({
        id: portfolio?.id ?? null,
        description: portfolio?.description ?? '',
        photo: portfolio?.photo ?? null,
        service_id: portfolio?.service_id ?? null,
        service_name: portfolio?.service_name ?? null,
        price: portfolio?.price ?? 0,
        errors: {},
    });

    console.log('Initial errors:', errors);

    useEffect(() => {
        console.log('Current errors state:', errors);
    }, [errors]);

    const service = services.map((item) => {
        return{
            id: item.id,
            value: item.id,
            label: item.name
        }
    })
    const [imageUrl, setImageUrl] = useState(portfolio?.photo ?? null);

    const [lengthDescription, setLength] = useState(data.description.length)

    const deleteN = () => {
        setData('description', data.description.replace(/\n/g, ' '))
    }

    useEffect(()=>{
        setData('service_name', service.find(e => e.id === data.service_id)?.label);
        console.log('Выбранный service_id:', data.service_id);
        console.log('Найденный элемент:', service.find((e) => e.id === data.service_id));
    
    },[data.service_id])

    useEffect(() => {
        deleteN();
        setLength(data.description.length)
        console.log(data)
    }, [data.description])

    const handleImage = async (file) => {
        setData('photo', file)
        //AJAX запрос для проверки изображения 
        const formData = new FormData();
        formData.append('photo', file);
        console.log(formData);
        try{
            const response = await fetch(route('user.portfolio.validate-photo'), {
                method: 'POST',
                headres: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
                body: formData,
            });

            const result = await response.json();
            if(result.success){
                const reader = new FileReader();
                reader.onload = function (ev) {
                    setImageUrl(ev.target.result);
                };
                reader.readAsDataURL(file); 
                setData('photo', file); //устанавливаем файл после успешной проверки 
                delete errors.photo

            } else{
                setImageUrl(null); //убираем файл в случае ошибки
                console.error(result.message);
            }
        } catch (error) {
            console.error('Ошибка при проверке изображения:', error)
        }
        const reader = new FileReader();
        reader.onload = function (ev) {
            setImageUrl(ev.target.result);
        };
        reader.readAsDataURL(file);
    }

    const handleTitle = async (selectedOption) => {
        console.log('Выбранный service_id:', selectedOption.value);
    
        // Удаляем ошибку сразу после выбора
        setData((prevData) => {
            const { service_name, ...restErrors } = prevData.errors || {};
            const newState = {
                ...prevData,
                service_id: selectedOption.value,
                service_name: selectedOption.label,
                errors: restErrors, // Передаём объект без service_name
            };
            console.log('New State:' , newState);
            return newState;
        });

        // AJAX запрос
        const formData = new FormData();
        formData.append('service_id', selectedOption.value);
    
        try {
            const response = await fetch(route('user.portfolio.validate-service_id'), {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
                body: formData,
            });
    
            const result = await response.json();
            console.log(result);
    
            if (!result.success) {
                // Если запрос вернул ошибку, добавляем её
                setData((prevData) => ({
                    ...prevData,
                    errors: {
                        ...prevData.errors,
                        service_name: result.message,
                    },
                }));
            }
        } catch (error) {
            console.error('Ошибка при проверке услуги:', error);
        }
    };

    const handleSave = () => {
        console.log('Данные перед отправкой:', data);
    
        if (!data.id) {
            post(route('user.portfolio.store'), data);
        } else {
            router.post(route('user.portfolio.update', data.id), { ...data, _method: 'put' });
        }
    };

    const {t} = useTranslation(['common', 'user']);

    return(
        <Page>
            <Head title="EditPortfolio"/>
            <Header>{data.id ? t('user:portfolio.edit') : t('user:portfolio.create')}</Header>
            <FormTable>
                <CaptionCell>
                    <OptionItemNameWithError error={errors.service_name}>
                        {t('user:portfolio.name')  + '*'}
                    </OptionItemNameWithError>
                </CaptionCell>
                <ValueCell>
                    <Select
                        placeholder={t('select')}
                        options={service}
                        value={service.find(e => e.id === data.service_id)}
                        onChange={(selectedOption) => handleTitle(selectedOption)}
                        className={clsx("flex-1 shadow-sm block mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 border-gray-300 rounded-md", errors.service_name && 'border rounded-lg border-red-500')}
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
                        })}/>
                        <InputError message={errors.service_name} className="mt-2"/>
                </ValueCell>
                <CaptionCell>
                    <OptionItemNameWithError error={errors.photo}>
                        {t('user:portfolio.image')  + '*'}
                    </OptionItemNameWithError>
                </CaptionCell>
                <ValueCell>
                    <AvatarDropzone 
                        handleFile={handleImage}
                        image={imageUrl}
                        // value={ csrf_token() }
                       
                    />
                    <InputError message={errors.photo} className="mt-2"/>
                </ValueCell>
                <CaptionCell>
                    {t('user:portfolio.description')}
                </CaptionCell>
                <ValueCell>
                    <OptionItemTextAreaField className={'md:h-40'} value={data.description} onChange={(value) => {setData('description', value)}} maxLength={250}/>
                    <div className='text-xs mt-1'>{t('user:portfolio.max') + ' : ' + lengthDescription}</div>
                </ValueCell>
                <CaptionCell>
                    <OptionItemNameWithError error={errors.price}>
                        {t('user:portfolio.price')}
                    </OptionItemNameWithError>
                </CaptionCell>
                <ValueCell>
                    <div className='flex max-w-[200px] items-center'>
                        <OptionItemInputNumberField value={data.price} onChange={(value) => {setData('price', value)}}/>
                        <span className='text-xl ltr:ml-2 rtl:mr-2'>&#8362;</span>
                    </div>
                </ValueCell>
                
            </FormTable>
            <ActionsContainer>
                    <CancelButton label={t('action.cancel')} onClick={() => {router.get(route('user.portfolio.index'))}}></CancelButton>
                    <ActionButton label={t('action.save')} onClick={handleSave}></ActionButton>
            </ActionsContainer>
        </Page>
    )

}