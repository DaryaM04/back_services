import {useTranslation} from "react-i18next";
import {
  OptionItem,
  OptionItemErrorText,
  OptionItemInputPasswordField,
  OptionItemNameWithError,
  OptionsList
} from "@/Components/AdminPages/OptionsList.jsx";
import {SigninButton} from "@/Components/AdminPages/Page.jsx";
import React from "react";
import {useForm} from "@inertiajs/react";
import RecoveryLayout from "@/Public/Auth/Recovery/RecoveryLayout.jsx";

export default function Verified() {
  const {data, setData, errors, post} = useForm({
    password: '',
    password_confirmation: '',
  });
  const {t} = useTranslation('public')
  const savePassword = () => {
    post(route('recovery.save'));
  }
  return (
    <RecoveryLayout>
      <OptionsList>
        <OptionItem>
          <OptionItemNameWithError error={errors.password}>
            {t("Password")}
          </OptionItemNameWithError>
          <OptionItemInputPasswordField
            className={`w-full ${errors.password ? 'border-red-500' : ''}`}
            value={data.password}
            onChange={(e) => setData("password", e)}/>
          <OptionItemErrorText errorText={errors.password}/>
        </OptionItem>
        <OptionItem>
          <OptionItemNameWithError error={errors.password}>
            {t("RepeatPassword")}
          </OptionItemNameWithError>
          <OptionItemInputPasswordField
            className="w-full"
            value={data.password_confirmation}
            onChange={(e) => setData("password_confirmation", e)}/>
          <OptionItemErrorText errorText={errors.password_confirmation}/>
        </OptionItem>
        <OptionItem>
          <SigninButton onClick={savePassword} label={t("SavePassword")}/>
        </OptionItem>
      </OptionsList>
    </RecoveryLayout>
  )
}
