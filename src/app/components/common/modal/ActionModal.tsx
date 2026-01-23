"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaExclamationTriangle, FaSnowflake, FaInfoCircle } from "react-icons/fa";
import { useSeason } from "@/app/hooks/useSeason";

interface ActionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    isLoading?: boolean;
    type?: "danger" | "info";
}

const ActionModal: React.FC<ActionModalProps> = ({
    isOpen, onClose, onConfirm, title, message,
    confirmText = "Confirmar", cancelText = "Cancelar",
    isLoading = false, type = "danger"
}) => {

    const { isChristmas } = useSeason();

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    let theme = {
        icon: <FaExclamationTriangle />,
        glowColor: "bg-electric-violet",
        textColor: "text-electric-violet",
        borderColor: "border-electric-violet/30",
        buttonClass: "bg-electric-violet hover:bg-[#6d28d9] shadow-[0_0_20px_-5px_rgba(124,58,237,0.5)]",
        iconContainer: "bg-electric-violet/10 border-electric-violet/20"
    };

    if (type === "danger") {
        theme = {
            icon: <FaExclamationTriangle />,
            glowColor: "bg-red-500",
            textColor: "text-red-500",
            borderColor: "border-red-500/30",
            buttonClass: "bg-red-600 hover:bg-red-500 shadow-[0_0_20px_-5px_rgba(220,38,38,0.5)]",
            iconContainer: "bg-red-500/10 border-red-500/20"
        };
    }

    if (isChristmas) {
        if (type === "danger") {
            theme = {
                icon: <span className="text-2xl">🎅</span>,
                glowColor: "bg-[#D42426]",
                textColor: "text-[#D42426]",
                borderColor: "border-[#D42426]/40",
                buttonClass: "bg-[#D42426] hover:bg-[#ff3b3e] shadow-[0_0_20px_-5px_rgba(212,36,38,0.6)]",
                iconContainer: "bg-[#D42426]/10 border-[#D42426]/20"
            };
        } else {
            theme = {
                icon: <FaSnowflake className="animate-spin-slow" />,
                glowColor: "bg-[#165B33]",
                textColor: "text-[#165B33]",
                borderColor: "border-[#165B33]/40",
                buttonClass: "bg-[#165B33] hover:bg-[#1e7a44] shadow-[0_0_20px_-5px_rgba(22,91,51,0.6)]",
                iconContainer: "bg-[#165B33]/10 border-[#165B33]/20"
            };
        }
    }

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={!isLoading ? onClose : undefined}
                    className="absolute inset-0 bg-[#030014]/60 backdrop-blur-xl cursor-pointer"
                />

                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 10 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 10 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className={`relative w-full max-w-sm md:max-w-md bg-[#0a0a0a] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden`}
                >
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                    {isChristmas && (
                        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-screen" />
                    )}

                    <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 ${theme.glowColor} opacity-10 blur-[60px] rounded-full pointer-events-none`} />

                    <div className="flex flex-col items-center text-center p-8 relative z-10">

                        <div className={`w-20 h-20 rounded-full ${theme.iconContainer} flex items-center justify-center text-3xl mb-6 border ${theme.borderColor} backdrop-blur-md shadow-lg relative group`}>
                            <div className={`absolute inset-0 rounded-full ${theme.glowColor} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-md`} />
                            <span className={`${theme.textColor} drop-shadow-sm`}>
                                {theme.icon}
                            </span>
                        </div>

                        <h3 className="text-2xl font-bold font-sans text-white mb-3 tracking-tight">
                            {title}
                        </h3>

                        <p className="text-gray-400 font-mono text-sm mb-8 leading-relaxed max-w-[85%]">
                            {message}
                        </p>

                        <div className="flex gap-3 w-full">
                            <button
                                onClick={onClose}
                                disabled={isLoading}
                                className="flex-1 py-3.5 rounded-xl bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/10 font-mono text-xs uppercase tracking-wider transition-all disabled:opacity-50"
                            >
                                {cancelText}
                            </button>

                            <button
                                onClick={onConfirm}
                                disabled={isLoading}
                                className={`flex-1 py-3.5 rounded-xl ${theme.buttonClass} text-white font-bold font-sans text-sm uppercase tracking-wide transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Processing
                                    </>
                                ) : (
                                    confirmText
                                )}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ActionModal;