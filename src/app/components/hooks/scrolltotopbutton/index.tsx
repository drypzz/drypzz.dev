"use client";

import React, { useState, useEffect } from "react";

import "./index.style.css";

const ScrollToTopButton = () => {
    const [showTopButton, setShowTopButton] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowTopButton(true);
            } else {
                setShowTopButton(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            {showTopButton && (
                <button onClick={scrollToTop} className="dev-button-top">
                    <span />
                </button>
            )}
        </>
    );
};

export default ScrollToTopButton;