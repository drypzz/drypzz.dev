"use client";

import React, { useState, useEffect } from "react";

import LoadingScreen from "./components/pages/loading";

import Header from "./components/renders/header";
import Techs from "./components/renders/techs";
import Projects from "./components/renders/projects";
import Contact from "./components/renders/contact";

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
            <LoadingScreen />
        ) : (
            <>
                <Header />
                <hr id="one" className="dev" />
                <Techs />
                <hr id="two" className="dev" />
                <Projects />
                <hr id="two" className="dev" />
                <Contact />
            </>
        )}
        </>
    );
};

export default Home;