"use client";

import React from "react";
import { motion } from "framer-motion";

interface LoadingProps {
    fullScreen?: boolean;
    text?: string;
}

const Loading: React.FC<LoadingProps> = ({ fullScreen = true, text = "SYSTEM_INITIALIZING..." }) => {

    const containerClasses = fullScreen
        ? "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030014]/90 backdrop-blur-xl"
        : "w-full h-full min-h-[300px] flex flex-col items-center justify-center bg-transparent";

    return (
        <div className={containerClasses}>
            <div className="relative flex items-center justify-center w-24 h-24 mb-8">

                <motion.div
                    className="absolute inset-0 border-2 border-t-electric-violet border-r-transparent border-b-electric-violet/30 border-l-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                />

                <motion.div
                    className="absolute inset-4 border-2 border-t-transparent border-r-neon-cyan border-b-transparent border-l-neon-cyan/50 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
                />

                <motion.div
                    className="w-4 h-4 bg-white rounded-full shadow-[0_0_20px_#fff]"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                />

                <div className="absolute inset-0 bg-electric-violet/20 blur-[40px] rounded-full animate-pulse" />
            </div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="font-mono text-xs tracking-[0.3em] text-neon-cyan uppercase"
            >
                {text}
                <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                >
                    _
                </motion.span>
            </motion.p>
        </div>
    );
};

export default Loading;