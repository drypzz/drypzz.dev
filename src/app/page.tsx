import React from "react";
import dynamic from 'next/dynamic';

import ModernHero from "./components/section/hero/ModernHero";
import Preloader from "./components/layout/Preloader";
import { PortfolioTracker } from "./components/analytics/PortfolioTracker";
import ScrollManager from "./components/layout/ScrollManager";

const ModernTechs = dynamic(() => import("./components/section/techs/ModernTechs"), {
    loading: () => <div className="min-h-[50vh] bg-[#030014] animate-pulse" />
});
const ModernProjects = dynamic(() => import("./components/section/projects/ModernProjects"), {
    loading: () => <div className="min-h-screen bg-[#030014] animate-pulse" />
});
const ModernContact = dynamic(() => import("./components/section/contact/ModernContact"));
const ModernFooter = dynamic(() => import("./components/section/footer/ModernFooter"));

const CosmicLights = dynamic(() => import("./components/layout/effects/CosmicLights"), { ssr: false });
const CosmicSnowfall = dynamic(() => import("./components/layout/effects/CosmicSnowfall"), { ssr: false });

export default function Home() {
    return (
        <main className="relative bg-[#030014] text-white overflow-hidden selection:bg-electric-violet/30 selection:text-neon-cyan">
            
            <ScrollManager />
            <Preloader />

            <CosmicLights />
            <CosmicSnowfall />

            <PortfolioTracker />
            
            <div className="relative z-10">
                <ModernHero />

                <div id="techs">
                    <ModernTechs />
                </div>

                <div id="projects">
                    <ModernProjects />
                </div>

                <div id="contact">
                    <ModernContact />
                </div>

                <ModernFooter />
            </div>
        </main>
    );
};