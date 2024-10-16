"use client";

import { useState } from "react";

import { showNotify } from "@/app/utils/notify";

import { db, storage } from "@/app/database/config";
import { ref as storageRef, deleteObject, listAll } from "firebase/storage";
import { ref as dbRef, onValue, remove } from "firebase/database";

interface gProjectsProps {
    title: string;
    link: string;
    techs: string[];
    imageUrl: string;
}

interface gImagesProps {
    src: string;
    alt: string;
    title: string;
}

const useGlobal = () => {

    const [projects, setProjects] = useState<gProjectsProps[]>([]);
    const [techsAndTools, setTechsAndTools] = useState<gImagesProps[]>([]);

    const fetchProjects = () => {
        const projectsRef = dbRef(db, 'projects');
        onValue(projectsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const projectList = Object.values(data) as gProjectsProps[];
                setProjects(projectList);
            }
        });
    };

    const fetchTechsAndTools = async () => {
        try {
            const response = await fetch("/api/getImages");
            const data: gImagesProps[] = await response.json();
            setTechsAndTools(data);
        } catch (error) {
            console.error("Failed to fetch techs and tools:", error);
        }
    };
    
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

    return {
        projects,
        techsAndTools,
        deleteProject,
        fetchProjects,
        fetchTechsAndTools,
    };
};

export default useGlobal;