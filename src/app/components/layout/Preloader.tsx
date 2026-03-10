"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [statusText, setStatusText] = useState("SYSTEM_BOOT_SEQUENCE");

    useEffect(() => {
        setProgress(20);
        setStatusText("REACT_HYDRATION_COMPLETE");

        const handleLoad = async () => {
            if (document.fonts) {
                await document.fonts.ready;
                setProgress(60);
                setStatusText("FONTS_RENDERED_SUCCESSFULLY");
            }

            setTimeout(() => {
                setProgress(100);
                setStatusText("ASSETS_LOADED_SYSTEM_READY");

                setTimeout(() => setIsLoading(false), 800);
            }, 500);
        };

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
        }

        const fallback = setTimeout(() => {
            if (isLoading) handleLoad();
        }, 5000);

        return () => {
            window.removeEventListener('load', handleLoad);
            clearTimeout(fallback);
        };
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-void overflow-hidden"
                    exit={{
                        opacity: 0,
                        scale: 1.05,
                        filter: "blur(10px)",
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                    }}
                >
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-noise" />
                    <motion.div
                        className="absolute left-0 right-0 h-[1px] bg-electric-violet/20 z-0"
                        animate={{ top: ['0%', '100%'] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />

                    <div className="relative flex flex-col items-center z-10">
                        <div className="relative w-40 h-40 mb-10 flex items-center justify-center">
                            <motion.div
                                className="absolute inset-0 border border-dashed border-electric-violet/30 rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            />

                            <div className="flex flex-col items-center">
                                <span className="font-mono text-5xl font-black text-white tracking-tighter">
                                    {progress}
                                </span>
                                <span className="text-[9px] font-mono text-neon-cyan/60 tracking-[0.4em] -mt-1 uppercase">
                                    Loading_Bitrix
                                </span>
                            </div>

                            <div className="absolute inset-0 bg-electric-violet/5 blur-[50px] rounded-full" />
                        </div>

                        <div className="flex flex-col items-center gap-4 w-64">
                            <div className="flex items-center gap-2 w-full">
                                <span className="text-[10px] font-mono text-electric-violet animate-pulse">{'>'}</span>
                                <motion.p
                                    key={statusText}
                                    initial={{ opacity: 0, x: -5 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="font-mono text-[9px] md:text-xs tracking-widest text-neon-cyan uppercase truncate"
                                >
                                    {statusText}
                                </motion.p>
                            </div>

                            <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-electric-violet to-neon-cyan"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.5, ease: "circOut" }}
                                />
                            </div>

                            <div className="flex justify-between w-full opacity-20 font-mono text-[7px] tracking-tighter text-white">
                                <span>ENV: PRODUCTION</span>
                                <span>VER: 4.0.0</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;