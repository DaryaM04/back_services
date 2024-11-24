import Hero from "@/Landing/Blocks/Hero/Hero.jsx";
import FeatureSection from "@/Landing/Blocks/FeatureSection/FeatureSection.jsx";
import AlternativeFeature from "@/Landing/Blocks/AlternativeFeature/AlternativeFeature.jsx";
import Questions from "@/Landing/Blocks/Questions/Questions.jsx";
import CTASection from "@/Landing/Blocks/CTASection/CTASection.jsx";
import Footer from "@/Landing/Blocks/Footer/Footer.jsx";
import Header from "@/Public/Header.jsx";

export default function index() {
    return (
        <>
            <Header/>
            <Hero/>
            <FeatureSection/>
            <Questions/>
            <AlternativeFeature/>
            <CTASection/>
            <Footer/>
        </>
    )
}
