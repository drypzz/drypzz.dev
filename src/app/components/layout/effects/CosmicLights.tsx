"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CosmicLights = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    if (isMobile) {
        return (
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-40">
                <div className="absolute top-[-5%] left-[-10%] w-[300px] h-[300px] rounded-full bg-electric-violet blur-[90px]" />
                <div className="absolute bottom-[-5%] right-[-10%] w-[300px] h-[300px] rounded-full bg-neon-cyan blur-[90px]" />
            </div>
        );
    }
    const transitionSettings = {
        duration: 25,
        repeat: Infinity,
        ease: "easeInOut",
    };

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            <motion.div
                className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full bg-electric-violet mix-blend-screen blur-[120px]"
                animate={{
                    x: ["0vw", "80vw", "0vw"],
                    y: ["0vh", "80vh", "0vh"],
                    scale: [1, 2, 1],
                    opacity: [0.3, 0, 0.3],
                }}
                transition={transitionSettings}
            />

            <motion.div
                className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full bg-neon-cyan mix-blend-screen blur-[120px]"
                animate={{
                    x: ["0vw", "-80vw", "0vw"],
                    y: ["0vh", "-80vh", "0vh"],
                    scale: [1, 2, 1],
                    opacity: [0.3, 0, 0.3],
                }}
                transition={{
                    ...transitionSettings,
                    delay: 2,
                }}
            />

            <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-electric-violet mix-blend-screen blur-[100px]"
                animate={{
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0.1, 0.25, 0.1],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </div>
    );
};

export default CosmicLights;