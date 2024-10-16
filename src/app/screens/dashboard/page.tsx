"use client";

import { FaPaperclip, FaRegTrashCan } from 'react-icons/fa6';

import useDashboard from './page.rules';

import "./page.style.css";

const DashboardPage = () => {
   
    const { 
        projects,
        auth,
        router,
        deleteProject,
        findImageUrl
    } = useDashboard();

    return (
        <section style={{ height: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <h1 className="dev-title">Dashboard</h1>

            <div className="dev-dashboard-button">
                <div>
                    <button id="logout" onClick={() => auth.signOut().then(() => router.push('/login'))}>
                        Logout
                    </button>
                </div>
                <div>
                    <button onClick={() => router.push('/dashboard/create')}>
                        Create Project
                    </button>
                </div>
            </div>

            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Techs</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{project.title}</td>
                                <td>
                                    {project.techs.map((tech, i) => (
                                        <img 
                                            key={i}
                                            src={findImageUrl(tech)} 
                                            alt={tech}
                                            title={tech}
                                        />
                                    ))}
                                </td>
                                <td className="actions">
                                    <div>
                                        <button className="view" onClick={() => window.open(project.link)}>
                                            <FaPaperclip />
                                        </button>
                                    </div>
                                    <div>
                                        <button className="delete" onClick={() => deleteProject(project.title)}>
                                            <FaRegTrashCan />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default DashboardPage;
