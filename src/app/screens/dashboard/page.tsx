"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaPlus, FaTrash, FaSignOutAlt, FaSearch, FaExternalLinkAlt, FaLayerGroup, FaTimesCircle, FaFolderOpen, FaEdit,
    FaCalendarAlt, FaGithub
} from "react-icons/fa";

import useDashboard from "./page.rules";
import Loading from "@/app/components/layout/loading";
import DashboardCharts from "./components/DashboardCharts";
import ActionModal from "@/app/components/common/modal/ActionModal";
import { formatDate } from "@/app/utils/format";

const Dashboard = () => {
    const {
        projects, allProjectsCount, stats: initialStats, chartsData,
        searchTerm, setSearchTerm, loading, logout, deleteProject
    } = useDashboard();

    const [userProfile, setUserProfile] = useState({
        name: "Carregando...",
        email: "...",
        avatar: "/me.jpeg"
    });

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [idToDelete, setIdToDelete] = useState<string | null>(null);
    const [titleToDelete, setTitleToDelete] = useState<string>("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            setUserProfile({
                name: localStorage.getItem("admin_name") || "Admin",
                email: localStorage.getItem("admin_email") || "admin@drypzz.com",
                avatar: localStorage.getItem("admin_avatar") || "/me.jpeg"
            });
        }
    }, []);

    const stats = useMemo(() => {
        if (!projects || projects.length === 0) return initialStats;

        const sortedByDate = [...projects].sort((a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        return {
            ...initialStats,
            lastProject: sortedByDate[0]?.title || "Nenhum"
        };
    }, [projects, initialStats]);

    const confirmDelete = (id: string, title: string) => {
        setIdToDelete(id);
        setTitleToDelete(title);
        setDeleteModalOpen(true);
    };

    const handleDelete = async () => {
        if (idToDelete) {
            await deleteProject(idToDelete);
            setDeleteModalOpen(false);
            setIdToDelete(null);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen">
                <Loading fullScreen={true} text="INITIALIZING_SYSTEM..." />
            </div>
        );
    }

    const hasProjectsInDatabase = allProjectsCount > 0;
    const hasSearchResults = projects && projects.length > 0;
    const showEmptyPortfolio = !hasProjectsInDatabase;
    const showEmptySearch = hasProjectsInDatabase && !hasSearchResults;
    const showProjectList = hasProjectsInDatabase && hasSearchResults;

    return (
        <div className="min-h-screen bg-transparent py-12 pb-32">
            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">

                {/* --- HEADER --- */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
                    <div className="flex items-center gap-6">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-electric-violet/50 blur-[20px] rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full p-[2px] bg-gradient-to-tr from-electric-violet via-white to-neon-cyan relative z-10">
                                <img
                                    src={userProfile.avatar}
                                    alt="User Avatar"
                                    className="w-full h-full rounded-full object-cover border-4 border-[#030014]"
                                />
                                <div className="absolute bottom-1 right-1 w-5 h-5 bg-[#030014] rounded-full flex items-center justify-center">
                                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neon-cyan font-mono text-[10px] uppercase tracking-widest mb-2">
                                System Admin
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold text-white font-sans tracking-tight mb-1">
                                {userProfile.name}
                            </h1>
                            <p className="text-gray-500 font-mono text-xs md:text-sm flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                                {userProfile.email}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 w-full md:w-auto">
                        <button
                            onClick={logout}
                            className="px-6 py-3 rounded-full border border-white/10 text-gray-400 hover:bg-white/5 hover:text-white hover:border-white/20 font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-2"
                        >
                            <FaSignOutAlt /> Sair
                        </button>
                        <Link
                            href="/screens/dashboard/create"
                            className="flex-1 md:flex-none px-8 py-3 rounded-full bg-white text-black font-bold font-sans uppercase tracking-wider hover:bg-electric-violet hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] flex items-center justify-center gap-2"
                        >
                            <FaPlus /> Novo Projeto
                        </Link>
                    </div>
                </header>

                {/* --- KPI CARDS --- */}
                {hasProjectsInDatabase && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-electric-violet/20 transition-colors">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><FaLayerGroup size={40} /></div>
                            <h3 className="text-5xl font-bold text-white font-sans mb-2">{stats.totalProjects}</h3>
                            <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">Total Projetos</p>
                        </div>
                        <div className="border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-electric-violet/20 transition-colors">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><FaFolderOpen size={40} /></div>
                            <h3 className="text-5xl font-bold text-white font-sans mb-2">{stats.uniqueTechs}</h3>
                            <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">Tecnologias</p>
                        </div>
                        <div className="border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-electric-violet/20 transition-colors">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><FaCalendarAlt size={40} /></div>
                            <h3 className="text-2xl font-bold text-white font-sans mb-2 truncate">{stats.lastProject || "-"}</h3>
                            <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">Último Lançamento</p>
                        </div>
                    </motion.div>
                )}

                {/* --- GRÁFICOS (CORREÇÃO DE CONTAINER) --- */}
                {hasProjectsInDatabase && (
                    <div className="w-full min-h-[350px]">
                        <DashboardCharts data={chartsData} />
                    </div>
                )}

                {/* --- BARRA DE PESQUISA --- */}
                {hasProjectsInDatabase && (
                    <div className="sticky top-6 z-40 mb-12">
                        <div className="relative max-w-xl mx-auto">
                            <div className="absolute inset-0 bg-black/80 backdrop-blur-xl rounded-full shadow-2xl -z-10" />
                            <div className="flex items-center border border-white/10 rounded-full px-6 py-3 shadow-lg focus-within:border-electric-violet/50 transition-colors">
                                <FaSearch className="text-gray-500 mr-4" />
                                <input
                                    type="text"
                                    placeholder="Filtrar projetos por nome..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="bg-transparent border-none w-full text-white placeholder-gray-600 focus:outline-none font-mono text-sm"
                                />
                                {searchTerm && (
                                    <button onClick={() => setSearchTerm("")} className="text-gray-500 hover:text-white transition-colors ml-4">
                                        <FaTimesCircle />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* --- GRID DE PROJETOS --- */}
                <div className="min-h-[300px] relative">
                    <AnimatePresence mode="wait">
                        {showEmptyPortfolio && (
                            <motion.div
                                key="portfolio-empty"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col items-center justify-center py-32 bg-[#050505] border border-white/5 rounded-[2rem] border-dashed text-center px-4"
                            >
                                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 text-gray-600">
                                    <FaLayerGroup size={32} />
                                </div>
                                <h3 className="text-xl font-bold font-sans text-white mb-2">Seu portfólio está vazio</h3>
                                <p className="text-gray-500 font-mono mb-8 max-w-md text-sm">
                                    Adicione seu primeiro trabalho para começar a ver as estatísticas.
                                </p>
                                <Link href="/screens/dashboard/create" className="px-8 py-4 bg-white text-black rounded-full font-bold font-sans hover:bg-electric-violet hover:text-white transition-all flex items-center gap-2">
                                    <FaPlus /> Criar Primeiro Projeto
                                </Link>
                            </motion.div>
                        )}

                        {showEmptySearch && (
                            <motion.div
                                key="search-empty"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="flex flex-col items-center justify-center py-24 text-center px-4"
                            >
                                <h3 className="text-xl font-bold font-sans text-white mb-2">Nenhum resultado</h3>
                                <p className="text-gray-500 font-mono text-sm">
                                    Não encontramos nada para "{searchTerm}".
                                </p>
                            </motion.div>
                        )}

                        {showProjectList && (
                            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {projects.map((project) => (
                                    <motion.div
                                        key={project.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="group relative flex flex-col bg-[#050505] border border-white/5 rounded-3xl overflow-hidden hover:border-electric-violet/30 hover:shadow-[0_0_40px_-10px_rgba(124,58,237,0.15)] transition-all duration-500"
                                    >
                                        <div className="relative w-full aspect-[16/9] overflow-hidden bg-black/40">
                                            <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />

                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-sm">
                                                <Link href={`/screens/dashboard/edit/${project.id}`} className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black hover:bg-electric-violet hover:text-white transition-all transform hover:scale-110 shadow-lg">
                                                    <FaEdit size={14} />
                                                </Link>
                                                <button onClick={() => confirmDelete(project.id, project.title)} className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-all transform hover:scale-110 shadow-lg">
                                                    <FaTrash size={14} />
                                                </button>
                                                <a href={project.link} target="_blank" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white hover:text-black transition-all transform hover:scale-110 shadow-lg">
                                                    <FaExternalLinkAlt size={14} />
                                                </a>
                                            </div>
                                        </div>

                                        <div className="p-6 flex flex-col flex-grow">
                                            <div className="flex justify-between items-start mb-2">
                                                <h2 className="text-lg font-bold font-sans text-white truncate pr-2 group-hover:text-electric-violet transition-colors">
                                                    {project.title}
                                                </h2>
                                                {project.link.includes('github') && <FaGithub className="text-gray-600" />}
                                            </div>

                                            <div className="flex items-center gap-2 mb-6">
                                                <span className="w-1.5 h-1.5 rounded-full bg-electric-violet" />
                                                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wide">
                                                    {formatDate(project.createdAt)}
                                                </span>
                                            </div>

                                            <div className="mt-auto flex flex-wrap gap-2">
                                                {project.techs.slice(0, 3).map((t: any, i: any) => (
                                                    <span
                                                        key={i}
                                                        className="text-[10px] font-mono text-gray-400 border border-white/5 px-3 py-1 rounded-full uppercase group-hover:border-white/10 group-hover:text-white transition-colors"
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                                {project.techs.length > 3 && (
                                                    <span className="text-[10px] font-mono text-gray-600 px-1 py-1">
                                                        +{project.techs.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <ActionModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleDelete}
                title="Excluir Projeto?"
                message={`Deseja apagar "${titleToDelete}"?`}
                confirmText="Sim, Excluir"
                cancelText="Cancelar"
                type="danger"
            />
        </div>
    );
};

export default Dashboard;