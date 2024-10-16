"use client";

import { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { auth } from "@/app/database/config";

import useGlobal from '@/app/hook/global';

const useDashboard = () => {
    const router = useRouter();

    const { 
        fetchProjects,
        projects,
        techsAndTools,
        fetchTechsAndTools,
        deleteProject
    } = useGlobal();

    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged(user => {
            if (!user) {
                router.push('/login');
            } else {
                fetchProjects();
                fetchTechsAndTools();
            }
        });
    
        return () => {
            unsubscribe();
        };
    }, [router]);
    

    const findImageUrl = (tech: string) => {
        const image = techsAndTools.find(img => img.title.toLowerCase() === tech.toLowerCase());
        return image ? image.src : undefined;
    };

    return {
        projects,
        deleteProject,
        findImageUrl,
        auth,
        router
    };
};

export default useDashboard;