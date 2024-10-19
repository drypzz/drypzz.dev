"use client";

import CustomTooltip from "../../interactions/tooltip";

import { motion } from 'framer-motion';

import useGlobal from "@/app/hook/global";

import useTechs from "./index.rules";

import "./index.style.css";

const Techs = () => {

    const { getType, handleType } = useTechs();

    const { techsAndTools } = useGlobal();

    return (
        <>
            <section className="dev-techs">
                <div>
                    <motion.h1
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 0 }}
                    transition={{ duration: 1 }}
                    key={getType}
                    className="dev-title">
                        👨‍💻 My <span style={{textTransform: "capitalize"}}>{(getType == "tech" ? "technologie" : getType)}s</span>
                    </motion.h1>
                </div>
                <motion.div 
                    className="dev-techs-buttons"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 2 }}>
                    <div>
                        <button
                            onClick={handleType}
                            disabled={getType === "tech"}
                            >
                            💻 My Techs
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={handleType}
                            disabled={getType === "tool"}
                            >
                            🔨 My Tools
                        </button>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 0 }}
                    transition={{ duration: 1 }}
                    className="dev-techs-container"
                    key={getType}
                >
                    {techsAndTools.filter(item => getType === item.type).map((item, index) => (
                        <div key={index}>
                            <CustomTooltip id={`dev-tooltip-${String(index)}-${item.title}`} content={item.title === "cplusplus" ? "C++" : item.title}>
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