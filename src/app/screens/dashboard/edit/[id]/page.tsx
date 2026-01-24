"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { FaArrowLeft, FaSave, FaTerminal, FaSearch } from "react-icons/fa";
import { ref, get, update } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/app/database/config";
import Loading from "@/app/components/layout/loading";
import { showNotify } from "@/app/utils/notify";
import { TECH_DATA } from "@/app/utils/constants";

const EditProject = () => {
    const router = useRouter();
    const { id } = useParams();
    const projectId = id as string;

    const [loadingData, setLoadingData] = useState(true);
    const [saving, setSaving] = useState(false);

    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [techs, setTechs] = useState<string[]>([]);
    const [imageUrl, setImageUrl] = useState("");
    const [techSearch, setTechSearch] = useState("");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                router.push("/screens/login");
                return;
            }
            const sessionStr = localStorage.getItem("admin_session");
            let role = "mod";
            if (sessionStr) {
                const session = JSON.parse(sessionStr);
                role = session.role || "mod";
            }
            if (role !== "super") {
                showNotify("error", "Acesso restrito a Super Admins.");
                router.push("/screens/dashboard");
                return;
            }
            if (projectId) {
                try {
                    const snapshot = await get(ref(db, `projects/${projectId}`));
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        setTitle(data.title);
                        setLink(data.link);
                        setTechs(data.techs || []);
                        setImageUrl(data.imageUrl);
                    } else {
                        showNotify("error", "Projeto não encontrado.");
                        router.push("/screens/dashboard");
                    }
                } catch (error) {
                    console.error(error);
                    showNotify("error", "Erro ao carregar dados.");
                } finally {
                    setLoadingData(false);
                }
            }
        });
        return () => unsubscribe();
    }, [projectId, router]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await update(ref(db, `projects/${projectId}`), {
                title,
                link,
                techs,
                imageUrl
            });
            showNotify("success", "Atualizado com sucesso!");
            router.push("/screens/dashboard");
        } catch (error) {
            showNotify("error", "Erro ao salvar.");
        } finally {
            setSaving(false);
        }
    };

    const toggleTech = (techId: string) => {
        setTechs(prev => prev.includes(techId) ? prev.filter(t => t !== techId) : [...prev, techId]);
    };

    const filteredTechs = TECH_DATA.filter(t =>
        t.name.toLowerCase().includes(techSearch.toLowerCase())
    );

    if (loadingData) return <Loading fullScreen={true} text="AUTHENTICATING..." />;

    return (
        <div className="min-h-screen bg-transparent py-20 pb-40">
            <div className="w-full max-w-[1000px] mx-auto px-6 md:px-12">
                <div className="flex items-center justify-between mb-12">
                    <Link href="/screens/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white font-mono text-xs uppercase tracking-wider transition-colors"><FaArrowLeft /> Cancelar</Link>
                    <h1 className="text-2xl font-bold font-sans text-white">Editar Projeto</h1>
                </div>

                <div className="bg-[#0f0728]/40 backdrop-blur-xl border border-white/5 p-8 md:p-12 rounded-[2rem] shadow-2xl">
                    <form onSubmit={handleUpdate} className="flex flex-col gap-12">

                        <div className="relative w-full h-64 rounded-2xl overflow-hidden border border-white/10">
                            <img src={imageUrl} className="w-full h-full object-cover opacity-80" alt="Preview" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="group relative">
                                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="block w-full py-4 px-0 text-white bg-transparent border-0 border-b border-white/20 font-sans text-lg focus:border-electric-violet focus:outline-none" placeholder=" " />
                                <label className="absolute text-sm text-gray-500 top-3 -z-10 transform -translate-y-6 scale-75 origin-[0]">Título do Projeto</label>
                            </div>
                            <div className="group relative">
                                <input type="url" value={link} onChange={(e) => setLink(e.target.value)} className="block w-full py-4 px-0 text-white bg-transparent border-0 border-b border-white/20 font-sans text-lg focus:border-electric-violet focus:outline-none" placeholder=" " />
                                <label className="absolute text-sm text-gray-500 top-3 -z-10 transform -translate-y-6 scale-75 origin-[0]">Link</label>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <span className="font-mono text-neon-cyan text-xs tracking-widest uppercase block flex items-center gap-2">
                                    <FaTerminal /> Stack Tecnológica
                                </span>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Buscar..."
                                        className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs text-white focus:outline-none focus:border-electric-violet w-32"
                                        value={techSearch}
                                        onChange={(e) => setTechSearch(e.target.value)}
                                    />
                                    <FaSearch className="absolute right-3 top-1.5 text-gray-500 text-[10px]" />
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3 max-h-60 overflow-y-auto custom-scrollbar p-1">
                                {filteredTechs.map((tech) => {
                                    const isSelected = techs.includes(tech.id);
                                    const Icon = tech.icon;
                                    return (
                                        <button
                                            key={tech.id}
                                            type="button"
                                            onClick={() => toggleTech(tech.id)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono uppercase border transition-all ${isSelected ? 'bg-electric-violet text-white border-electric-violet' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'}`}
                                        >
                                            <Icon size={14} />
                                            {tech.name}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        <button type="submit" disabled={saving} className="w-full py-5 rounded-xl bg-white text-black font-bold font-sans uppercase tracking-widest hover:bg-electric-violet hover:text-white transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-50">
                            {saving ? "Salvando..." : <>Salvar Alterações <FaSave /></>}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProject;