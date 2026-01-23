import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { ref, onValue, remove } from "firebase/database";
import { auth, db } from "@/app/database/config";
import { showNotify } from "@/app/utils/notify";

const useDashboard = () => {
    const router = useRouter();
    const [projects, setProjects] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    const logout = async () => {
        try {
            await signOut(auth);
            if (typeof window !== "undefined") {
                localStorage.removeItem("admin_avatar");
                localStorage.removeItem("admin_name");
                localStorage.removeItem("admin_email");
            }
            showNotify("info", "Sessão encerrada.");
            router.push("/screens/login");
        } catch (error) {
            console.error(error);
            showNotify("error", "Erro ao sair.");
        }
    };

    const deleteProject = async (id: string) => {
        try {
            await remove(ref(db, `projects/${id}`));
            showNotify("success", "Projeto removido com sucesso.");
        } catch (error) {
            console.error(error);
            showNotify("error", "Erro ao excluir projeto.");
        }
    };

    useEffect(() => {
        const unsubscribeAuth = auth.onAuthStateChanged((user) => {
            if (!user) router.push("/screens/login");
        });

        const projectsRef = ref(db, "projects");
        const unsubscribeDb = onValue(projectsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const projectList = Object.entries(data).map(([id, val]: any) => ({
                    id,
                    ...val,
                    techs: val.techs || []
                }));
                setProjects(projectList.reverse());
            } else {
                setProjects([]);
            }
            setLoading(false);
        });

        return () => {
            unsubscribeAuth();
            unsubscribeDb();
        };
    }, [router]);

    const filteredProjects = projects.filter((project) =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const techCount: Record<string, number> = {};
    projects.forEach(p => {
        p.techs?.forEach((t: string) => {
            techCount[t] = (techCount[t] || 0) + 1;
        });
    });

    const techDistribution = Object.entries(techCount)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([name, value]) => ({ name, value }));


    const timelineMap: Record<string, number> = {};

    const sortedForTimeline = [...projects].sort((a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    sortedForTimeline.forEach(p => {
        if (!p.createdAt) return;
        const date = new Date(p.createdAt);

        const key = date.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' });
        timelineMap[key] = (timelineMap[key] || 0) + 1;
    });

    const timelineData = Object.entries(timelineMap).map(([name, projetos]) => ({
        name,
        projetos
    }));

    const chartsData = {
        techDistribution,
        timelineData
    };

    const stats = {
        totalProjects: projects.length,
        uniqueTechs: Object.keys(techCount).length,
        lastProject: projects.length > 0 ? projects[0].title : "Nenhum"
    };

    return {
        projects: filteredProjects,
        allProjectsCount: projects.length,
        stats,
        chartsData,
        searchTerm,
        setSearchTerm,
        loading,
        logout,
        deleteProject
    };
};

export default useDashboard;