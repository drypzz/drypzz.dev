"use client";

import { useState, useEffect, useRef } from 'react';

import { db, auth, storage } from "@/app/database/config";
import { ref as storageRef, deleteObject, listAll } from "firebase/storage";
import { ref as dbRef, onValue, remove } from "firebase/database";

import { showNotify } from '@/app/utils/notify';

import ProjectProps from './index.props';
import Image from "@/app/utils/image.props";

const useProjects = () => {
    const [projects, setProjects] = useState<ProjectProps[]>([]);
    const [techsAndTools, setTechsAndTools] = useState<Image[]>([]);

    const [loading, setLoading] = useState(true);

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
        const fetchProjects = () => {
            const projectsRef = dbRef(db, 'projects');
            onValue(projectsRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const projectList = Object.values(data) as ProjectProps[];
                    setProjects(projectList);
                }
                setLoading(false);
            });
        };

        const fetchTechsAndTools = async () => {
            try {
                const response = await fetch("/api/getImages");
                const data: Image[] = await response.json();
                setTechsAndTools(data);
            } catch (error) {
                console.error("Failed to fetch techs and tools:", error);
            }
        };

        unsubscribeRef.current = auth.onAuthStateChanged(user => {
            setLoggedIn(!!user);
        });

        fetchProjects();
        fetchTechsAndTools();

        return () => {
            unsubscribeRef.current && unsubscribeRef.current();
        };
    }, []);

    const deleteProject = async (title: string) => {
        if (!confirm(`Are you sure you want to delete the project "${title}"?`)) {
            return;
        }

        const projectRef = dbRef(db, `projects/${title}`);
        const folderRef = storageRef(storage, `images/${title}`);

        try {
            await remove(projectRef);
            showNotify("success", "Project deleted successfully.");

            const listResult = await listAll(folderRef);
            const deletePromises = listResult.items.map(item => deleteObject(item));
            await Promise.all(deletePromises);

            setProjects(prevProjects => prevProjects.filter(project => project.title !== title));
        } catch (error) {
            console.error("Error deleting project or files:", error);
        }
    };

    const findImageUrl = (tech: string): string | undefined => {
        const image = techsAndTools.find(img => img.title.toLowerCase() === tech.toLowerCase());
        return image ? image.src : undefined;
    };

    return {
        projects,
        loading,
        loggedIn,
        isModalOpen,
        modalImage,
        openModal,
        closeModal,
        deleteProject,
        findImageUrl,
    };
};

export default useProjects;
