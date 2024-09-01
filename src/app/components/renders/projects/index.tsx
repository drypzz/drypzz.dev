"use client";

import React, { useState, useEffect } from 'react';
import Link from "next/link";

import { SkewLoader } from 'react-spinners';

import { motion } from 'framer-motion';

import { db, auth, storage } from "@/app/database/config";
import { ref as storageRef, deleteObject, listAll } from "firebase/storage";
import { ref as dbRef, onValue, remove } from "firebase/database";

import CustomTooltip from '@/app/components/hooks/tooltip';

import Image from "@/app/utils/image.props";
import ProjectProps from './index.props';

import Modal from '../../hooks/modal';

import "./index.style.css";
import { showNotify } from '@/app/utils/notify';

const Projects = () => {
    const [projects, setProjects] = useState<ProjectProps[]>([]);
    const [techsAndTools, setTechsAndTools] = useState<Image[]>([]);
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState({ src: '', alt: '' });

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

        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
        });
        
        fetchProjects();
        fetchTechsAndTools();
        
        return () => {
            unsubscribe();
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

    if (loading) {
        return <SkewLoader color="#037edb" loading size={30} />;
    }

    if (projects.length === 0) {
        return (
            <p style={{
                color: "red",
                fontSize: "20px",
                textAlign: "center",
                marginTop: "20px"
            }}>No projects found.</p>
        );
    }

    return (
        <>
            <section>
                <div>
                    <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="dev-title">
                        📊 My Projects
                    </motion.h1>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 2 }}
                    className="dev-projects-container"
                >
                    {projects.map((e: ProjectProps, index: number) => (
                        <main className="dev-cards" key={index}>
                            <div className="dev-cards-img">
                                <img
                                    draggable="false"
                                    src={e.imageUrl}
                                    alt={e.title}
                                    title={`Printscreen do projeto: ${e.title}`}
                                    onClick={() => openModal(e.imageUrl, e.title)}
                                />
                            </div>
                            <div className="dev-cards-title">
                                <h2>{e.title}</h2>
                            </div>
                            <div className="dev-cards-icons">
                                {e.techs.map((tech, techIndex) => (
                                    <div key={index}>
                                        <CustomTooltip id={`dev-tooltip-${index}-${techIndex}-${tech}`} content={(tech === "cplusplus" ? "C++" : tech)}>
                                            <img 
                                                src={findImageUrl(tech)} 
                                                alt={tech}
                                                title={tech}
                                            />
                                        </CustomTooltip>
                                    </div>
                                ))}
                            </div>
                            <Link target="_blank" className="dev-cards-btn" href={e.link}>
                                View {e.link.includes("github") ? "on GitHub" : "Project"}
                            </Link>
                            {loggedIn && (
                                <button onClick={() => deleteProject(e.title)} className="dev-cards-btn delete">Delete</button>
                            )}
                        </main>
                    ))}
                </motion.div>
            </section>
            <Modal
                isOpen={isModalOpen} 
                onClose={closeModal} 
                imageUrl={modalImage.src} 
                altText={modalImage.alt} 
            />
        </>
    );
};

export default Projects;
