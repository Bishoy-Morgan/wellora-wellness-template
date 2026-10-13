import { Suspense } from "react";
import HeroSection from "@/src/app/components/HeroSection"
import WellnessAreas from "./components/WellnessAreas";
import WellnessJourney from "./components/WellnessJourney";
import WellnessServices from "./components/WellnessServices";
import WellnessTestimonials from "./components/WellnessTestimonials";
import WellnessContact from "./components/WellnessContact";
import Footer from "./components/Footer";
import Popup from "./components/Popup";


export default function Page() {
    return (
        <div className="overflow-hidden">
            <HeroSection />
            <WellnessAreas />
            <WellnessJourney />
            <WellnessServices />
            <WellnessTestimonials />
            <WellnessContact />
            <Footer />
            <Suspense>
                <Popup />
            </Suspense>
        </div>
    );
}