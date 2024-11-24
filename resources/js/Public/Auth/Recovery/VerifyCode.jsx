import {useTranslation} from "react-i18next";
import useSmsTimeout from "@/Hooks/useSmsTimeout.js";
import {
  OptionItem,
  OptionItemErrorText,
  OptionItemInputField,
  OptionItemName,
  OptionsList
} from "@/Components/AdminPages/OptionsList.jsx";
import {SigninButton} from "@/Components/AdminPages/Page.jsx";
import React from "react";
import {router, useForm} from "@inertiajs/react";
import RecoveryLayout from "@/Public/Auth/Recovery/RecoveryLayout.jsx";

export default function VerifyCode({code, phone}) {
  const {data, setData, post, errors}  = useForm({
    code: ''
  });
  const {t} = useTranslation('public')
  const {run, available, remain} = useSmsTimeout(10)
  const minutes = Math.floor(remain % (60 * 60) / 60)
  const seconds = Math.floor(remain % 60)

  function pad(num) {
    const s = "00" + num
    return s.substring(s.length - 2)
  }

  const onChangePhone = () => {
    post(route('recovery.changePhone'))
  }
  const verify = () => {
    post(route('recovery.verify'));
  }
  const resendCode = () => {
    run()
    router.post(route('recovery.sendSMS'), {phone})
  }
  return (
    <RecoveryLayout>
      <OptionsList>
        <OptionItem>
          <OptionItemName className="text-sm">
            {t("CodeSent")} {phone}
          </OptionItemName>
          {
            code ? (
              <OptionItemName className="text-sm">
                TEST: Actually your code is {code}
              </OptionItemName>
            ) : null
          }
          <OptionItemInputField onChange={(e) => setData("code", e)}
                                className={`${errors.code ? 'border-red-500' : ''}`}
                                placeholder={t("EnterCodeFromSMS")}
                                value={data.code}/>
          <OptionItemErrorText errorText={errors.code}/>
          {
            !available ? (
              <OptionItemName className="mt-5 text-gray-600">
                {t("SendRepeatSms")}
                {pad(minutes, 2)} : {pad(seconds, 2)}
              </OptionItemName>
            ) : (
              <button className="block mt-5 text-blue-700 hover:text-blue-800 cursor-pointer"
                      onClick={resendCode}>
                {t("SendCodeAgain")}
              </button>
            )
          }
        </OptionItem>
        <OptionItem>
          <button className='block text-blue-700 cursor-pointer hover:text-blue-800'
                  onClick={onChangePhone}
          >{t("ChangePhoneNumber")}</button>
        </OptionItem>
        <OptionItem>
          <SigninButton onClick={verify} label={t("ConfirmCode")}/>
        </OptionItem>
      </OptionsList>
    </RecoveryLayout>
  )
}
