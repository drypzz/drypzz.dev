"use client";

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Image from "next/image";
import { motion, AnimatePresence } from 'framer-motion';
import { FaInfoCircle, FaArrowRight, FaArrowUp, FaCalendarAlt, FaExclamationTriangle } from 'react-icons/fa';
import useProjects from './index.rules';
import { useProjectView } from '@/app/hooks/useProjectView';

import Loading from '@/app/components/layout/loading';

const ModernModal = dynamic(() => import('@/app/components/common/modal/ModernModal'), {
    ssr: false
});

const ModernProjects = () => {
    const { projects, loading, error } = useProjects();
    const { incrementView } = useProjectView();

    const [selectedProject, setSelectedProject] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showAll, setShowAll] = useState(false);

    const sortedProjects = useMemo(() => {
        if (!projects) return [];
        return [...projects].sort((a, b) =>
            new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
        );
    }, [projects]);

    const visibleProjects = showAll ? sortedProjects : sortedProjects.slice(0, 6);

    const handleOpenModal = (project: any) => {
        setSelectedProject(project);
        setIsModalOpen(true);
        incrementView(project.id);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedProject(null), 300);
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString('pt-BR', {
            month: 'short',
            year: 'numeric'
        }).replace('.', '');
    };

    return (
        <section className="relative py-24 md:py-32 bg-transparent" id="projects">
            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
                <div className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="max-w-3xl"
                    >
                        <span className="font-mono text-neon-cyan text-sm tracking-widest uppercase mb-3 block">
                            // Selected Works
                        </span>
                        <h2 className="text-4xl md:text-6xl font-bold text-white font-sans mb-6 tracking-tight">
                            Projetos em Destaque
                        </h2>
                        <p className="text-gray-400 font-sans text-lg leading-relaxed border-l border-white/10 pl-6">
                            Explore uma coleção de aplicações desenvolvidas com foco obsessivo em performance, interface e experiência do usuário.
                        </p>
                    </motion.div>
                </div>

                {loading && (
                    <div className="min-h-[400px] flex flex-col items-center justify-center border border-white/5 rounded-3xl bg-white/[0.01]">
                        <Loading fullScreen={false} text="SYNCING_DATABASE..." />
                    </div>
                )}

                {!loading && error && (
                    <div className="min-h-[300px] flex flex-col items-center justify-center text-center p-8 border border-red-500/20 rounded-3xl bg-red-500/5">
                        <FaExclamationTriangle className="text-red-500 text-4xl mb-4" />
                        <h3 className="text-white font-bold text-xl mb-2">Erro de Conexão</h3>
                        <p className="text-gray-400 font-mono text-sm">Não foi possível carregar os projetos no momento.</p>
                    </div>
                )}
                {!loading && !error && projects.length === 0 && (
                    <div className="min-h-[300px] flex flex-col items-center justify-center text-center p-8 border border-white/5 rounded-3xl">
                        <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">
                            Em breve novos projetos...
                        </p>
                    </div>
                )}

                {!loading && !error && projects.length > 0 && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                            <AnimatePresence mode='popLayout'>
                                {visibleProjects.map((project, index) => (
                                    <motion.div
                                        key={project.id || index}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3, delay: index < 6 ? index * 0.05 : 0 }}
                                        style={{ willChange: 'transform, opacity' }}
                                        className="group relative flex flex-col h-full bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden hover:border-electric-violet/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_-15px_rgba(124,58,237,0.15)]"
                                        onClick={() => handleOpenModal(project)}
                                    >
                                        <div className="relative w-full aspect-[16/10] overflow-hidden bg-black/40">
                                            <div className="absolute inset-0 bg-void/20 group-hover:bg-transparent transition-colors duration-300 z-10" />

                                            <Image
                                                src={project.imageUrl}
                                                alt={project.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                className="object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                                                quality={75}
                                                priority={index < 3}
                                            />

                                            <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-[-10px] group-hover:translate-y-0">
                                                <span className="flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full text-[10px] font-mono text-white tracking-widest uppercase shadow-lg">
                                                    <FaInfoCircle /> Detalhes
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-8 flex flex-col flex-grow">
                                            <div className="mb-4">
                                                <h3 className="text-2xl font-bold text-white font-sans mb-2 group-hover:text-electric-violet transition-colors">
                                                    {project.title}
                                                </h3>
                                                <div className="flex items-center gap-2 mb-4 opacity-60 group-hover:opacity-100 transition-opacity">
                                                    <FaCalendarAlt className="text-electric-violet text-[10px]" />
                                                    <span className="text-[11px] font-mono text-gray-300 uppercase tracking-wider">
                                                        {formatDate(project.createdAt)}
                                                    </span>
                                                </div>
                                                <div className="w-12 h-0.5 bg-white/10 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-electric-violet group-hover:to-transparent transition-all duration-500" />
                                            </div>

                                            <div className="mt-auto flex flex-wrap gap-2">
                                                {project.techs.slice(0, 3).map((tech: string, i: number) => (
                                                    <span key={i} className="text-[11px] font-mono text-gray-400 bg-white/5 border border-white/5 px-3 py-1.5 rounded-lg uppercase group-hover:border-white/10 group-hover:text-gray-200 transition-colors">
                                                        {tech}
                                                    </span>
                                                ))}
                                                {project.techs.length > 3 && (
                                                    <span className="text-[11px] font-mono text-gray-500 px-2 py-1.5">
                                                        +{project.techs.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {sortedProjects.length > 6 && (
                            <motion.div layout className="mt-16 flex justify-center md:justify-start">
                                <button
                                    onClick={() => setShowAll(!showAll)}
                                    className="group flex items-center gap-3 text-sm font-mono text-gray-400 hover:text-white transition-colors border-b border-transparent hover:border-electric-violet pb-1"
                                >
                                    {showAll ? (
                                        <>VER MENOS PROJETOS <FaArrowUp className="group-hover:-translate-y-1 transition-transform" /></>
                                    ) : (
                                        <>VER TODOS OS PROJETOS ({sortedProjects.length}) <FaArrowRight className="group-hover:translate-x-1 transition-transform" /></>
                                    )}
                                </button>
                            </motion.div>
                        )}
                    </>
                )}
            </div>

            <ModernModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                project={selectedProject}
            />
        </section>
    );
};

export default ModernProjects;