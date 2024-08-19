"use client";

import React, { useState, useEffect } from 'react';
import Link from "next/link";

import { db, auth } from "@/app/database/config";
import { ref as dbRef, onValue, remove } from "firebase/database";

import { SkewLoader } from 'react-spinners';

import Image from "@/app/utils/image.props";
import ProjectProps from './index.props';

import "./index.style.css";

const Projects = () => {
    const [projects, setProjects] = useState<ProjectProps[]>([]);
    const [techsAndTools, setTechsAndTools] = useState<Image[]>([]);
    const [loading, setLoading] = useState(true);

    const [loggedIn, setLoggedIn] = useState(false);

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
            if (!user) {
                setLoggedIn(false);
            } else {
                setLoggedIn(true);
            }
        });

        return () => {
            unsubscribe();
            fetchTechsAndTools();
            fetchProjects();
        };
        
    }, []);

    const deleteProject = (title: string) => {
        if (!confirm(`Are you sure you want to delete the project "${title}"?`)) {
            return;
        }

        const projectRef = dbRef(db, `projects/${title}`);
        remove(projectRef)
            .then(() => {
                console.log(`Project "${title}" deleted successfully.`);
                setProjects(prevProjects => prevProjects.filter(project => project.title !== title));
            })
            .catch((error) => {
                console.error("Error deleting project:", error);
            });
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
                    <h1 className="dev-title">📊 My Projects</h1>
                </div>
                <div className="dev-projects-container">
                    {projects.map((e: ProjectProps, index: number) => (
                        <main className="dev-cards" key={index}>
                            <div className="dev-cards-img">
                                <img src={e.imageUrl} alt={e.title} />
                            </div>
                            <div className="dev-cards-title">
                                <h2>{e.title}</h2>
                            </div>
                            <div className="dev-cards-icons">
                                {e.techs.map((tech, index) => (
                                    <div key={index}>
                                        <img 
                                            src={findImageUrl(tech)} 
                                            alt={tech}
                                            title={tech}
                                        />
                                    </div>
                                ))}
                            </div>
                            <Link target="_blank" className="dev-cards-btn" href={e.link}>View on Github</Link>
                            {loggedIn && (
                                <button onClick={() => deleteProject(e.title)} className="dev-cards-btn delete">Delete</button>
                            )}
                        </main>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Projects;
