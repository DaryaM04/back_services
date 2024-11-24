import {Media} from "@/Landing/Blocks/Hero/Media.jsx";
import {SignUp} from "@/Landing/components/SignUp.jsx";
import {Text} from "@/Landing/Blocks/Hero/Text.jsx";
import {EmailInput} from "@/Landing/components/EmailInput.jsx";
import {SubmitForWhiteBg} from "@/Landing/components/SubmitButton.jsx";

export default function Hero() {
    return (
        <section className={'relative max-w-container mx-auto min-h-[764px] pt-48'}>
            <div className={'hidden md:block absolute bg-gray-50 bottom-[92px] top-[52px] end-0 w-[520px]'}/>
            <div className={'hidden md:block absolute fb-bg bottom-0 top-0 end-0 w-[400px]'}/>
            <div className={'relative px-8 mx-auto flex flex-col items-center md:flex-row gap-8 flex-auto'}>
                <Info/>
                <Media/>
            </div>
        </section>
    )
}

function Info() {
    return (
        <div className={'md:w-1/2 flex flex-col gap-8'}>
            <Text/>
            <div className={'flex flex-col gap-3 md:max-w-128'}>
                <div>
                    Sign up to get notified when it’s ready.
                </div>
                <SignUp>
                    <EmailInput/>
                    <SubmitForWhiteBg/>
                </SignUp>
                <div className={'text-gray-500'}>
                    We care about the protection of your data. Read our <a className={'text-gray-900'}>Privacy Policy</a>.
                </div>
            </div>
        </div>
    )
}

