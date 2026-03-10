"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaPlus, FaTrash, FaSignOutAlt, FaSearch, FaExternalLinkAlt, FaLayerGroup, FaTimesCircle, FaFolderOpen, FaEdit,
    FaCalendarAlt, FaGithub, FaDiscord, FaUserShield, FaEye, FaCrown, FaInbox, FaChartLine
} from "react-icons/fa";

import useDashboard from "./page.rules";
import Loading from "@/app/components/layout/loading";
import DashboardCharts from "./components/DashboardCharts";
import ActionModal from "@/app/components/common/modal/ActionModal";
import { formatDate } from "@/app/utils/format";

const ManageAdminsModal = ({ isOpen, onClose, admins, onAdd, onRemove }: any) => {
    const [newEmail, setNewEmail] = useState("");

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-[#030014]/80 backdrop-blur-md" onClick={onClose} />
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl shadow-2xl overflow-hidden"
            >
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white font-sans flex items-center gap-2">
                        <FaUserShield className="text-electric-violet" /> Gerenciar Acessos
                    </h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-white"><FaTimesCircle size={20} /></button>
                </div>

                <div className="flex gap-2 mb-6">
                    <input
                        type="email"
                        placeholder="Novo email (será Mod)..."
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:border-electric-violet outline-none"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                    />
                    <button
                        onClick={() => { onAdd(newEmail); setNewEmail(""); }}
                        className="bg-electric-violet hover:bg-[#6d28d9] text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors"
                    >
                        Adicionar
                    </button>
                </div>

                <div className="max-h-60 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                    {admins.length === 0 ? (
                        <p className="text-gray-500 text-center text-xs py-4">Nenhum registro encontrado.</p>
                    ) : (
                        admins.map((admin: any) => (
                            <div key={admin.id} className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/5">
                                <div className="flex flex-col">
                                    <span className="text-gray-300 text-sm font-mono">{admin.email}</span>
                                    <span className={`text-[10px] font-bold uppercase tracking-wider ${admin.role === 'super' ? 'text-electric-violet' : 'text-gray-500'}`}>
                                        {admin.role === 'super' ? 'Super Admin' : 'Moderator'}
                                    </span>
                                </div>

                                {admin.role !== 'super' ? (
                                    <button
                                        onClick={() => onRemove(admin.id)}
                                        className="text-red-500 hover:text-red-400 p-2 hover:bg-red-500/10 rounded transition-colors"
                                        title="Remover Acesso"
                                    >
                                        <FaTrash size={12} />
                                    </button>
                                ) : (
                                    <div className="p-2 text-gray-600" title="Não é possível remover Super Admins">
                                        <FaCrown size={12} />
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </motion.div>
        </div>
    );
};

const Dashboard = () => {
    const {
        projects, allProjectsCount, stats, chartsData,
        searchTerm, setSearchTerm, loading, logout, deleteProject,
        adminsList, fetchAdmins, addAdmin, removeAdmin, incrementProjectView
    } = useDashboard();

    const [userProfile, setUserProfile] = useState({
        name: "Carregando...",
        email: "...",
        avatar: "/me.jpeg",
        banner: "",
        guildTag: "",
        guildBadge: "",
        role: "mod"
    });

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [adminModalOpen, setAdminModalOpen] = useState(false);
    const [idToDelete, setIdToDelete] = useState<string | null>(null);
    const [titleToDelete, setTitleToDelete] = useState<string>("");

    const isSuperAdmin = userProfile.role === "super";

    useEffect(() => {
        if (typeof window !== "undefined") {
            const sessionStr = localStorage.getItem("admin_session");
            if (sessionStr) {
                const session = JSON.parse(sessionStr);
                setUserProfile({
                    name: session.name || "Admin",
                    email: session.email || "admin@drypzz.com",
                    avatar: session.avatar || "/me.jpeg",
                    banner: session.banner || "",
                    guildTag: session.guildTag || "",
                    guildBadge: session.guildBadge || "",
                    role: session.role || "mod"
                });
            }
        }
    }, []);

    useEffect(() => {
        if (isSuperAdmin) {
            const unsubscribe = fetchAdmins();
            return () => { if (unsubscribe) unsubscribe(); };
        }
    }, [isSuperAdmin]);

    const handleLinkClick = (id: string, url: string) => {
        incrementProjectView(id);
        window.open(url, "_blank");
    };

    const confirmDelete = (id: string, title: string) => {
        setIdToDelete(id);
        setTitleToDelete(title);
        setDeleteModalOpen(true);
    };

    const handleDelete = async () => {
        if (idToDelete && isSuperAdmin) {
            await deleteProject(idToDelete);
            setDeleteModalOpen(false);
            setIdToDelete(null);
        }
    };

    const getBannerStyle = () => {
        if (!userProfile.banner) return {};
        if (userProfile.banner.startsWith("#")) return { backgroundColor: userProfile.banner };
        return { backgroundImage: `url(${userProfile.banner})`, backgroundSize: 'cover', backgroundPosition: 'center' };
    };

    if (loading) return <div className="min-h-screen"><Loading fullScreen={true} text="INITIALIZING_SYSTEM..." /></div>;

    const hasProjectsInDatabase = allProjectsCount > 0;
    const hasSearchResults = projects && projects.length > 0;
    const showProjectList = hasProjectsInDatabase && hasSearchResults;

    const showEmptySearch = hasProjectsInDatabase && !hasSearchResults;
    const showEmptyPortfolio = !hasProjectsInDatabase;

    return (
        <div className="min-h-screen bg-transparent py-12 pb-32">
            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">

                <header className="relative flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8 p-8 md:p-12 rounded-[2rem] border border-white/5 bg-[#0a0a0a] overflow-hidden shadow-2xl group">
                    <div className="absolute inset-0 opacity-50 transition-all duration-700 group-hover:scale-105" style={getBannerStyle()}>
                        {!userProfile.banner && <div className="absolute inset-0 bg-gradient-to-r from-electric-violet/20 via-[#0a0a0a] to-neon-cyan/20" />}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-0" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end gap-6 w-full">
                        <div className="relative">
                            <div className="absolute inset-0 bg-electric-violet/50 blur-[20px] rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full p-[3px] bg-[#0a0a0a] border-2 border-white/10 relative z-10 shadow-xl">
                                <img src={userProfile.avatar} alt="User Avatar" className="w-full h-full rounded-full object-cover" />
                                <div className="absolute bottom-1 right-1 w-6 h-6 bg-[#0a0a0a] rounded-full flex items-center justify-center">
                                    <div className={`w-4 h-4 rounded-full animate-pulse border-2 border-[#0a0a0a] ${isSuperAdmin ? 'bg-green-500' : 'bg-yellow-500'}`} />
                                </div>
                            </div>
                        </div>

                        <div className="text-center md:text-left flex-1">
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3">
                                {isSuperAdmin ? (
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-electric-violet text-white font-bold font-mono text-[10px] uppercase tracking-widest shadow-[0_0_15px_rgba(124,58,237,0.5)] border border-white/10">
                                        <FaUserShield /> System Admin
                                    </div>
                                ) : (
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/50 text-yellow-400 font-mono text-[10px] uppercase tracking-widest backdrop-blur-md">
                                        <FaEye /> System Mod
                                    </div>
                                )}

                                {userProfile.guildTag && (
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#5865F2]/20 border border-[#5865F2]/50 text-[#5865F2] font-mono text-[10px] uppercase tracking-widest backdrop-blur-md font-bold">
                                        {userProfile.guildBadge ? <img src={userProfile.guildBadge} alt="Clan Badge" className="w-4 h-4 object-contain" /> : <FaDiscord size={10} />}
                                        {userProfile.guildTag}
                                    </div>
                                )}
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold text-white font-sans tracking-tight mb-1 drop-shadow-lg">{userProfile.name}</h1>
                            <p className="text-gray-300 font-mono text-xs md:text-sm flex items-center justify-center md:justify-start gap-2">
                                <span className={`w-1.5 h-1.5 rounded-full ${isSuperAdmin ? 'bg-electric-violet shadow-[0_0_8px_#7c3aed]' : 'bg-yellow-500'}`} />
                                {userProfile.email}
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto mt-6 md:mt-0 justify-center md:justify-end">
                            {isSuperAdmin && (
                                <button
                                    onClick={() => setAdminModalOpen(true)}
                                    className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:bg-white hover:text-black hover:border-white font-mono text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 backdrop-blur-md h-[42px]"
                                >
                                    <FaUserShield size={14} /> <span className="hidden md:inline">Admins</span>
                                </button>
                            )}

                            <button onClick={() => logout()} className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:bg-white hover:text-black hover:border-white font-mono text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 backdrop-blur-md h-[42px]">
                                <FaSignOutAlt /> Sair
                            </button>

                            {isSuperAdmin && (
                                <Link href="/screens/dashboard/create" className="px-8 py-3 rounded-full bg-white text-black font-bold font-sans uppercase tracking-wider hover:bg-electric-violet hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] flex items-center justify-center gap-2 h-[42px]">
                                    <FaPlus /> Novo Projeto
                                </Link>
                            )}
                        </div>
                    </div>
                </header>

                {hasProjectsInDatabase && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        <div className="border border-white/5 p-6 rounded-3xl relative overflow-hidden group hover:border-electric-violet/20 transition-colors backdrop-blur-sm">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><FaLayerGroup size={32} /></div>
                            <h3 className="text-4xl font-bold text-white font-sans mb-1">{stats.totalProjects}</h3>
                            <p className="text-gray-500 font-mono text-[10px] uppercase tracking-widest">Total Projetos</p>
                        </div>
                        <div className="border border-white/5 p-6 rounded-3xl relative overflow-hidden group hover:border-electric-violet/20 transition-colors backdrop-blur-sm">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><FaFolderOpen size={32} /></div>
                            <h3 className="text-4xl font-bold text-white font-sans mb-1">{stats.uniqueTechs}</h3>
                            <p className="text-gray-500 font-mono text-[10px] uppercase tracking-widest">Stacks</p>
                        </div>
                        <div className="border border-white/5 p-6 rounded-3xl relative overflow-hidden group hover:border-neon-cyan/20 transition-colors backdrop-blur-sm">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-neon-cyan"><FaChartLine size={32} /></div>
                            <h3 className="text-4xl font-bold text-white font-sans mb-1">{stats.totalViews}</h3>
                            <p className="text-gray-500 font-mono text-[10px] uppercase tracking-widest">Total Cliques</p>
                        </div>
                        <div className="border border-white/5 p-6 rounded-3xl relative overflow-hidden group hover:border-electric-violet/20 transition-colors backdrop-blur-sm">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><FaCalendarAlt size={32} /></div>
                            <h3 className="text-xl font-bold text-white font-sans mb-1 truncate leading-8 pt-2">{stats.lastProject || "-"}</h3>
                            <p className="text-gray-500 font-mono text-[10px] uppercase tracking-widest">Último Lançamento</p>
                        </div>
                    </motion.div>
                )}

                {hasProjectsInDatabase && (
                    <div className="w-full min-h-[350px] mb-12">
                        <DashboardCharts data={chartsData} />
                    </div>
                )}

                {hasProjectsInDatabase && (
                    <div className="sticky top-6 z-40 mb-12">
                        <div className="relative max-w-xl mx-auto">
                            <div className="absolute inset-0 bg-black/80 backdrop-blur-xl rounded-full shadow-2xl -z-10" />
                            <div className="flex items-center border border-white/10 rounded-full px-6 py-3 shadow-lg focus-within:border-electric-violet/50 transition-colors bg-white/5">
                                <FaSearch className="text-gray-500 mr-4" />
                                <input type="text" placeholder="Filtrar projetos..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="bg-transparent border-none w-full text-white placeholder-gray-600 focus:outline-none font-mono text-sm" />
                                {searchTerm && <button onClick={() => setSearchTerm("")} className="text-gray-500 hover:text-white ml-4"><FaTimesCircle /></button>}
                            </div>
                        </div>
                    </div>
                )}

                <div className="min-h-[300px] relative">
                    <AnimatePresence mode="wait">

                        {showEmptyPortfolio && (
                            <motion.div
                                key="empty-db"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="flex flex-col items-center justify-center py-20 text-center"
                            >
                                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 text-gray-500 border border-white/5">
                                    <FaInbox size={32} />
                                </div>
                                <h3 className="text-xl font-bold font-sans text-white mb-2">Portfolio Vazio</h3>
                                <p className="text-gray-400 font-mono text-sm mb-6">Nenhum projeto cadastrado no banco de dados.</p>
                                {isSuperAdmin && (
                                    <Link href="/screens/dashboard/create" className="px-6 py-2 rounded-full bg-electric-violet text-white font-mono text-xs uppercase tracking-widest hover:bg-[#6d28d9] transition-all">
                                        Criar Primeiro
                                    </Link>
                                )}
                            </motion.div>
                        )}

                        {showEmptySearch && (
                            <motion.div
                                key="empty-search"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="flex flex-col items-center justify-center py-20 text-center"
                            >
                                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 text-gray-500 border border-white/5">
                                    <FaSearch size={32} />
                                </div>
                                <h3 className="text-xl font-bold font-sans text-white mb-2">Nenhum resultado encontrado</h3>
                                <p className="text-gray-400 font-mono text-sm mb-6">
                                    Não encontramos nada para "{searchTerm}".
                                </p>
                                <button
                                    onClick={() => setSearchTerm("")}
                                    className="px-6 py-2 rounded-full bg-electric-violet/10 border border-electric-violet/30 text-electric-violet hover:bg-electric-violet hover:text-white transition-all font-mono text-xs uppercase tracking-widest"
                                >
                                    Limpar Filtro
                                </button>
                            </motion.div>
                        )}

                        {showProjectList && (
                            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {projects.map((project) => (
                                    <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="group relative flex flex-col bg-[#050505]/20 border border-white/5 rounded-3xl overflow-hidden hover:border-electric-violet/30 hover:shadow-[0_0_40px_-10px_rgba(124,58,237,0.15)] transition-all duration-500">
                                        <div className="relative w-full aspect-[16/9] overflow-hidden bg-black/40">
                                            <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />

                                            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-2 z-20">
                                                <FaEye className="text-neon-cyan text-xs" />
                                                <span className="text-white text-xs font-mono font-bold">{project.views || 0}</span>
                                            </div>

                                            {isSuperAdmin ? (
                                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-sm z-30">
                                                    <Link href={`/screens/dashboard/edit/${project.id}`} className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black hover:bg-electric-violet hover:text-white transition-all transform hover:scale-110 shadow-lg"><FaEdit size={14} /></Link>
                                                    <button onClick={() => confirmDelete(project.id, project.title)} className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-all transform hover:scale-110 shadow-lg"><FaTrash size={14} /></button>
                                                    <button onClick={() => handleLinkClick(project.id, project.link)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white hover:text-black transition-all transform hover:scale-110 shadow-lg"><FaExternalLinkAlt size={14} /></button>
                                                </div>
                                            ) : (
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm z-30">
                                                    <button onClick={() => handleLinkClick(project.id, project.link)} className="px-6 py-2 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white hover:text-black transition-all flex items-center gap-2 font-mono text-xs uppercase">
                                                        <FaExternalLinkAlt /> Visualizar
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-6 flex flex-col flex-grow">
                                            <div className="flex justify-between items-start mb-2"><h2 className="text-lg font-bold font-sans text-white truncate pr-2 group-hover:text-electric-violet transition-colors">{project.title}</h2>{project.link.includes('github') && <FaGithub className="text-gray-600" />}</div>
                                            <div className="flex items-center gap-2 mb-6"><span className="w-1.5 h-1.5 rounded-full bg-electric-violet" /><span className="text-[10px] font-mono text-gray-500 uppercase tracking-wide">{formatDate(project.createdAt)}</span></div>
                                            <div className="mt-auto flex flex-wrap gap-2">{project.techs.slice(0, 3).map((t: any, i: any) => (<span key={i} className="text-[10px] font-mono text-gray-400 border border-white/5 px-3 py-1 rounded-full uppercase group-hover:border-white/10 group-hover:text-white transition-colors">{t}</span>))}{project.techs.length > 3 && <span className="text-[10px] font-mono text-gray-600 px-1 py-1">+{project.techs.length - 3}</span>}</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <ActionModal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} onConfirm={handleDelete} title="Excluir Projeto?" message={`Deseja apagar "${titleToDelete}"?`} confirmText="Sim, Excluir" cancelText="Cancelar" type="danger" />

            <ManageAdminsModal isOpen={adminModalOpen} onClose={() => setAdminModalOpen(false)} admins={adminsList} onAdd={addAdmin} onRemove={removeAdmin} />
        </div>
    );
};

export default Dashboard;