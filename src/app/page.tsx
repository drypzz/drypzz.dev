"use client";

import React, { useState, useEffect } from "react";

import Loading from "./components/layout/loading";
import SnowfallComponent from "./components/layout/snowfall";

import Header from "./components/section/header";
import Techs from "./components/section/techs";
import Projects from "./components/section/projects";
import Contact from "./components/section/contact";
import Footer from "./components/section/footer";

import ScrollToTopButton from "./components/common/scrolltotopbutton";


const Home = () => {
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    return (
        <>
        {loading ? (
            <Loading />
        ) : (
            <>
                <SnowfallComponent />
                <Header />
                <hr id="one" className="dev" />
                <Techs />
                <hr id="two" className="dev" />
                <Projects />
                <hr id="three" className="dev" />
                <Contact />
                <Footer />
                <ScrollToTopButton />
            </>
        )}
        </>
    );
};

export default Home;