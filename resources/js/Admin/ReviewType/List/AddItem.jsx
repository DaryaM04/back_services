import React, {useState} from "react";
import {PlusIcon} from "@heroicons/react/20/solid/index.js";
import {OptionItemInputField} from "@/Components/AdminPages/OptionsList.jsx";
import {useTranslation} from "react-i18next";

const initial_state = {
  value: "",
  value_ru: "",
  value_he: "",
  value_ar: ""
}
const initial_errors = {
  value: false,
  value_ru: false,
  value_he: false,
  value_ar: false
}

export const AddItem = ({submit}) => {
  const {t} = useTranslation('admin')
    const [text, setText] = useState(initial_state)
    const [errors, setErrors] = useState(initial_errors)
    console.log("text state is", text, typeof text)
    const submitText = () => {
        if (text.value && text.value_ar && text.value_he && text.value_ru) {
            submit(text)
            setText(initial_state)
            setErrors(initial_errors)
        } else {
          const errors = Object.fromEntries(Object.entries(text).map(([key, value]) => {
            return [key, !value]
          }))
          setErrors(errors)
        }
    }
    const setKeyText = (key, value) => {
      setText(prev => ({
        ...prev, [key]: value
      }))
    }
    return (
        <div className={'flex gap-3 items-center'}>
            <button onClick={submitText}
                    className={'shrink-0 rounded-full text-primary w-6 h-6'}>
                <PlusIcon/>
            </button>
            <OptionItemInputField
              className={errors.value ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
              value={text.value}
              placeholder={t('reviewTypes.value_placeholder.value')}
              onChange={e => setKeyText('value', e)}
            />
            <OptionItemInputField
              className={errors.value_ru ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
              value={text.value_ru}
              placeholder={t('reviewTypes.value_placeholder.value_ru')}
              onChange={e => setKeyText('value_ru', e)}
            />
            <OptionItemInputField
              className={errors.value_he ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
              value={text.value_he}
              placeholder={t('reviewTypes.value_placeholder.value_he')}
              onChange={e => setKeyText('value_he', e)}
            />
            <OptionItemInputField
              className={errors.value_ar ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
              value={text.value_ar}
              placeholder={t('reviewTypes.value_placeholder.value_ar')}
              onChange={e => setKeyText('value_ar', e)}
            />
        </div>
    )
}
