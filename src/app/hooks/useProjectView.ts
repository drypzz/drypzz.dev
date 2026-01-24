import { ref, runTransaction } from "firebase/database";

import { db } from "@/app/database/config";

export const useProjectView = () => {
    const incrementView = async (projectId: string) => {
        if (!projectId) return;
        try {
            const projectRef = ref(db, `projects/${projectId}/views`);
            await runTransaction(projectRef, (currentViews) => {
                return (currentViews || 0) + 1;
            });
        } catch (error) {
            console.error("Erro ao incrementar view:", error);
        }
    };

    return { incrementView };
};