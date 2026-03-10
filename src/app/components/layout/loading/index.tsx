"use client";

import React from "react";
import { motion } from "framer-motion";

interface LoadingProps {
    fullScreen?: boolean;
    text?: string;
}

const Loading: React.FC<LoadingProps> = ({ fullScreen = true, text = "INITIALIZING_SYSTEM" }) => {

    const containerClasses = fullScreen
        ? "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-void/95 backdrop-blur-md"
        : "w-full h-full min-h-[400px] flex flex-col items-center justify-center bg-transparent";

    return (
        <div className={containerClasses}>
            {fullScreen && (
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-noise" />
            )}

            <div className="relative flex items-center justify-center w-32 h-32 mb-10">

                <motion.div
                    className="absolute inset-0 border-2 border-dashed border-electric-violet/30 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, ease: "linear", repeat: Infinity }}
                />

                <motion.div
                    className="absolute inset-2 border-t-2 border-l-2 border-neon-cyan rounded-full shadow-[0_0_15px_rgba(0,255,255,0.3)]"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
                />

                <motion.div
                    className="absolute inset-6 border-b-2 border-r-2 border-electric-violet rounded-full opacity-60"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                />

                <motion.div
                    className="w-2 h-2 bg-white rounded-full z-10 shadow-[0_0_20px_#fff]"
                    animate={{
                        scale: [1, 1.8, 1],
                        opacity: [0.3, 1, 0.3]
                    }}
                    transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                />

                <div className="absolute inset-0 bg-electric-violet/10 blur-[50px] rounded-full animate-pulse" />
            </div>

            <div className="flex flex-col items-center gap-2">
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-mono text-[10px] md:text-xs tracking-[0.5em] text-neon-cyan uppercase flex items-center"
                >
                    <span className="opacity-50 mr-2">[</span>
                    {text}
                    <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="ml-1 bg-neon-cyan w-2 h-3"
                    />
                    <span className="opacity-50 ml-1">]</span>
                </motion.p>

                <div className="w-32 h-[1px] bg-white/5 overflow-hidden relative">
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-electric-violet to-transparent"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Loading;