import Header from "@/Landing/Blocks/FeatureSection/Header.jsx";
import Features from "@/Landing/Blocks/FeatureSection/Features.jsx";

export default function FeatureSection() {
    return (
        <section className={'min-h-screen py-32 bg-white md:bg-[#F9FAFB]'}>
            <div className={'mx-auto max-w-container px-8 flex flex-col gap-12'}>
                <Header/>
                <Features/>
            </div>
        </section>
    )
}
