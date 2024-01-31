import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "@/styles/projects.css";

import { projects } from '@/utils/projects';
import ProjectCarousel from '@/utils/carousel';

function Projects() {
    return (
        <div className="projects-container">
            <h1 data-aos="fade-up">My Projects 📊</h1>
            <div className="projects-container-content">
                {projects.map((e, index) => (
                    <ProjectCarousel key={index} title={e.title} description={e.description} images={e.images} secondaryImages={e.secondaryImages} />
                ))}
            </div>
        </div>
    );
}

export default Projects;