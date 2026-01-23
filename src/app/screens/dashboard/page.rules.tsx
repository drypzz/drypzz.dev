import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/app/database/config";
import { signOut } from "firebase/auth";
import { ref, onValue, remove, push, set } from "firebase/database";
import { showNotify } from "@/app/utils/notify";

interface AdminUser {
    id: string;
    email: string;
    role: "super" | "mod";
    createdAt: string;
}

const useDashboard = () => {
    const router = useRouter();

    const [projects, setProjects] = useState<any[]>([]);
    const [allProjectsCount, setAllProjectsCount] = useState(0);
    const [stats, setStats] = useState({ totalProjects: 0, uniqueTechs: 0, lastProject: "" });
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const [adminsList, setAdminsList] = useState<AdminUser[]>([]);
    const [loadingAdmins, setLoadingAdmins] = useState(false);

    const logout = async (autoKick = false) => {
        try {
            await signOut(auth);
            if (typeof window !== "undefined") {
                localStorage.clear();
            }
            if (autoKick) {
                showNotify("error", "Sua permissão foi revogada.");
            } else {
                showNotify("info", "Sessão encerrada.");
            }
            router.push("/screens/login");
        } catch (error) {
            console.error(error);
            showNotify("error", "Erro ao sair.");
        }
    };

    useEffect(() => {
        let isMounted = true;

        const checkPermissionStatus = () => {
            if (typeof window === "undefined") return;

            const myEmail = localStorage.getItem("admin_email");

            if (!myEmail) return;

            const adminsRef = ref(db, 'admins');

            const unsubscribe = onValue(adminsRef, (snapshot) => {
                if (!isMounted) return;

                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const allAdmins = Object.values(data) as AdminUser[];

                    const amIStillAdmin = allAdmins.some(
                        (admin) => admin.email.toLowerCase() === myEmail.toLowerCase()
                    );

                    if (!amIStillAdmin) {
                        console.warn("⛔ Permissão revogada: Email não encontrado no banco.");
                        logout(true);
                    } else {
                        const myUser = allAdmins.find(a => a.email.toLowerCase() === myEmail.toLowerCase());
                        if (myUser && myUser.role !== localStorage.getItem("admin_role")) {
                            localStorage.setItem("admin_role", myUser.role);
                            window.location.reload();
                        }
                    }
                } else {
                    logout(true);
                }
            });

            return unsubscribe;
        };

        const unsub = checkPermissionStatus();

        return () => {
            isMounted = false;
            if (unsub && typeof unsub === 'function') unsub();
        };
    }, []);

    useEffect(() => {
        const unsubscribeAuth = auth.onAuthStateChanged((user) => {
            if (!user) router.push("/screens/login");
        });

        const projectsRef = ref(db, 'projects');
        const unsubscribeProjects = onValue(projectsRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const projectsArray = Object.entries(data).map(([key, value]: [string, any]) => ({
                    id: key,
                    ...value,
                    techs: value.techs || []
                })).reverse();

                setProjects(projectsArray);
                setAllProjectsCount(projectsArray.length);

                const techs = new Set();
                projectsArray.forEach((p: any) => p.techs?.forEach((t: string) => techs.add(t)));

                setStats({
                    totalProjects: projectsArray.length,
                    uniqueTechs: techs.size,
                    lastProject: projectsArray.length > 0 ? projectsArray[0].title : "Nenhum"
                });
            } else {
                setProjects([]);
                setAllProjectsCount(0);
                setStats({ totalProjects: 0, uniqueTechs: 0, lastProject: "Nenhum" });
            }
            setLoading(false);
        });

        return () => {
            unsubscribeAuth();
            unsubscribeProjects();
        };
    }, [router]);

    const fetchAdmins = () => {
        setLoadingAdmins(true);
        const adminsRef = ref(db, 'admins');
        const unsubscribe = onValue(adminsRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const formattedList: AdminUser[] = Object.entries(data).map(([key, value]: [string, any]) => ({
                    ...value,
                    id: key
                }));
                setAdminsList(formattedList);
            } else {
                setAdminsList([]);
            }
            setLoadingAdmins(false);
        });
        return unsubscribe;
    };

    const addAdmin = async (newEmail: string) => {
        if (!newEmail.includes("@")) {
            showNotify("error", "Email inválido.");
            return;
        }
        try {
            const exists = adminsList.some(a => a.email.toLowerCase() === newEmail.toLowerCase());
            if (exists) {
                showNotify("error", "Este email já possui acesso.");
                return;
            }

            const adminsRef = ref(db, 'admins');
            const newAdminRef = push(adminsRef);

            await set(newAdminRef, {
                id: newAdminRef.key,
                email: newEmail.toLowerCase(),
                role: "mod",
                createdAt: new Date().toISOString()
            });
            showNotify("success", "Moderador adicionado!");
        } catch (error) {
            showNotify("error", "Erro ao adicionar.");
        }
    };

    const removeAdmin = async (targetId: string) => {
        const targetAdmin = adminsList.find(a => a.id === targetId);
        if (!targetAdmin) return;

        if (targetAdmin.role === 'super') {
            showNotify("error", "Impossível remover Super Admin.");
            return;
        }

        try {
            const adminRef = ref(db, `admins/${targetId}`);
            await remove(adminRef);
            showNotify("success", "Acesso removido.");
        } catch (error) {
            showNotify("error", "Erro ao remover.");
        }
    };

    const deleteProject = async (id: string) => {
        try {
            const projectRef = ref(db, `projects/${id}`);
            await remove(projectRef);
            showNotify("success", "Projeto excluído!");
        } catch (error) {
            showNotify("error", "Falha ao excluir.");
        }
    };

    const filteredProjects = projects.filter((project) =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const chartsData = useMemo(() => {
        const techCount: Record<string, number> = {};
        const timelineMap: Record<string, number> = {};
        const sortedForTimeline = [...projects].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

        projects.forEach(p => p.techs?.forEach((t: string) => techCount[t] = (techCount[t] || 0) + 1));
        sortedForTimeline.forEach(p => {
            if (p.createdAt) {
                const key = new Date(p.createdAt).toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' });
                timelineMap[key] = (timelineMap[key] || 0) + 1;
            }
        });

        return {
            techDistribution: Object.entries(techCount).sort(([, a], [, b]) => b - a).slice(0, 5).map(([name, value]) => ({ name, value })),
            timelineData: Object.entries(timelineMap).map(([name, projetos]) => ({ name, projetos }))
        };
    }, [projects]);

    return {
        projects: filteredProjects,
        allProjectsCount,
        stats,
        chartsData,
        searchTerm,
        setSearchTerm,
        loading,
        logout,
        deleteProject,
        adminsList,
        fetchAdmins,
        addAdmin,
        removeAdmin,
        loadingAdmins
    };
};

export default useDashboard;