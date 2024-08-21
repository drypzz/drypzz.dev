"use client";

import { useState, useEffect } from "react";

import Images from "@/app/utils/image.props";

import CustomTooltip from "../../hooks/tooltip";

import { motion } from 'framer-motion';

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
                    <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="dev-title">
                        👨‍💻 My Techs and Tools
                    </motion.h1>
                </div>
                <motion.div
                    initial={{ opacity: 0, scale: .7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 2 }}
                    className="dev-techs-container"
                >
                    {techsAndTools.map((item, index) => (
                        <div key={index}>
                            <CustomTooltip id={`dev-tooltip-${String(index)}`} content={(item.title == "cplusplus" ? "C++" : item.title)}>
                                <img draggable={false} src={item.src} alt={item.alt} title={item.title} />
                            </CustomTooltip>
                        </div>
                    ))}
                </motion.div>
            </section>
        </>
    );
};

export default Techs;