"use client";

import { useState, useEffect, useRef } from 'react';

import { auth } from "@/app/database/config";

import useGlobal from '@/app/hook/global';

const useProjects = () => {

    const {
        fetchProjects,
        deleteProject,
        projects,
        techsAndTools,
        fetchTechsAndTools,
    } = useGlobal();

    const [loggedIn, setLoggedIn] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState({ src: '', alt: '' });

    const unsubscribeRef = useRef<(() => void) | null>(null);

    const openModal = (src: string, alt: string) => {
        setModalImage({ src, alt });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    
    useEffect(() => {
        
        unsubscribeRef.current = auth.onAuthStateChanged(user => {
            setLoggedIn(!!user);
        });
        
        fetchProjects();
        fetchTechsAndTools();

        return () => {
            unsubscribeRef.current && unsubscribeRef.current();
        };

    }, [fetchProjects, fetchTechsAndTools]);

    const findImageUrl = (tech: string): string | undefined => {
        const image = techsAndTools.find(img => img.title.toLowerCase() === tech.toLowerCase());
        return image ? image.src : undefined;
    };

    return {
        projects,
        loggedIn,
        isModalOpen,
        modalImage,
        openModal,
        closeModal,
        findImageUrl,
        deleteProject
    };
};

export default useProjects;
