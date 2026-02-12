"use client";

import React from "react";
import dynamic from 'next/dynamic';

import CosmicLights from "./effects/CosmicLights";

import { useSeason } from "@/app/hooks/useSeason";

const CosmicSnowfall = dynamic(() => import('./effects/CosmicSnowfall'), {
    ssr: false,
    loading: () => null
});

const LiquidCursor = dynamic(() => import('./cursor/LiquidCursor'), {
    ssr: false
});

interface ClientLayoutProps {
    children: React.ReactNode;
    fonts: string;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children, fonts }) => {
    const { isChristmas } = useSeason();

    return (
        <body
            suppressHydrationWarning={true}
            className={`${fonts} antialiased bg-void text-white font-sans selection:bg-electric-violet selection:text-white transition-colors duration-1000`}
        >

            <LiquidCursor />

            {isChristmas && <CosmicSnowfall />}

            <CosmicLights />

            <div
                className="fixed inset-0 z-0 pointer-events-none opacity-20 mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")` }}
            />

            <main className="relative z-10 min-h-screen">
                {children}
            </main>
        </body>
    );
};

export default ClientLayout;