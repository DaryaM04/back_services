import {Head, Link, router} from '@inertiajs/react';
import {BinIcon, EditIcon} from '../Components/Icons/Icons.jsx';
import { useTranslation } from 'react-i18next';
import React, {useContext} from "react";
// import Pagination from "@/Components/Pagination/Pagination.jsx";
import {Header} from "@/User/Components/Header.jsx";
import {PlusButton} from "@/User/Components/PlusButton.jsx";
import {Page} from "@/User/Components/Page.jsx";
import {CommonContext} from "@/reducer.jsx";
import {formatMoney} from "@/User/EditService.jsx";

export default function Services({userServices}) {

  console.log(userServices)

  const {t} = useTranslation(["user", "common"]);

  const {dispatch} = useContext(CommonContext);
  const onItemDelete = (id, text) => {
    dispatch({
      type: 'SHOW_MODAL', payload: {
        action: () => {
          router.delete(route("user.services.destroy", id), {
            // onSuccess: () => setRefresh(new Date())
          })
        },
        text: `${t('common:alert.AreYouSure')} '${text}'?`,
        type: 'delete'
      }
    });
  }

  const {i18n} = useTranslation();

  return (
    <>
      <Head title="Services"/>
      <Page>
        <div className="w-full mx-auto">
          <div className="bg-white overflow-hidden sm:rounded-lg w-full">
            <div className="text-gray-900 flex flex-col items-center justify-center">
              <Header>{t("services.title")}</Header>
              <div className='flex mt-[-10px] w-full justify-end md:pe-[29px]'>
                {/* Кнопка добавления услуги */}
                <PlusButton href={route('user.services.create')}/>
              </div>
              {/* Список услуг */}
              <div className='w-full flex justify-start flex-col items-start my-[6px]'>
                {userServices.sort((a, b) => a.service.name.localeCompare(b.service.name)).map((service) => {

                  const currName =() => {
                    switch (i18n.language) {
                      case "ru":
                        return service.service.name_ru
                      case "he" :
                        return service.service.name_he
                      case "ar" :
                        return service.service.name_ar
                      default:
                        return service.service.name
                    }
                  }

                  return <ServiceElement text={currName()}
                                         onItemDelete={onItemDelete}
                                         id={service.id}
                                         isActive={service.is_active}
                                         isByAgreement={service.is_by_agreement}
                                         isHourlyType={service.is_hourly_type}
                                         isWorkType={service.is_work_type}
                                         hourlyPayment={formatMoney(service.hourly_payment)}
                                         workPayment={formatMoney(service.work_payment)} />
                })}
              </div>
              <div className="px-5 py-3 flex flex-wrap items-center justify-center w-full space-y-2">
                {/*<Pagination />*/}
              </div>
            </div>
          </div>
        </div>
      </Page>
    </>
  );
}

function ServiceElement ({text, workPayment, id, hourlyPayment, isHourlyType, isWorkType, onItemDelete, isActive, isByAgreement}) {
  const {t} = useTranslation(["user", "common"])
  return (
    <div className='shadow-md flex-col md:flex-row border border-[#A6AAB329] my-2 w-full min-h-[4rem] rounded-md flex'>
      <div className='w-full flex-col md:flex-row border-b md:border-b-0 md:border-r border-[#A6AAB329] flex pt-[11px] py-1 md:py-2 md:items-center justify-between'>
        <div className='md:ms-11 mx-4 font-semibold text-sm flex md:items-center'>
          {text}
          <div className='ms-5 hidden md:block'>{isActive ? <></> : <div className='flex items-center justify-center w-[74px] text-[#991B1B] text-[10px] h-5 rounded-full bg-[#FEE2E2]'>{t("common:inactive")}</div>}</div>
        </div>
        <ul className='me-4 md:mx-11 text-sm text-end text-[#374151]'>
          {isByAgreement ? <li className='my-1'>{t("services.edit.paymentAmount.byAgreement")}</li> : <></>}
          {isHourlyType ? <li className='my-1'>{hourlyPayment} ₪/{t("common:calendar.hour")}</li> : <></>}
          {isWorkType ? <li className='my-1'>{workPayment} ₪/{t("common:m2")}<sup>{t("common:2")}</sup></li> : <></>}
        </ul>
      </div>
      <div className='bg-[#F9FAFB] flex items-center rounded-r-md'>
        <div className='h-[41px] flex md:flex-row flex-row-reverse justify-between w-full items-center px-4 md:px-6'>
          <div className="gap-4 flex items-center">
            <Link className="cursor-pointer hover:fill-cyan-50" href={route('user.services.edit', id)}><EditIcon /></Link>
            <button onClick={()=> onItemDelete(id, text)} className="cursor-pointer"><BinIcon /></button>
          </div>
          <div className='md:hidden'>{isActive ? <></> : <div className='flex items-center justify-center w-[74px] text-[#991B1B] text-[10px] h-5 rounded-full bg-[#FEE2E2]'>{t("common:inactive")}</div>}</div>
        </div>
      </div>
    </div>
  )
}
