"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

import { FaGithub, FaInstagram, FaFacebook, FaDiscord, FaLinkedin } from "react-icons/fa";

import LoadingScreen from "./components/loading";
import HandlingEmoji from "./components/handling";

import { Images } from "./lib/image.props";

import "./page.style.css";

const HomePage: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [techsAndTools, setTechsAndTools] = useState<Images[]>([]);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);

        const fetchTechsAndTools = async () => {
            try {
                const response = await fetch('/api/getImages');
                const data: Images[] = await response.json();
                setTechsAndTools(data);
            } catch (error) {
                console.error('Failed to fetch techs and tools:', error);
            }
        };

        fetchTechsAndTools();
    }, []);

    return (
        <>
        {loading ? (
            <LoadingScreen />
        ) : (
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
                        {techsAndTools.map((item, index) => (
                            <div key={index}>
                                <img draggable={false} src={item.src} alt={item.alt} title={item.title} />
                            </div>
                        ))}
                    </div>
                </section>
            </>
        )}
        </>
    );
};

export default HomePage;