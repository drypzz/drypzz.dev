"use client";

import React, { useEffect } from "react";

import ModernHero from "./components/section/hero/ModernHero";
import ModernTechs from "./components/section/techs/ModernTechs";
import ModernProjects from "./components/section/projects/ModernProjects";
import ModernContact from "./components/section/contact/ModernContact";
import ModernFooter from "./components/section/footer/ModernFooter";

import Preloader from "./components/layout/Preloader";

export default function Home() {

    useEffect(() => {
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }

        window.scrollTo(0, 0);

        const timer = setTimeout(() => {
            window.scrollTo(0, 0);
        }, 10);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Preloader />
            <div className="flex flex-col w-full selection:bg-neon-cyan selection:text-black">

                <ModernHero />

                <ModernTechs />

                <div className="w-full h-px bg-gradient-to-r from-transparent via-electric-violet/30 to-transparent opacity-50" />

                <ModernProjects />

                <ModernContact />

                <ModernFooter />

            </div>
        </>
    );
};