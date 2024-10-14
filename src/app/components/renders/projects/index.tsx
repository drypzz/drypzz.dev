"use client";

import React from 'react';
import Link from "next/link";

import { SkewLoader } from 'react-spinners';
import { motion } from 'framer-motion';

import CustomTooltip from '@/app/components/hooks/tooltip';

import Modal from '../../hooks/modal';

import useProjects from './index.rules';

import "./index.style.css";

const Projects = () => {
    const {
        projects,
        loading,
        loggedIn,
        isModalOpen,
        modalImage,
        openModal,
        closeModal,
        deleteProject,
        findImageUrl,
    } = useProjects();

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
                    {projects.map((e, index) => (
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
                                    <div key={techIndex}>
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
