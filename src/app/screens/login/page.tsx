"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaLock, FaEnvelope, FaSignInAlt, FaTerminal, FaDiscord } from "react-icons/fa";

import useLogin from "./page.rules";

const Login = () => {
    const {
        email, setEmail,
        password, setPassword,
        handleLogin,
        handleDiscordLogin,
        loading
    } = useLogin();

    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-transparent p-4">

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-[#0f0728]/40 backdrop-blur-xl border border-white/5 p-8 md:p-12 rounded-[2rem] shadow-2xl relative"
            >

                <div className="absolute top-0 right-0 w-64 h-64 bg-electric-violet/10 blur-[80px] rounded-full pointer-events-none" />

                <div className="text-center mb-8 relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-neon-cyan text-[10px] font-mono uppercase tracking-widest mb-4">
                        <FaTerminal /> System Access
                    </div>
                    <h1 className="text-3xl font-bold font-sans text-white mb-2">Bem-vindo</h1>
                    <p className="text-gray-400 font-mono text-xs">Painel Administrativo v4.0</p>
                </div>

                <div className="flex flex-col gap-6 relative z-10">

                    <button
                        type="button"
                        onClick={handleDiscordLogin}
                        disabled={loading}
                        className="w-full py-4 rounded-xl bg-[#5865F2] text-white font-bold font-sans uppercase tracking-widest hover:bg-[#4752C4] hover:shadow-[0_0_30px_rgba(88,101,242,0.4)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="animate-pulse">Verificando...</span>
                        ) : (
                            <>
                                <FaDiscord size={20} /> Entrar com Discord
                            </>
                        )}
                    </button>

                    <div className="relative flex py-1 items-center opacity-50">
                        <div className="flex-grow border-t border-white/20"></div>
                        <span className="flex-shrink-0 mx-4 text-gray-500 text-[10px] font-mono uppercase tracking-widest">Ou Acesso Manual</span>
                        <div className="flex-grow border-t border-white/20"></div>
                    </div>

                    <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="flex flex-col gap-6">

                        <div className="group relative">
                            <div className="absolute left-0 bottom-4 text-gray-500 group-focus-within:text-electric-violet transition-colors">
                                <FaEnvelope />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full py-4 pl-8 pr-0 text-white bg-transparent border-0 border-b border-white/20 appearance-none focus:outline-none focus:ring-0 focus:border-electric-violet peer font-mono placeholder-transparent disabled:opacity-50"
                                placeholder="Email"
                                disabled={loading}
                            />
                            <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-8 peer-focus:text-electric-violet peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:left-8 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Email
                            </label>
                        </div>

                        <div className="group relative">
                            <div className="absolute left-0 bottom-4 text-gray-500 group-focus-within:text-electric-violet transition-colors">
                                <FaLock />
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full py-4 pl-8 pr-0 text-white bg-transparent border-0 border-b border-white/20 appearance-none focus:outline-none focus:ring-0 focus:border-electric-violet peer font-mono placeholder-transparent disabled:opacity-50"
                                placeholder="Senha"
                                disabled={loading}
                            />
                            <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-8 peer-focus:text-electric-violet peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:left-8 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Senha
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-gray-300 font-bold font-sans uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-xs"
                        >
                            {loading ? "Carregando..." : (
                                <>Entrar <FaSignInAlt /></>
                            )}
                        </button>
                    </form>
                </div>
            </motion.div>
        </section>
    );
};

export default Login;