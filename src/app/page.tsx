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
        }, 5000);

        return () => clearTimeout(timeoutId);
    }, []);

    const renderContent = () => {
        return (
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
        );
    };

    return (
        <>
            {loading ? (
                <div className="loading">
                    <BounceLoader color={"#037edb"} loading={loading} size={150} />
                </div>
            ) : (
                renderContent()
            )}
        </>
    );
}

export default HomePage;