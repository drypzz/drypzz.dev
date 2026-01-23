"use client";

import { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import { db } from '@/app/database/config';

import { Project } from '@/app/global/global'; 

const useProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState({ src: '', alt: '' });

    const fetchProjects = async () => {
        try {
            const snapshot = await get(ref(db, 'projects'));
            if (snapshot.exists()) {
                const data = snapshot.val();
                const formatted = Object.entries(data).map(([key, value]: [string, any]) => ({
                    id: key,
                    ...value,
                    techs: value.techs || []
                }));
                setProjects(formatted);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const openModal = (src: string, alt: string) => {
        setModalImage({ src, alt });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return {
        projects,
        loading,
        isModalOpen,
        modalImage,
        openModal,
        closeModal
    };
};

export default useProjects;