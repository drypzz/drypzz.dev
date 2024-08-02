"use client";

import React, { useState, useEffect } from "react";

import LoadingScreen from "./components/loading";
import HandlingEmoji from "./components/handling";

import "./page.style.css";

const HomePage = () => {

    const [ loading, setLoading ] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    return (
        <>
        {loading ?
            <LoadingScreen />
        :
            <header>
                <div>
                    <h3>Hello everyone <HandlingEmoji /></h3>
                </div>

                <div>
                    <h1>{"I'm DRYPZZ"}</h1>
                </div>

                <div>
                    <h5>Programming Student and Front-end Developer</h5>
                </div>

                <div>
                    <span id="locale">From Brazil - SC</span>
                </div>

                <div>
                    <img draggable={false} src="/me.png" alt="Foto de Perfil de Gustavo" />
                </div>
            </header>
        }
        </>
    );
};

export default HomePage;