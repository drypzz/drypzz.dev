"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { ref, get, remove } from "firebase/database";
import { db } from "@/app/database/config";
import { showNotify } from "@/app/utils/notify";

export interface Project {
    id: string;
    title: string;
    description?: string;
    link: string;
    imageUrl: string;
    techs: string[];
    createdAt?: string;
    views?: number;
}

interface GlobalContextProps {
    projects: Project[];
    loading: boolean;
    fetchProjects: () => Promise<void>;
    deleteProject: (id: string) => Promise<void>;
}

const defaultContext: GlobalContextProps = {
    projects: [],
    loading: false,
    fetchProjects: async () => console.warn("GlobalProvider não encontrado!"),
    deleteProject: async () => console.warn("GlobalProvider não encontrado!")
};

const GlobalContext = createContext<GlobalContextProps>(defaultContext);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProjects = useCallback(async () => {
        setLoading(true);
        try {
            const projectsRef = ref(db, 'projects');
            const snapshot = await get(projectsRef);

            if (snapshot.exists()) {
                const data = snapshot.val();
                
                const formattedProjects = Object.entries(data).map(([key, value]: [string, any]) => ({
                    id: key, 
                    ...value,
                    techs: value.techs ? (Array.isArray(value.techs) ? value.techs : Object.values(value.techs)) : []
                }));

                setProjects(formattedProjects);
            } else {
                setProjects([]);
            }
        } catch (error) {
            console.error("Erro ao buscar projetos:", error);
            showNotify("error", "Falha ao carregar projetos.");
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteProject = async (id: string) => {
        try {
            const projectRef = ref(db, `projects/${id}`);
            await remove(projectRef);
            setProjects(prevProjects => prevProjects.filter(item => item.id !== id));
            showNotify("success", "Projeto removido com sucesso.");
        } catch (error) {
            console.error("Erro ao deletar:", error);
            showNotify("error", "Erro ao deletar projeto.");
        }
    };

    return (
        <GlobalContext.Provider value={{ projects, loading, fetchProjects, deleteProject }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default function useGlobal() {
    return useContext(GlobalContext);
}