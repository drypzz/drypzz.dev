"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaArrowDown, FaCode, FaHeadset } from "react-icons/fa";

import Typewriter from "../../common/typewriter";

const ModernHero = () => {

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10">

            <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] bg-electric-violet/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen animate-pulse-slow" />
            <div className="absolute bottom-0 right-[-10%] w-[500px] h-[500px] bg-neon-cyan/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none"></div>

            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">

                    <div className="flex-1 text-center lg:text-left">

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neon-cyan font-mono text-xs uppercase tracking-widest mb-6"
                        >
                            <span className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse" />
                            System Online
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-5xl sm:text-6xl md:text-8xl font-bold font-sans tracking-tighter mb-4 min-h-[1.1em] w-full md:w-auto whitespace-nowrap"
                        >
                            <span className="text-white">I am </span>

                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-violet via-white to-neon-cyan inline-block">
                                <Typewriter text='"DRYPZZ"' delay={0.5} />
                            </span>
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col md:flex-row items-center lg:items-start gap-3 md:gap-6 text-gray-400 font-mono text-sm md:text-base mb-8 justify-center lg:justify-start"
                        >
                            <span className="flex items-center gap-2">
                                <span className="text-lg">💼</span>
                                Support Analyst at Zopu
                            </span>
                            <span className="hidden md:block w-1.5 h-1.5 bg-gray-600 rounded-full" />
                            <span className="flex items-center gap-2">
                                <FaCode className="text-neon-cyan text-lg" />
                                Full-Stack Developer
                            </span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
                        >
                            <button
                                onClick={() => scrollToSection('projects')}
                                className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold font-sans uppercase tracking-widest hover:bg-electric-violet hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(124,58,237,0.5)] rounded-xl flex items-center justify-center gap-2 group"
                            >
                                Explorar Projetos
                                <FaArrowDown className="group-hover:translate-y-1 transition-transform" />
                            </button>

                            <button
                                onClick={() => scrollToSection('contact')}
                                className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 text-white font-mono text-xs uppercase tracking-widest hover:bg-white/5 hover:border-white transition-all rounded-xl flex items-center justify-center gap-2"
                            >
                                <FaHeadset /> Entrar em Contato
                            </button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="mt-12 flex items-center gap-6 justify-center lg:justify-start opacity-60"
                        >
                            <a href="https://github.com/drypzz" target="_blank" className="hover:text-electric-violet transition-colors"><FaGithub size={24} /></a>
                            <a href="https://www.linkedin.com/in/gustavoaap/" target="_blank" className="hover:text-neon-cyan transition-colors"><FaLinkedin size={24} /></a>
                        </motion.div>
                    </div>

                    <div className="flex-1 flex justify-center lg:justify-end relative">

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative w-72 h-72 md:w-96 md:h-96"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-[-20px] border border-white/10 rounded-full border-dashed will-change-transform"
                            />

                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-[-10px] border border-electric-violet/30 rounded-full border-t-transparent border-l-transparent will-change-transform"
                            />

                            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/5 shadow-[0_0_60px_rgba(124,58,237,0.3)] z-10 group">
                                <div className="absolute inset-0 bg-electric-violet/20 mix-blend-overlay z-20 group-hover:bg-transparent transition-colors duration-500" />
                                <Image
                                    src="/me.jpeg"
                                    alt="DRYPZZ Profile"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                                    priority
                                />
                            </div>

                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-6 -left-6 bg-[#030014]/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg shadow-xl z-30 will-change-transform"
                            >
                                <span className="text-xs font-mono text-neon-cyan">Bitrix24 Junior</span>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 15, 0] }}
                                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                className="absolute -top-6 -right-6 bg-[#030014]/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg shadow-xl z-30 will-change-transform"
                            >
                                <span className="text-xs font-mono text-electric-violet">React / Next.js</span>
                            </motion.div>

                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ModernHero;