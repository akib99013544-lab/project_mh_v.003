import React from 'react';
import HeroSection from '../../Components/HomePageComponents/HeroSection';
import ProblemAwareness from '../../Components/HomePageComponents/ProblemAwareness';
import ServicesSection from '../../Components/HomePageComponents/ServicesSection';
import HowItWorks from '../../Components/HomePageComponents/HowItWorks';
import TrustSection from '../../Components/HomePageComponents/TrustSection';
import ResearchTeam from '../../Components/HomePageComponents/ResearchTeam';
import CallToAction from '../../Components/HomePageComponents/CallToAction';

const HomePage = () => {
    return (
        <div>
            <HeroSection></HeroSection>
            <ProblemAwareness></ProblemAwareness>
            <ServicesSection></ServicesSection>
            <HowItWorks></HowItWorks>
            <TrustSection></TrustSection>
            <ResearchTeam></ResearchTeam>
            <CallToAction></CallToAction>
        </div>
    );
};

export default HomePage;