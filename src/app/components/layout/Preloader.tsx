"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [statusText, setStatusText] = useState("INITIALIZING SYSTEM...");

    useEffect(() => {
        let interval: NodeJS.Timeout;

        const handleLoad = () => {
            clearInterval(interval);
            setProgress(100);

            setTimeout(() => setIsLoading(false), 800);
        };

        interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 90) {
                    return 90;
                }
                const increment = Math.floor(Math.random() * 5) + 1;
                return Math.min(prev + increment, 90);
            });
        }, 50);

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
        }

        return () => {
            clearInterval(interval);
            window.removeEventListener('load', handleLoad);
        };
    }, []);

    useEffect(() => {
        if (progress < 30) setStatusText("LOADING MODULES...");
        else if (progress < 60) setStatusText("VERIFYING ENCRYPTION...");
        else if (progress < 90) setStatusText("CONNECTING DATABASE...");
        else if (progress >= 100) setStatusText("ACCESS GRANTED");
    }, [progress]);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030014] overflow-hidden"
                    exit={{
                        y: '-100%',
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                    }}
                >
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />

                    <div className="relative flex flex-col items-center z-10">

                        <div className="relative w-40 h-40 mb-10 flex items-center justify-center">

                            <motion.div
                                className="absolute inset-0 border-[3px] border-electric-violet/20 rounded-full border-t-electric-violet border-r-transparent"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />

                            <motion.div
                                className="absolute inset-4 border-[3px] border-neon-cyan/20 rounded-full border-b-neon-cyan border-l-transparent"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            />

                            <motion.div
                                className="absolute w-20 h-20 bg-electric-violet/10 rounded-full blur-xl"
                                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />

                            <span className="font-mono text-4xl font-bold text-white tracking-tighter relative z-10">
                                {progress}<span className="text-sm text-gray-500">%</span>
                            </span>
                        </div>

                        <div className="h-8 overflow-hidden flex items-center">
                            <motion.p
                                key={statusText}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                className="font-mono text-xs md:text-sm tracking-[0.3em] text-neon-cyan uppercase glow-text"
                            >
                                {statusText}
                            </motion.p>
                        </div>

                        <div className="w-64 h-[2px] bg-white/10 rounded-full mt-8 overflow-hidden relative">
                            <motion.div
                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-electric-violet to-neon-cyan transition-all duration-300 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                            <motion.div
                                className="absolute top-0 left-0 h-full w-20 bg-white/50 blur-[5px]"
                                animate={{ x: ['-100%', '300%'] }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                        </div>

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;