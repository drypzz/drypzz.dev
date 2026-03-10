"use client";

import React from "react";
import dynamic from 'next/dynamic';
import CosmicLights from "./effects/CosmicLights";
import { useSeason } from "@/app/hooks/useSeason";

const CosmicSnowfall = dynamic(() => import('./effects/CosmicSnowfall'), { ssr: false });
const LiquidCursor = dynamic(() => import('./cursor/LiquidCursor'), { ssr: false });

const ClientLayout: React.FC<{ children: React.ReactNode; fonts: string }> = ({ children, fonts }) => {
    const { isChristmas } = useSeason();

    return (
        <body className={`${fonts} antialiased bg-void text-white font-sans selection:bg-electric-violet transition-colors duration-1000`}>

            <LiquidCursor />
            {isChristmas && <CosmicSnowfall />}
            <CosmicLights />

            <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.015] bg-noise" />

            <main className="relative z-10 min-h-screen">
                {children}
            </main>
        </body>
    );
};

export default ClientLayout;