"use client";

import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '@/app/database/config';

import { Project } from '@/app/global/global';

const useProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<boolean>(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState({ src: '', alt: '' });

    useEffect(() => {
        const projectsRef = ref(db, 'projects');

        const unsubscribe = onValue(projectsRef,
            (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();

                    const formatted = Object.entries(data).map(([key, value]: [string, any]) => ({
                        id: key,
                        ...value,
                        techs: value.techs || [],
                        views: value.views || 0
                    }));

                    setProjects(formatted);
                    setError(false);
                } else {
                    setProjects([]);
                    setError(false);
                }
                setLoading(false);
            },
            (errorObject) => {
                console.error("The read failed: " + errorObject.name);
                setLoading(false);
                setError(true);
            }
        );

        return () => unsubscribe();
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
        error,
        isModalOpen,
        modalImage,
        openModal,
        closeModal
    };
};

export default useProjects;