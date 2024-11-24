import InputError from '@/Components/InputError.jsx';
import PrimaryButton from '@/Components/PrimaryButton.jsx';
import TextInput from '@/Components/TextInput.jsx';
import {Head, Link, useForm} from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel.jsx";
import {useTranslation} from "react-i18next";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        code: '',
        password: '',
        password_confirmation: '',
        phone: '',
    });

    const { t } = useTranslation('public');

    const submit = (e) => {
        e.preventDefault();

        post(route('reset.password.complete'));
    };

    return (
        <>
            <Head title={t('Forgot your password?')} />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>

                <div className="mt-4">
                    <InputLabel htmlFor="phone" value={t('Phone')} />

                    <TextInput
                        id="phone"
                        type="tel"
                        name="phone"
                        value={data.phone}
                        className="mt-1 block w-full"
                        autoComplete="phone"
                        onChange={(e) => setData('phone', e.target.value)}
                        required
                    />
                </div>

                <InputError message={errors.phone} className="mt-2" />

                <div className="mt-4">
                    <InputLabel htmlFor="password" value={t('Password')} />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value={t('Confirm Password')} />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="mt-4 place-content-center">
                    <InputLabel htmlFor="code" value={t('Confirm Code')} />

                    <TextInput
                        id="code"
                        type="text"
                        name="code"
                        className="mt-1 block w-full"
                        placeholder={t('Enter a code')}
                        onChange={(e) => setData('code', e.target.value)}
                        required
                    />

                    <InputError message={errors.code} className="mt-2" />

                    <Link
                        href={route('reset.password.code')}
                        as="button"
                        method="post"
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        type="button"
                        data={{phone: data.phone}}
                    >
                        {t('Request code')}
                    </Link>
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ml-4" disabled={processing}>
                        {t('Continue')}
                    </PrimaryButton>
                </div>
            </form>
        </>
    );
}
