"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";

export default function NotFound() {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-void text-white">

            <div
                className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")` }}
            />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-electric-violet/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 text-center px-6">

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center mb-6"
                >
                    <div className="p-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-neon-cyan shadow-[0_0_30px_-10px_rgba(6,182,212,0.5)]">
                        <FaExclamationTriangle size={32} />
                    </div>
                </motion.div>

                <div className="relative inline-block">
                    <motion.h1
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        className="text-[150px] md:text-[200px] font-bold font-sans leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-600 select-none"
                    >
                        404
                    </motion.h1>

                    <motion.h1
                        animate={{
                            x: [-2, 2, -2],
                            opacity: [0.5, 0.2, 0.5]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 0.1,
                            repeatType: "mirror"
                        }}
                        className="absolute inset-0 text-[150px] md:text-[200px] font-bold font-sans leading-none tracking-tighter text-electric-violet mix-blend-screen select-none z-[-1] blur-[1px]"
                    >
                        404
                    </motion.h1>
                    <motion.h1
                        animate={{
                            x: [2, -2, 2],
                            opacity: [0.5, 0.2, 0.5]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 0.1,
                            repeatType: "mirror",
                            delay: 0.05
                        }}
                        className="absolute inset-0 text-[150px] md:text-[200px] font-bold font-sans leading-none tracking-tighter text-neon-cyan mix-blend-screen select-none z-[-1] blur-[1px]"
                    >
                        404
                    </motion.h1>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="text-2xl md:text-3xl font-bold font-sans text-white mb-4">
                        Sinal Perdido
                    </h2>
                    <p className="text-gray-400 font-mono text-sm md:text-base max-w-md mx-auto mb-10 leading-relaxed">
                        Parece que você navegou para uma área desconhecida do sistema ou a página foi sugada por um buraco negro.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold font-sans uppercase tracking-widest hover:bg-electric-violet hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(124,58,237,0.5)] rounded-xl group"
                    >
                        <FaHome className="group-hover:-translate-y-0.5 transition-transform" />
                        Retornar à Base
                    </Link>
                </motion.div>

            </div>

            <div className="absolute bottom-8 text-center w-full opacity-30">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500">
                    Error Code: VOID_GENESIS // System Halted
                </p>
            </div>

        </div>
    );
}