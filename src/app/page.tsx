"use client";

import React, { useState, useEffect } from "react";

import LoadingScreen from "./components/pages/loading";

import Header from "./components/renders/Header";
import Techs from "./components/renders/Techs";
import Projects from "./components/renders/Projects";

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
            </>
        )}
        </>
    );
};

export default Home;