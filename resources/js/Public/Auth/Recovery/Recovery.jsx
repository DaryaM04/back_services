import {useTranslation} from "react-i18next";
import {OptionItem, OptionItemErrorText, OptionItemName, OptionsList} from "@/Components/AdminPages/OptionsList.jsx";
import PhoneInput from "@/Components/PhoneInput.jsx";
import {SigninButton} from "@/Components/AdminPages/Page.jsx";
import React from "react";
import {useForm} from "@inertiajs/react";
import RecoveryLayout from "@/Public/Auth/Recovery/RecoveryLayout.jsx";

export default function Recovery() {
  const {data, setData, errors, post}  = useForm({
    phone: '',
  });
  const {t} = useTranslation('public');
  const sendSms = () => {
    post(route('recovery.sendSMS'));
  }
  return (
    <RecoveryLayout>
      <OptionsList>
        <OptionItem>
          <OptionItemName
            className={errors.phone ? 'text-red-500' : '' + 'text-sm'}>{t('Phone')}</OptionItemName>
          <PhoneInput phone={data.phone}
                      setPhone={phone => setData('phone', phone)}/>
          <OptionItemErrorText errorText={errors.phone}/>
        </OptionItem>
        <OptionItem>
          <SigninButton onClick={sendSms} label={t("SendSMS")}/>
        </OptionItem>
      </OptionsList>
    </RecoveryLayout>
  )
}
