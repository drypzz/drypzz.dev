import Link from "next/link";

import { FaGithub, FaInstagram, FaFacebook, FaDiscord, FaLinkedin } from "react-icons/fa";

import HandlingEmoji from "../hooks/handling";

import "./Header.style.css";

const Header = () => {
    return (
        <>
            <header className="dev-header">
                <div>
                    <h3>Hello everyone <HandlingEmoji /></h3>
                </div>
                <div>
                    <h1 className="dev-title">{"I'm DRYPZZ"}</h1>
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
        </>
    );
};

export default Header;