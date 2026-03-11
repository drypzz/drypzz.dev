'use server'

import { db, ref, get, runTransaction } from '@/app/database/config';

export async function incrementViewAction() {
    const TARGET_PROJECT_TITLE = "DRYPZZ DEV (v4)";
    try {
        const projectsRef = ref(db, 'projects');
        const snapshot = await get(projectsRef);

        if (snapshot.exists()) {
            const data = snapshot.val();
            const projectEntry = Object.entries(data).find(
                ([_, val]: any) => val.title === TARGET_PROJECT_TITLE
            );

            if (projectEntry) {
                const [id] = projectEntry;
                const viewRef = ref(db, `projects/${id}/views`);
                await runTransaction(viewRef, (currentViews: any) => {
                    return (currentViews || 0) + 1;
                });
                return { success: true };
            }
        }
    } catch (e) {
        console.error("Erro no servidor:", e);
    }
};