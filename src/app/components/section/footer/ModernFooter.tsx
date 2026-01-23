"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaArrowUp, FaInstagram, FaFacebook } from "react-icons/fa";

const ModernFooter = () => {

    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const socialLinks = [
        { name: "GitHub", url: "https://github.com/drypzz", icon: <FaGithub /> },
        { name: "LinkedIn", url: "https://www.linkedin.com/in/gustavoaap/", icon: <FaLinkedin /> },
        { name: "Instagram", url: "https://www.instagram.com/_gustavoaap", icon: <FaInstagram /> },
        { name: "Facebook", url: "https://www.facebook.com/igustavoaap", icon: <FaFacebook /> },
    ];

    return (
        <footer className="relative pt-20 pb-10 overflow-hidden border-t border-white/5">

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-electric-violet/5 blur-[120px] rounded-full pointer-events-none hidden md:block" />

            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">

                <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">

                    <div className="max-w-lg">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-6"
                        >
                            <h2 className="text-2xl font-bold font-sans text-white tracking-tight mb-6">
                                DRYPZZ DEV
                            </h2>

                            <div className="relative pl-4 border-l-2 border-electric-violet/50">
                                <p className="text-lg text-gray-300 font-serif italic leading-relaxed mb-2">
                                    "A vida é uma aventura ousada ou nada..."
                                </p>
                                <footer className="text-xs font-mono text-neon-cyan uppercase tracking-widest opacity-80">
                                    — Helen Keller
                                </footer>
                            </div>
                        </motion.div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <span className="font-mono text-neon-cyan text-xs uppercase tracking-widest">
                            // Connect
                        </span>
                        <div className="flex gap-4">
                            {socialLinks.map((link) => (
                                <motion.a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -3, color: "#fff" }}
                                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:bg-electric-violet hover:border-electric-violet hover:text-white transition-all duration-300 shadow-lg"
                                    aria-label={link.name}
                                >
                                    <span className="text-xl">{link.icon}</span>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">

                    <p className="text-xs font-mono text-gray-600 text-center md:text-left">
                        2026 - {currentYear} © Todos os direitos reservados.
                    </p>

                    <motion.button
                        onClick={scrollToTop}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
                    >
                        <span className="text-xs font-mono text-gray-400 group-hover:text-white uppercase tracking-wider">Voltar ao topo</span>
                        <FaArrowUp className="text-electric-violet group-hover:-translate-y-1 transition-transform" size={12} />
                    </motion.button>
                </div>

            </div>
        </footer>
    );
};

export default ModernFooter;