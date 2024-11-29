import {Head, router, useForm,} from '@inertiajs/react';
import Select from "react-select";
import {
	OptionItemCheckboxField,
	OptionItemErrorText,
	OptionItemInputNumberField,
	OptionItemNameWithError,
	OptionItemSwitchField
} from '@/Components/AdminPages/OptionsList';
import {ActionButton, CancelButton} from '@/Components/AdminPages/Page';
import {ActionsContainer} from '@/Components/Form/ActionsContainer';
import {useTranslation} from 'react-i18next';
import React, {useEffect} from "react";
import {Page} from "@/User/Components/Page.jsx";
import {Header} from "@/User/Components/Header.jsx";
import {FormTable} from "@/Components/Form/FormTable.jsx";
import {CaptionCell} from "@/Components/Form/CaptionCell.jsx";
import {ValueCell} from "@/Components/Form/ValueCell.jsx";
import {clsx} from "clsx";
import { fromJSON } from 'postcss';

export default function EditService({userService, services}) {
	// console.log(userService);
	// console.log(services);

	const {t} = useTranslation(["user", "common"])

	const {data, setData, errors, put, post} = useForm({
		service_id: userService?.service_id ?? null,
		is_by_agreement: userService?.is_by_agreement ?? false,
		is_hourly_type: userService?.is_hourly_type ?? false,
		is_work_type: userService?.is_work_type ?? false,
		is_active: userService?.is_active ?? false,
		hourly_payment: formatMoney(userService?.hourly_payment) ?? "",
		work_payment: formatMoney(userService?.work_payment) ?? "",
	})

	useEffect(() => {
		if (userService) {
		  setData({
			service_id: userService.service_id ?? null,
			is_by_agreement: userService.is_by_agreement ?? false,
			is_hourly_type: userService.is_hourly_type ?? false,
			is_work_type: userService.is_work_type ?? false,
			is_active: userService.is_active ?? false,
			hourly_payment: formatMoney(userService.hourly_payment) ?? null,
			work_payment: formatMoney(userService.work_payment) ?? null,
		  });
		}
	  }, [userService]);
	

	const currentUrl = window.location.href;
	const isCreating = currentUrl.includes('create');
	const yearOrMonth = [
		{value: 'year', label: t("common:calendar.year")},
		{value: 'month', label: t("common:calendar.month")},
	]

	const options = services?.map(service => (
		{
			id: service.id,
			value: service.id,
			label: service.name
		}
	))

	const submit = async (e) => {
		e.preventDefault(); 
		if (userService?.id) {
			console.log('Updating service:', data);
			router.put(route("user.service.update", userService.id),{...data, _method: "put"});
			console.log('Updating service:', data);
			setData({...data});
		} else {
			router.post(route("user.service.store"), data);
			console.log('Create service:', data);
			setData({...data});
		}
	}

	console.log('Current form data:', data);
	


	// useEffect(() => {
	// 	setData('is_picked', isPicked)
	// }, [data.is_work_type, data.is_hourly_type, data.is_by_agreement]);

	return (<>
		<Head title="Edit Service"/>
		<Page>
			<Header className='my-12'>
				{isCreating ? t("Создание услуги") : t("Редактирование услуги")}
			</Header>
			<FormTable>
				{/*Наименование услуги*/}
				<CaptionCell>
					<OptionItemNameWithError error={errors.service_id}>
						{t("Выберите услугу") + ' *'}
					</OptionItemNameWithError>
				</CaptionCell>
				<ValueCell>
					<Select
						placeholder={t("Наименование услуги") + "..."}
						value={options?.find(service => service.id === data.service_id)}
						options={options}
						className={clsx("flex-1 w-full md:w-[450px] shadow-sm block mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 border-gray-300 rounded-md", errors.service_id && 'border rounded-lg border-red-500')}
						isClearable={true}
						onChange={(e) => {
							setData('service_id', e?.id);
						}}
						noOptionsMessage={() => t("services.edit.noOptions")}
						styles={{
							input: base => ({
								...base, "input:focus": {
									boxShadow: "none"
								}
							})
						}}
					/>
					<OptionItemErrorText errorText={errors.service_id}/>
				</ValueCell>
				{/* Тип и сумма оплаты */}
				<CaptionCell>
					<OptionItemNameWithError error={errors.is_picked || errors.hourly_payment}>
						{t("Условия оплаты")} *
					</OptionItemNameWithError>
				</CaptionCell>
				<ValueCell>
					<ul className='w-full'>
						{/*По договору*/}
						<CheckboxContainer>
							<OptionItemCheckboxField
								checked={data.is_by_agreement}
								label={t("По договоренности")}
								onChange={(e) => {
									setData("is_by_agreement", e)
								}}/>
						</CheckboxContainer>
						{/*Почасовая оплата*/}
						<CheckboxContainer>
							<OptionItemCheckboxField
								checked={data.is_hourly_type}
								label={t("Почасовая оплата")}
								onChange={(e) => {
									setData("is_hourly_type", e)
								}}/>
							<div className='w-44 md:ms-3 my-2 items-center flex'>
								<OptionItemInputNumberField value={data.is_hourly_type ? data.hourly_payment : data.hourly_payment = ''}
								                            min={0}
								                            className={`${errors.hourly_payment ? 'border-red-500' : ''} disabled:bg-gray-50`}
								                            disabled={!data.is_hourly_type}
								                            onChange={(e) => {
									                            setData("hourly_payment", e)
								                            }}/>
								<div className='w-28 ms-4'>{t("common:р/час")}</div>
							</div>
						</CheckboxContainer>
						<OptionItemErrorText errorText={errors.hourly_payment}/>
						{/*Оплата по обьему работ*/}
						<CheckboxContainer>
							<OptionItemCheckboxField
								checked={data.is_work_type}
								label={t("По объему выполненной работы")}
								onChange={(e) => {
									setData("is_work_type", e)
								}}/>
							<div className='w-44 md:w-44 md:ms-4 mt-2 items-center flex'>
								<OptionItemInputNumberField value={data.is_work_type ? data.work_payment : data.work_payment = ''}
								                            disabled={!data.is_work_type}
								                            className={
									                            `${errors.work_payment ? 'border-red-500' : ''} disabled:bg-gray-50`
								                            }
								                            min={0}
								                            max={3}
								                            onChange={(e) => {
									                            setData("work_payment", e)
								                            }}/>
								<div className='w-28 ms-4'>р/{t("common:м")}
									<sup>
										{t("common:2")}
									</sup>
								</div>
							</div>
						</CheckboxContainer>
						<OptionItemErrorText errorText={errors.work_payment}/>
					</ul>
					<OptionItemErrorText errorText={errors.is_picked}/>
				</ValueCell>
				{/*Активность*/}
				<CaptionCell>
					<OptionItemNameWithError>
						{t("Статус активности:")}
					</OptionItemNameWithError>
				</CaptionCell>
				<ValueCell>
					<OptionItemSwitchField value={data.is_active} onChange={(e) => setData("is_active", e)}/>
				</ValueCell>
			</FormTable>
			{/* Блок с кнопками */}
			<ActionsContainer className='items-end'>
				<CancelButton className='' label={t('common:ОТМЕНА')}
				              onClick={() => router.get(route('user.services.index'))}/>
				<ActionButton className='' label={t("common:СОХРАНИТЬ")}
				              onClick={submit}/>
			</ActionsContainer>
		</Page>
	</>);
}

function CheckboxContainer({children}) {
	return (<li className="flex-row md:flex w-full h-auto md:h-10 my-2 items-center">
		{children}
	</li>)
}

export function formatMoney(value) {
	if (typeof value === 'string') {
		value = parseFloat(value);
	}
	return value
}

function SectionItem({children, text, className}) {
	return (<section className={`${className} w-full px-3 py-5 h-auto rounded-md flex`}>
		<div className='md:w-1/4'>
			{/* Наименование услуги */}
			<span className='text-sm sm:text-base'>{text}</span>
		</div>
		{children}
	</section>)
}

