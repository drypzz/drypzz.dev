"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TECH_DATA } from "@/app/utils/constants";

const CATEGORIES = ["All", "Frontend", "Backend", "Tools"];

const ModernTechs = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const filteredTechs = activeCategory === "All"
    ? TECH_DATA
    : TECH_DATA.filter(tech => tech.category === activeCategory);

  return (
    <section className="relative py-32 overflow-hidden" id="techs">

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-electric-violet/5 via-transparent to-transparent pointer-events-none" />

      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-neon-cyan text-sm tracking-widest uppercase mb-3 block">
              // Tech Arsenal
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-white font-sans mb-6 tracking-tight">
              Stacks
            </h2>
            <p className="text-gray-400 font-sans text-lg leading-relaxed border-l border-white/10 pl-6 max-w-2xl">
              Tecnologias e ferramentas que utilizo para construir aplicações modernas.
            </p>
          </motion.div>
        </div>

        <div className="flex flex-wrap gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                relative px-6 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 border
                ${activeCategory === cat
                  ? "bg-electric-violet text-white border-electric-violet shadow-[0_0_15px_rgba(124,58,237,0.4)] scale-105"
                  : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/10"
                }
              `}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-full bg-white/10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 min-h-[300px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredTechs.map((tech) => (
              <motion.div
                layout
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                transition={{ duration: 0.3 }}
                className="group relative"
              >
                <motion.div
                  animate={isMobile ? undefined : { y: [0, -5, 0] }}
                  transition={isMobile ? undefined : {
                    duration: 3 + Math.random(),
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random()
                  }}
                  className="relative h-32 backdrop-blur-md border border-white/5 rounded-2xl flex flex-col items-center justify-center gap-3 overflow-hidden transition-all duration-300 group-hover:border-electric-violet/40 group-hover:bg-[#0f0728]/60"
                  style={{ "--tech-color": tech.color } as React.CSSProperties}
                >

                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="text-4xl text-gray-500 transition-all duration-300 group-hover:scale-110 group-hover:text-[var(--tech-color)] filter group-hover:drop-shadow-[0_0_10px_var(--tech-color)]">
                    <tech.icon />
                  </div>

                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest group-hover:text-white transition-colors duration-300">
                    {tech.name}
                  </span>

                  <div
                    className="absolute bottom-0 left-0 h-[2px] w-0 bg-[var(--tech-color)] transition-all duration-500 group-hover:w-full opacity-0 group-hover:opacity-100"
                  />

                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 font-mono text-xs">* Stack em constante evolução.</p>
        </div>

      </div>
    </section>
  );
};

export default ModernTechs;