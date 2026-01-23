"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaGithub, FaExternalLinkAlt, FaCalendarAlt, FaLayerGroup } from "react-icons/fa";

interface ModernModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: any; // Idealmente use a interface Project do global.tsx
}

const ModernModal: React.FC<ModernModalProps> = ({ isOpen, onClose, project }) => {
    
    // Fechar com ESC
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    // Formatação de Data Elegante (Ex: 15 de Novembro, 2024)
    const formatDate = (dateString?: string) => {
        if (!dateString) return null;
        return new Date(dateString).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    if (!isOpen || !project) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 md:px-0">
                
                {/* Backdrop (Fundo Escuro com Blur) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-[#030014]/90 backdrop-blur-xl cursor-pointer"
                />

                {/* Janela do Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="relative w-full max-w-5xl bg-[#0f0728] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:h-[600px]"
                >
                    {/* Botão Fechar (Mobile) */}
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 z-50 p-2 bg-black/50 backdrop-blur-md rounded-full text-white md:hidden"
                    >
                        <FaTimes />
                    </button>

                    {/* COLUNA 1: Visual / Imagem (Esquerda ou Topo) */}
                    <div className="w-full md:w-[55%] h-64 md:h-full relative bg-black">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0728] via-transparent to-transparent z-10 md:hidden" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0f0728] z-10 hidden md:block" />
                        
                        <img 
                            src={project.imageUrl} 
                            alt={project.title} 
                            className="w-full h-full object-cover opacity-90"
                        />
                    </div>

                    {/* COLUNA 2: Conteúdo / Detalhes (Direita ou Baixo) */}
                    <div className="w-full md:w-[45%] p-8 md:p-12 flex flex-col relative z-20 overflow-y-auto custom-scrollbar">
                        
                        {/* Botão Fechar (Desktop) */}
                        <div className="hidden md:flex justify-end mb-8">
                            <button 
                                onClick={onClose}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                            >
                                <FaTimes size={20} />
                            </button>
                        </div>

                        {/* Cabeçalho do Projeto */}
                        <div className="mb-8">
                            <span className="font-mono text-neon-cyan text-xs tracking-widest uppercase mb-3 block flex items-center gap-2">
                                <FaLayerGroup /> Project Details
                            </span>
                            
                            <h2 className="text-3xl md:text-4xl font-bold font-sans text-white mb-4 leading-tight">
                                {project.title}
                            </h2>

                            {/* --- NOVA DATA --- */}
                            {project.createdAt && (
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="p-1.5 rounded bg-white/5 text-electric-violet">
                                        <FaCalendarAlt size={12} />
                                    </div>
                                    <span className="font-mono text-sm text-gray-400">
                                        Lançado em <span className="text-white">{formatDate(project.createdAt)}</span>
                                    </span>
                                </div>
                            )}

                            <div className="w-20 h-1 bg-electric-violet rounded-full" />
                        </div>

                        {/* Tech Stack */}
                        <div className="mb-10">
                            <h3 className="text-white font-bold font-sans text-sm uppercase tracking-wider mb-4">
                                Tecnologias Utilizadas
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {project.techs.map((tech: string, i: number) => (
                                    <span 
                                        key={i} 
                                        className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-mono text-neon-cyan uppercase tracking-wide hover:bg-white/10 transition-colors"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Ações (Links) */}
                        <div className="mt-auto flex flex-col sm:flex-row gap-4">
                            {project.link && (
                                <a 
                                    href={project.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex-1 py-4 bg-electric-violet hover:bg-[#6d28d9] text-white rounded-xl font-bold font-sans uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-electric-violet/25 hover:-translate-y-1"
                                >
                                    {project.link.includes('github') ? 'Ver Código' : 'Acessar Projeto'} 
                                    {project.link.includes('github') ? <FaGithub size={16} /> : <FaExternalLinkAlt size={14} />}
                                </a>
                            )}
                            
                            {/* Se o link for github, talvez adicionar um segundo botão de Live Demo se existir essa info, 
                                caso contrário, manter apenas o principal. */}
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ModernModal;