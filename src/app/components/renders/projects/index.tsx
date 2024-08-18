
import Link from "next/link";
import "./index.style.css";

const Projects = () => {
    return (
        <>
            <section>
                <div>
                    <h1 className="dev-title">📊 My Projects</h1>
                </div>
                <div className="dev-projects-container">

                    <main className="dev-cards">
                        <div className="dev-cards-img">
                            <img src="https://github.com/drypzz/drypzz.dev/blob/master/public/images/_p1/01.png?raw=true" />
                        </div>
                        <div className="dev-cards-title">
                            <h2>Teste (Course)</h2>
                        </div>
                        <div className="dev-cards-icons">
                            <div>
                                <img src="/svg/techs/css.svg" />
                            </div>
                            <div>
                                <img src="/svg/techs/html.svg" />
                            </div>
                            <div>
                                <img src="/svg/techs/typescript.svg" />
                            </div>
                        </div>
                        <Link className="dev-cards-btn" href="#">View on Github</Link>
                    </main>

                </div>
            </section>
        </>
    );
};

export default Projects;