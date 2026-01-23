"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypewriterProps {
    text: string;
    delay?: number;
}

const Typewriter: React.FC<TypewriterProps> = ({ text, delay = 0 }) => {
    const [currentText, setCurrentText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [startTyping, setStartTyping] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setStartTyping(true);
        }, delay * 1000);
        return () => clearTimeout(timeout);
    }, [delay]);

    useEffect(() => {
        if (!startTyping) return;

        let timer: NodeJS.Timeout;

        const typeSpeed = 150;
        const deleteSpeed = 50;
        const pauseEnd = 2000;
        const pauseStart = 500;

        if (isDeleting) {
            if (currentText.length > 1) {
                timer = setTimeout(() => {
                    setCurrentText(prev => prev.slice(0, -1));
                }, deleteSpeed);
            } else {
                timer = setTimeout(() => {
                    setIsDeleting(false);
                }, pauseStart);
            }
        } else {
            if (currentText.length < text.length) {
                timer = setTimeout(() => {
                    setCurrentText(text.slice(0, currentText.length + 1));
                }, typeSpeed);
            } else {
                timer = setTimeout(() => {
                    setIsDeleting(true);
                }, pauseEnd);
            }
        }

        return () => clearTimeout(timer);
    }, [currentText, isDeleting, startTyping, text]);

    return (
        <span className="inline-flex items-center">
            <span>{currentText}</span>

            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="ml-1 inline-block w-[3px] h-[1em] align-middle"
                style={{
                    backgroundColor: "var(--electric-violet)",
                    color: "transparent"
                }}
            />
        </span>
    );
};

export default Typewriter;