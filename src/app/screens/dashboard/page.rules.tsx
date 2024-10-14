"use client";

import { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { db, auth, storage } from "@/app/database/config";
import { ref as storageRef, deleteObject, listAll } from "firebase/storage";
import { ref as dbRef, onValue, remove } from "firebase/database";

import { ListProps, TechProps } from './page.props';

import { showNotify } from '@/app/utils/notify';

const useDashboard = () => {
    const router = useRouter();

    const [loading, setLoading] = useState(true);

    const [projects, setProjects] = useState<ListProps[]>([]);
    const [techsAndTools, setTechsAndTools] = useState<TechProps[]>([]);

    useEffect(() => {
        const fetchProjects = () => {
            const projectsRef = dbRef(db, 'projects');
            onValue(projectsRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const projectList = Object.values(data) as ListProps[];
                    setProjects(projectList);
                }
                setLoading(false);
            });
        };

        const fetchTechsAndTools = async () => {
            try {
                const response = await fetch("/api/getImages");
                const data: TechProps[] = await response.json();
                setTechsAndTools(data);
            } catch (error) {
                console.error("Failed to fetch techs and tools:", error);
            }
        };

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
    

    const findImageUrl = (tech: string) => {
        const image = techsAndTools.find(img => img.title.toLowerCase() === tech.toLowerCase());
        return image ? image.src : undefined;
    };

    return {
        projects,
        loading,
        deleteProject,
        findImageUrl,
        auth,
        router
    };
};

export default useDashboard;