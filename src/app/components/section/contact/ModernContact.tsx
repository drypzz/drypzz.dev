"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaCheckCircle, FaUser, FaEnvelope, FaCommentAlt } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { showNotify } from "@/app/utils/notify";

const ModernContact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
    const formRef = useRef<HTMLFormElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.message) {
            showNotify("error", "Por favor, preencha todos os campos.");
            return;
        }

        setStatus("submitting");

        const templateParams = {
            from_name: formData.name,
            email: formData.email,
            message: formData.message,
            hours: `${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}h - ${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
            year: new Date().getFullYear(),
        };

        const serviceId = process.env.NEXT_PUBLIC_SERVICE_ID || "";
        const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID || "";
        const userId = process.env.NEXT_PUBLIC_USER_ID || "";

        try {
            await emailjs.send(serviceId, templateId, templateParams, userId);

            setStatus("success");

            setFormData({ name: "", email: "", message: "" });
            if (formRef.current) formRef.current.reset();

            setTimeout(() => {
                setStatus("idle");
            }, 5000);

        } catch (error) {
            console.error("ERRO AO ENVIAR EMAIL:", error);
            setStatus("idle");
            showNotify("error", "Falha ao enviar mensagem. Tente novamente.");
        }
    };

    return (
        <section id="contact" className="relative py-24 md:py-32 overflow-hidden">

            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-electric-violet/10 blur-[100px] rounded-full" />
            </div>

            <div className="w-full max-w-[800px] mx-auto px-6 relative z-10">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="font-mono text-neon-cyan text-sm tracking-widest uppercase mb-4 block">
                        // Get In Touch
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white font-sans mb-6">
                        Curtiu? Entre em <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-electric-violet">contato</span>
                    </h2>
                    <p className="text-gray-400 font-sans text-lg max-w-xl mx-auto leading-relaxed">
                        Estou sempre aberto a críticas, projetos e conversas interessantes. Sinta-se à vontade para me enviar uma mensagem!
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-white/[0.02] border border-white/5 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden"
                >
                    <AnimatePresence mode="wait">

                        {status === "success" ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex flex-col items-center justify-center py-12 text-center"
                            >
                                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 border border-green-500/20">
                                    <FaCheckCircle className="text-green-500 text-4xl" />
                                </div>
                                <h3 className="text-2xl font-bold text-white font-sans mb-2">Mensagem Enviada!</h3>
                                <p className="text-gray-400 font-mono text-sm mb-6">Obrigado pelo contato. Responderei assim que possível.</p>

                                <button
                                    onClick={() => setStatus("idle")}
                                    className="text-xs font-mono text-gray-500 hover:text-white underline"
                                >
                                    Enviar nova mensagem
                                </button>
                            </motion.div>
                        ) : (

                            <motion.form
                                ref={formRef}
                                key="form"
                                onSubmit={handleSubmit}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col gap-8"
                            >
                                <div className="group relative">
                                    <div className="absolute left-0 bottom-4 text-gray-500 group-focus-within:text-electric-violet transition-colors">
                                        <FaUser />
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="block w-full py-4 pl-8 pr-0 text-white bg-transparent border-0 border-b border-white/10 appearance-none focus:outline-none focus:ring-0 focus:border-electric-violet peer font-sans text-lg placeholder-transparent transition-colors"
                                        placeholder="Seu Nome"
                                        disabled={status === "submitting"}
                                    />
                                    <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-8 peer-focus:text-electric-violet peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:left-8 peer-focus:scale-75 peer-focus:-translate-y-6">
                                        Seu Nome
                                    </label>
                                </div>

                                <div className="group relative">
                                    <div className="absolute left-0 bottom-4 text-gray-500 group-focus-within:text-electric-violet transition-colors">
                                        <FaEnvelope />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="block w-full py-4 pl-8 pr-0 text-white bg-transparent border-0 border-b border-white/10 appearance-none focus:outline-none focus:ring-0 focus:border-electric-violet peer font-sans text-lg placeholder-transparent transition-colors"
                                        placeholder="Seu Email"
                                        disabled={status === "submitting"}
                                    />
                                    <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-8 peer-focus:text-electric-violet peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:left-8 peer-focus:scale-75 peer-focus:-translate-y-6">
                                        Seu Email
                                    </label>
                                </div>

                                <div className="group relative">
                                    <div className="absolute left-0 top-4 text-gray-500 group-focus-within:text-electric-violet transition-colors">
                                        <FaCommentAlt />
                                    </div>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={4}
                                        className="block w-full py-4 pl-8 pr-0 text-white bg-transparent border-0 border-b border-white/10 appearance-none focus:outline-none focus:ring-0 focus:border-electric-violet peer font-sans text-lg placeholder-transparent resize-none transition-colors"
                                        placeholder="Como posso ajudar?"
                                        disabled={status === "submitting"}
                                    />
                                    <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-8 peer-focus:text-electric-violet peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:left-8 peer-focus:scale-75 peer-focus:-translate-y-6">
                                        Mensagem
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === "submitting"}
                                    className="mt-4 w-full py-5 rounded-xl bg-white text-black font-bold font-sans uppercase tracking-widest hover:bg-electric-violet hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                                >
                                    {status === "submitting" ? (
                                        <>
                                            <span className="animate-spin h-5 w-5 border-2 border-black border-t-transparent rounded-full mr-2"></span>
                                            Enviando...
                                        </>
                                    ) : (
                                        <>
                                            Enviar Mensagem
                                            <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default ModernContact;