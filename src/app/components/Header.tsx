"use client";

import { useEffect, useState } from "react";

import { Tooltip } from "react-tooltip";

import { BsDiscord, BsFacebook, BsGithub, BsInstagram, BsLinkedin } from "react-icons/bs";

import { messagesDevs } from "@/utils/messages";
import { AlertNotify } from "@/utils/notify";

import "@/styles/header.css";

function HeaderPage() {

    const [currentMessageIndex, setCurrentMessageIndex] = useState<number>(0);

    const clipDiscord = () => {
        AlertNotify("success", "Discord copiado com sucesso!");
        navigator.clipboard.writeText("drypzz");
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessageIndex(prevIndex => (prevIndex + 1) % messagesDevs.toast.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="header-container">
            <div data-aos="fade-right">
                <div className="header-content">
                    <h4>Hello everyone 👋</h4>
                </div>

                <div className="header-content">
                    <h1>{`I"m DRYPZZ`}</h1>
                </div>

                <div className="header-content">
                    <h4 style={{
                        color: "rgba(255, 255, 255, .6)",
                        fontSize: "1.3rem",
                        fontWeight: "bold"
                    }}>Programming Student and Front-end Developer</h4>
                </div>

                <div className="header-content">
                    <span style={{
                        color: "rgba(255, 255, 255, .6)",
                        fontSize: "1.2rem"
                    }}>From Brazil - SC</span>
                </div>

                <div className="header-content me">
                    <img draggable={false} width={350} src="/images/0.jpg" alt="img-me" />
                </div>
            </div>

            <div>
                <div data-aos="fade-left" className="header-content icons">
                    <a href="https://github.com/drypzz/" target="_blank"><BsGithub size={35} /></a>
                    <a href="https://www.instagram.com/_gustavoaap/" target="_blank" rel="noreferrer"><BsInstagram size={35} /></a>
                    <a href="https://www.linkedin.com/in/gustavoaap/" target="_blank" rel="noreferrer"><BsLinkedin size={35} /></a>
                    <a href="https://www.facebook.com/igustavoaap/" target="_blank" rel="noreferrer"><BsFacebook size={35} /></a>
                    <a data-tooltip-id="tooltip-discord" data-tooltip-content="Copiar Discord" style={{ cursor: "pointer" }} onClick={clipDiscord} target="_blank" rel="noreferrer"><BsDiscord size={35} /></a>
                </div>

                <div data-aos="fade-right" className="header-content infos">
                    <p className="fadeinText">
                        {`" ${messagesDevs.toast[currentMessageIndex]["message"]} "`}
                    </p>
                    <div>
                        <span className="fadeinText">
                            {`- ${messagesDevs.toast[currentMessageIndex]["author"]} `}
                        </span>
                    </div>
                </div>
            </div>
            <Tooltip
                id={`tooltip-discord`}
                arrowColor="rgba(3, 126, 219, 0.4)"
                style={{ backgroundColor: "rgba(3, 126, 219, 0.4)", borderRadius: "5px" }}
            />
        </div>
    );
}

export default HeaderPage;