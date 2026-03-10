"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CosmicLights = () => {
    const [performanceMode, setPerformanceMode] = useState('high');

    useEffect(() => {
        const checkPerformance = () => {
            const isMobile = window.innerWidth < 768;
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            if (isMobile || prefersReducedMotion) {
                setPerformanceMode('low');
            }
        };

        checkPerformance();
        window.addEventListener("resize", checkPerformance);
        return () => window.removeEventListener("resize", checkPerformance);
    }, []);

    const blobStyle = (color: string) => ({
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
    });

    if (performanceMode === 'low') {
        return (
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
                <div
                    className="absolute top-[-5%] left-[-10%] w-[300px] h-[300px]"
                    style={blobStyle('rgba(138, 43, 226, 0.4)')}
                />
                <div
                    className="absolute bottom-[-5%] right-[-10%] w-[300px] h-[300px]"
                    style={blobStyle('rgba(0, 255, 255, 0.3)')}
                />
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            <motion.div
                className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] md:w-[800px] md:h-[800px] opacity-30"
                style={blobStyle('rgba(138, 43, 226, 0.5)')}
                animate={{
                    x: ["0vw", "40vw", "0vw"],
                    y: ["0vh", "40vh", "0vh"],
                }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />

            <motion.div
                className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] md:w-[800px] md:h-[800px] opacity-30"
                style={blobStyle('rgba(0, 255, 255, 0.4)')}
                animate={{
                    x: ["0vw", "-40vw", "0vw"],
                    y: ["0vh", "-40vh", "0vh"],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 2 }}
            />
        </div>
    );
};

export default CosmicLights;