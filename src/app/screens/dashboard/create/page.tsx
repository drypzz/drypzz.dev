"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaArrowLeft, FaSave, FaCloudUploadAlt, FaTimes, FaImage, FaTerminal, FaSearch } from "react-icons/fa";

import useCreate from "./page.rules";
import Loading from "@/app/components/layout/loading";
import { TECH_DATA } from "@/app/utils/constants";

const Create = () => {
    const {
        title, setTitle,
        link, setLink,
        techs, setTechs,
        imagePreview, handleFileChange, setImageFile, setImagePreview,
        handleCreateProject,
        loading,
        pageLoading
    } = useCreate();

    const [techSearch, setTechSearch] = useState("");

    const toggleTech = (techId: string) => {
        if (techs.includes(techId)) {
            setTechs(techs.filter((t: string) => t !== techId));
        } else {
            setTechs([...techs, techId]);
        }
    };

    const clearImage = () => {
        setImageFile(null);
        setImagePreview("");
    };

    const filteredTechs = TECH_DATA.filter(t =>
        t.name.toLowerCase().includes(techSearch.toLowerCase())
    );

    if (pageLoading) {
        return (
            <div className="min-h-screen bg-transparent flex items-center justify-center">
                <Loading fullScreen={false} text="AUTHENTICATING..." />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-transparent py-20 pb-40">
            <div className="w-full max-w-[1000px] mx-auto px-6 md:px-12">

                <div className="flex items-center justify-between mb-12">
                    <Link
                        href="/screens/dashboard"
                        className="flex items-center gap-2 text-gray-400 hover:text-white font-mono text-xs uppercase tracking-wider transition-colors"
                    >
                        <FaArrowLeft /> Voltar
                    </Link>
                    <h1 className="text-2xl font-bold font-sans text-white">Adicionar Projeto</h1>
                </div>

                <div className="bg-[#0f0728]/40 backdrop-blur-xl border border-white/5 p-8 md:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden">
                    <form onSubmit={(e) => { e.preventDefault(); handleCreateProject(); }} className="flex flex-col gap-12 relative z-10">
                        <div>
                            <span className="font-mono text-neon-cyan text-xs tracking-widest uppercase mb-4 block flex items-center gap-2">
                                <FaImage /> Capa do Projeto
                            </span>
                            {!imagePreview ? (
                                <label className="group flex flex-col items-center justify-center w-full h-64 border border-dashed border-white/20 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] hover:border-electric-violet/50 transition-all duration-300 relative overflow-hidden">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6 z-10">
                                        <div className="p-4 rounded-full bg-white/5 mb-4 group-hover:scale-110 group-hover:bg-electric-violet group-hover:text-white transition-all duration-300 text-gray-400">
                                            <FaCloudUploadAlt className="w-8 h-8" />
                                        </div>
                                        <p className="mb-2 text-sm text-gray-300 font-sans">Clique ou arraste a imagem aqui</p>
                                        <p className="text-xs text-gray-500 font-mono">PNG, JPG (MAX. 5MB)</p>
                                    </div>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                </label>
                            ) : (
                                <div className="relative w-full h-64 rounded-2xl overflow-hidden border border-white/10 group">
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                        <button type="button" onClick={clearImage} className="px-6 py-3 bg-red-500/20 border border-red-500 text-red-100 rounded-xl flex items-center gap-2 hover:bg-red-500 hover:text-white transition-all font-mono text-xs uppercase">
                                            <FaTimes /> Remover Imagem
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* --- CAMPOS DE TEXTO --- */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="group relative">
                                <input
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="block w-full py-4 px-0 text-white bg-transparent border-0 border-b border-white/20 appearance-none focus:outline-none focus:ring-0 focus:border-electric-violet peer font-sans text-lg placeholder-transparent"
                                    placeholder=" "
                                    required
                                />
                                <label htmlFor="title" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-electric-violet peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Nome do Projeto
                                </label>
                            </div>
                            <div className="group relative">
                                <input
                                    type="url"
                                    id="link"
                                    value={link}
                                    onChange={(e) => setLink(e.target.value)}
                                    className="block w-full py-4 px-0 text-white bg-transparent border-0 border-b border-white/20 appearance-none focus:outline-none focus:ring-0 focus:border-electric-violet peer font-sans text-lg placeholder-transparent"
                                    placeholder=" "
                                    required
                                />
                                <label htmlFor="link" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-electric-violet peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Link do Repositório/Deploy
                                </label>
                            </div>
                        </div>

                        {/* --- SELETOR DE STACKS --- */}
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <span className="font-mono text-neon-cyan text-xs tracking-widest uppercase block flex items-center gap-2">
                                    <FaTerminal /> Stack Tecnológica
                                </span>
                                {/* Searchzinho simples */}
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
                                    // Compara pelo ID (minusculo) para ser consistente
                                    const isSelected = techs.includes(tech.id);
                                    const Icon = tech.icon; // Componente Icone

                                    return (
                                        <button
                                            key={tech.id}
                                            type="button"
                                            onClick={() => toggleTech(tech.id)}
                                            className={`
                                                flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all border
                                                ${isSelected
                                                    ? 'bg-electric-violet text-white border-electric-violet shadow-[0_0_15px_rgba(124,58,237,0.4)]'
                                                    : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
                                                }
                                            `}
                                        >
                                            <Icon size={14} />
                                            {tech.name}
                                        </button>
                                    );
                                })}
                            </div>
                            {filteredTechs.length === 0 && (
                                <p className="text-gray-500 text-xs mt-2 font-mono">Nenhuma tecnologia encontrada.</p>
                            )}
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-5 rounded-xl bg-white text-black font-bold font-sans uppercase tracking-widest hover:bg-electric-violet hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] flex items-center justify-center gap-3 disabled:opacity-50"
                            >
                                {loading ? <>Salvando...</> : <>Publicar Projeto <FaSave /></>}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Create;