"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { FaArrowLeft, FaSave, FaTerminal } from "react-icons/fa";
import { ref, get, update } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/app/database/config";
import Loading from "@/app/components/layout/loading";
import { showNotify } from "@/app/utils/notify";

const AVAILABLE_TECHS = ["javascript", "typescript", "reactjs", "nextjs", "nodejs", "html", "css", "python", "java", "firebase", "tailwind"];

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

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                router.push("/screens/login");
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

    const toggleTech = (tech: string) => {
        setTechs(prev => prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]);
    };

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
                            <span className="font-mono text-neon-cyan text-xs tracking-widest uppercase mb-6 block flex items-center gap-2"><FaTerminal /> Stack</span>
                            <div className="flex flex-wrap gap-3">
                                {AVAILABLE_TECHS.map((tech) => (
                                    <button key={tech} type="button" onClick={() => toggleTech(tech)} className={`px-4 py-2 rounded-lg text-xs font-mono uppercase border transition-all ${techs.includes(tech) ? 'bg-electric-violet text-white border-electric-violet' : 'bg-white/5 border-white/10 text-gray-400'}`}>{tech}</button>
                                ))}
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