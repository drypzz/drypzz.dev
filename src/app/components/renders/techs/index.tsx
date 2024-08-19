"use client";

import { useState, useEffect } from "react";

import Images from "@/app/utils/image.props";

import "./index.style.css";

const Techs = () => {

    const [techsAndTools, setTechsAndTools] = useState<Images[]>([]);

    useEffect(() => {
        const fetchTechsAndTools = async () => {
            try {
                const response = await fetch("/api/getImages");
                const data = await response.json();
                setTechsAndTools(data);
            } catch (error) {
                console.error("Failed to fetch techs and tools:", error);
            }
        };

        fetchTechsAndTools();
    }, []);

    return (
        <>
            <section className="dev-techs">
                <div>
                    <h1 className="dev-title">👨‍💻 My Techs and Tools</h1>
                </div>
                <div className="dev-techs-container">
                    {techsAndTools.map((item, index) => (
                        <div key={index}>
                            <img draggable={false} src={item.src} alt={item.alt} title={item.title} />
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Techs;