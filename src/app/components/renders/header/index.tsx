import Link from "next/link";

import { FaGithub, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

import HandlingEmoji from "../../hooks/handling";

import "./index.style.css";

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
                    <Link target="_blank" href="https://github.com/drypzz">
                        <FaGithub />
                    </Link>
                </div>
                <div>
                    <Link target="_blank" href="https://www.instagram.com/_gustavoaap/">
                        <FaInstagram />
                    </Link>
                </div>
                <div>
                    <Link target="_blank" href="https://www.linkedin.com/in/gustavoaap/">
                        <FaLinkedin />
                    </Link>
                </div>
                <div>
                    <Link target="_blank" href="https://www.facebook.com/igustavoaap/">
                        <FaFacebook />
                    </Link>
                </div>
            </section>
            <section className="dev-phrases">
                <div className="dev-phrases-content">
                    <p>“Você tem tudo o que precisa para construir algo muito maior do que você mesmo.” </p>
                    <div className="dev-phrases-author">
                        <span>- Seth Godin</span>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Header;