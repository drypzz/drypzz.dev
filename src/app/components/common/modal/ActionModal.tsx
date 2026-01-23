"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaExclamationTriangle } from "react-icons/fa";

interface ActionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    isLoading?: boolean;
    type?: "danger" | "info"; // Pode expandir para outros tipos
}

const ActionModal: React.FC<ActionModalProps> = ({
    isOpen, onClose, onConfirm, title, message,
    confirmText = "Confirmar", cancelText = "Cancelar",
    isLoading = false, type = "danger"
}) => {

    // Fechar com ESC
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    // Cores baseadas no tipo
    const accentColor = type === "danger" ? "red" : "electric-violet";
    const accentClass = type === "danger" ? "bg-red-500" : "bg-electric-violet";
    const borderClass = type === "danger" ? "border-red-500/30" : "border-electric-violet/30";

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">

                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={!isLoading ? onClose : undefined}
                    className="absolute inset-0 bg-[#030014]/80 backdrop-blur-md cursor-pointer"
                />

                {/* Modal Window */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className={`relative w-full max-w-md bg-[#0f0728] border ${borderClass} p-8 rounded-3xl shadow-2xl overflow-hidden`}
                >
                    {/* Glow de Fundo */}
                    <div className={`absolute top-0 right-0 w-32 h-32 ${accentClass} opacity-10 blur-[50px] rounded-full pointer-events-none`} />

                    <div className="flex flex-col items-center text-center relative z-10">

                        {/* Ícone */}
                        <div className={`w-16 h-16 rounded-full ${type === "danger" ? "bg-red-500/10 text-red-500" : "bg-electric-violet/10 text-electric-violet"} flex items-center justify-center text-3xl mb-6 border ${borderClass}`}>
                            <FaExclamationTriangle />
                        </div>

                        <h3 className="text-2xl font-bold font-sans text-white mb-2">
                            {title}
                        </h3>

                        <p className="text-gray-400 font-mono text-sm mb-8 leading-relaxed">
                            {message}
                        </p>

                        <div className="flex gap-4 w-full">
                            <button
                                onClick={onClose}
                                disabled={isLoading}
                                className="flex-1 py-3 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 hover:text-white font-sans font-medium transition-all"
                            >
                                {cancelText}
                            </button>

                            <button
                                onClick={onConfirm}
                                disabled={isLoading}
                                className={`flex-1 py-3 rounded-xl ${type === "danger" ? "bg-red-600 hover:bg-red-500" : "bg-electric-violet hover:bg-[#6d28d9]"} text-white font-bold font-sans shadow-lg transition-all flex items-center justify-center gap-2`}
                            >
                                {isLoading ? (
                                    <span className="animate-pulse">Processando...</span>
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