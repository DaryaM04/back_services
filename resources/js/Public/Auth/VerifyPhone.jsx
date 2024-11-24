import {Head, Link, router, useForm} from '@inertiajs/react';
import { OptionItem, OptionItemName, OptionItemErrorText, OptionsList, OptionItemInputField } from "@/Components/AdminPages/OptionsList.jsx";
import { SigninButton } from "@/Components/AdminPages/Page.jsx"
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";


export default function VerifyPhone({user_phone, code}) {
    const { data, setData, post, processing, errors } = useForm({
        code_confirmation: '',
    });


    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0)
    const [activeTimer, setActiveTimer] = useState(true);
    const { t } = useTranslation('public');

    const timer = () => {
        setActiveTimer(true);

        let startTime = new Date();
        let countTime = 1;
        let stopTime = startTime.setMinutes(startTime.getMinutes() + countTime);

        const interval = setInterval(() => {
            let now = new Date().getTime();

            let remain = stopTime - now;

            setMinutes(Math.floor((remain % (1000 * 60 * 60)) / (1000 * 60)));
            setSeconds(Math.floor((remain % (1000 * 60)) / 1000));


            if (remain < 0) {
                clearInterval(interval);
                setActiveTimer(false);
            }
        }, 1000);
    }

    const resendCode = () => {
        timer()
        post(route('resend.code'));
    }

    useEffect(() => {
        timer();
    }, [])


    const submit = (e) => {
        e.preventDefault();

        post(route('phone.verify'));
    };

    const onChangePhone = () => {
        router.get(route('register'))
    }

    return (
        <>
            <Head title="Phone Verification" />
            <h2 className="text-4xl font-extrabold leading-10 mb-4 text-center">
                {t("NumberConfirmation")}
            </h2>
            <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-[28px]'>
                <form onSubmit={submit}>
                    <OptionsList>
                        <OptionItem>
                            <OptionItemName className="text-var(--gray-dark) text-sm ">{t("CodeSent") + " " + user_phone}</OptionItemName>
                            {
                                code ? (
                                  <OptionItemName className="text-var(--gray-dark) text-sm ">Actually your code is {code}</OptionItemName>
                                ) : null
                            }
                            <OptionItemInputField onChange={(e) => setData("code_confirmation", e)} className={`${errors.code ? 'border-red-500' : ''}`} placeholder={t("EnterCodeFromSMS")} value={data.code_confirmation} />
                            <OptionItemErrorText errorText={errors.code} />
                            {activeTimer ? <OptionItemName className="mt-5 text-gray-600">
                                {t("SendRepeatSms")} {"0" + minutes} : {seconds < 10 ? '0' + seconds : seconds}
                            </OptionItemName> :
                                <span className="block mt-5 text-blue-700 hover:text-blue-800 cursor-pointer" onClick={resendCode}>
                                    {t("SendCodeAgain")}
                                </span>}
                        </OptionItem>
                        <OptionItem>
                            <span className='text-blue-700 cursor-pointer hover:text-blue-800'
                                  onClick={onChangePhone}
                            >{t("ChangePhoneNumber")}</span>
                        </OptionItem>
                        <OptionItem>
                            <SigninButton onClick={submit} className='' label={t("Continue") } />
                        </OptionItem>
                    </OptionsList>
                </form>
            </div>
        </>
    );
}
