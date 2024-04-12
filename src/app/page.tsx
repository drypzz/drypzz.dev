"use client";

import { useEffect, useState } from "react";

import BounceLoader from "react-spinners/BounceLoader";

import Aos from "aos";
import "@/styles/dataos.css";

import HeaderPage from "./components/Header";
import SkillsPage from "./components/Skills";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import ContactPage from "./components/Contact";

import "./globals.css";

function HomePage() {
    const [loading, setLoading] = useState<boolean>(true);

    function getRandomTimer() {
        const result = (Math.random() * 4) + 1;

        return Math.floor(result);
    };

    useEffect(() => {
        const initAos = () => {
            Aos.init({
                duration: 2000,
                easing: "ease",
                once: true,
                offset: 0
            });
        };

        const timeoutId = setTimeout(() => {
          setLoading(false);
          initAos();
        }, (getRandomTimer() * 1000));

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <>
            {loading ? (
                <div className="loading">
                    <BounceLoader color={"#037edb"} loading={loading} size={150} />
                </div>
            ) : (
                <>
                    <div className="div--pages">
                        <HeaderPage />
                        <hr data-aos="fade" />
                        <SkillsPage />
                        <hr id="a" data-aos="fade" />
                        <Projects />
                        <hr id="b" data-aos="fade" />
                        <ContactPage />
                    </div>
                    <Footer />
                </>
            )}
        </>
    );
};

export default HomePage;