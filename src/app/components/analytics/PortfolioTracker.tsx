"use client";

import { useEffect, useRef } from 'react';
import { ref, get, runTransaction } from 'firebase/database';
import { db } from '@/app/database/config';

const TARGET_PROJECT_TITLE = "DRYPZZ DEV (v4)";

const PortfolioTracker = () => {
    const hasTracked = useRef(false);

    useEffect(() => {
        if (hasTracked.current) return;
        hasTracked.current = true;

        const trackPortfolioView = async () => {
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
                        await runTransaction(viewRef, (currentViews) => {
                            return (currentViews || 0) + 1;
                        });
                    }
                }
            } catch (error) {
                console.error("Erro ao rastrear visualização:", error);
            }
        };

        trackPortfolioView();

    }, []);

    return null;
};

export default PortfolioTracker;