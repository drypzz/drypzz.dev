"use client";

import React from "react";
import dynamic from 'next/dynamic';
import CosmicLights from "./effects/CosmicLights";
import { useSeason } from "@/app/hooks/useSeason";

const CosmicSnowfall = dynamic(() => import('./effects/CosmicSnowfall'), { ssr: false });
const LiquidCursor = dynamic(() => import('./cursor/LiquidCursor'), { ssr: false });

const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isChristmas } = useSeason();

    return (
        <div className="transition-colors duration-1000 min-h-screen">
            <LiquidCursor />
            {isChristmas && <CosmicSnowfall />}
            <CosmicLights />

            <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.015] bg-noise" />

            <main className="relative z-10 min-h-screen">
                {children}
            </main>
        </div>
    );
};

export default ClientLayout;