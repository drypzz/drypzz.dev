"use client";

import React, { useState, useEffect } from "react";

import { FaGithub, FaInstagram, FaFacebook, FaDiscord, FaLinkedin } from "react-icons/fa";

import LoadingScreen from "./components/loading";
import HandlingEmoji from "./components/handling";

import "./page.style.css";
import Link from "next/link";

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
            <>
                <header className="dev-header">
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
                <section className="dev-social">
                    <div>
                        <Link href="">
                            <FaGithub />
                        </Link>
                    </div>
                    <div>
                        <Link href="">
                            <FaInstagram />
                        </Link>
                    </div>
                    <div>
                        <Link href="">
                            <FaLinkedin />
                        </Link>
                    </div>
                    <div>
                        <Link href="">
                            <FaFacebook />
                        </Link>
                    </div>
                    <div>
                        <Link href="">
                            <FaDiscord />
                        </Link>
                    </div>
                </section>
                <hr className="dev" />
                <section className="dev-techs">
                    <div className="dev-techs-title">
                        <h1>My Techs and Tools</h1>
                    </div>
                    <div className="dev-techs-container">
                        <div>
                            <img draggable={false} src="/svg/techs/nextjs.svg" alt="NextJS" title="NextJS" />
                        </div>
                        <div>
                            <img draggable={false} src="/svg/techs/reactjs.svg" alt="NextJS" title="NextJS" />
                        </div>
                        <div>
                            <img draggable={false} src="/svg/techs/typescript.svg" alt="NextJS" title="NextJS" />
                        </div>
                        <div>
                            <img draggable={false} src="/svg/techs/javascript.svg" alt="NextJS" title="NextJS" />
                        </div>
                        <div>
                            <img draggable={false} src="/svg/techs/html.svg" alt="NextJS" title="NextJS" />
                        </div>
                        <div>
                            <img draggable={false} src="/svg/techs/css.svg" alt="NextJS" title="NextJS" />
                        </div>
                        <div>
                            <img draggable={false} src="/svg/techs/nodejs.svg" alt="NextJS" title="NextJS" />
                        </div>
                        <div>
                            <img draggable={false} src="/svg/techs/cplusplus.svg" alt="NextJS" title="NextJS" />
                        </div>
                        <div>
                            <img draggable={false} src="/svg/techs/python.svg" alt="NextJS" title="NextJS" />
                        </div>
                        <div>
                            <img draggable={false} src="/svg/techs/git.svg" alt="NextJS" title="NextJS" />
                        </div>
                        <div>
                            <img draggable={false} src="/svg/tools/github.svg" alt="NextJS" title="NextJS" />
                        </div>
                        <div>
                            <img draggable={false} src="/svg/tools/firebase.svg" alt="NextJS" title="NextJS" />
                        </div>
                        <div>
                            <img draggable={false} src="/svg/tools/vscode.svg" alt="NextJS" title="NextJS" />
                        </div>
                        <div>
                            <img draggable={false} src="/svg/tools/vercel.svg" alt="NextJS" title="NextJS" />
                        </div>
                        <div>
                            <img draggable={false} src="/svg/tools/netlify.svg" alt="NextJS" title="NextJS" />
                        </div>
                        <div>
                            <img draggable={false} src="/svg/tools/npm.svg" alt="NextJS" title="NextJS" />
                        </div>
                        <div>
                            <img draggable={false} src="/svg/tools/powershell.svg" alt="NextJS" title="NextJS" />
                        </div>
                    </div>
                </section>
            </>
        }
        </>
    );
};

export default HomePage;