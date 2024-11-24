import {SignUp} from "@/Landing/components/SignUp.jsx";
import {EmailInput} from "@/Landing/components/EmailInput.jsx";
import {SubmitForBlackBg} from "@/Landing/components/SubmitButton.jsx";

export default function CTASection() {
    return (
        <section className={'bg-gray-900'}>
            <div className={'max-w-container mx-auto px-8 py-16 text-white flex items-center flex-col sm:flex-row gap-8'}>
                <div>
                    <div className={'text-4xl leading-10 font-extrabold'}>
                        Sign up for our newsletter
                    </div>
                    <div className={'mt-3 leading-8 text-lg text-gray-300'}>
                        Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui Lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat.
                    </div>
                </div>
                <div>
                    <SignUp>
                        <EmailInput/>
                        <SubmitForBlackBg/>
                    </SignUp>
                    <div className={'text-gray-300 mt-3'}>
                        We care about the protection of your data. Read our <a className={'text-white'}>Privacy Policy</a>.
                    </div>
                </div>
            </div>
        </section>
    )
}
