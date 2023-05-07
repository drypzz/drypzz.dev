import React from 'react';

import '../style/projects/projects.css';

import { Museu, Thyagoof, PI } from './functions/Carousel';

const Projects = () => {

    return (
        <div className='container'>

            <div className='projects'>
                <h1>Projects 📊</h1>
            </div>

            <div className='modal'>

                <div className='modal-container'>
                    <div className='modal-content'>
                        <h3>Museu de Informática</h3>
                    </div>
                    <Museu />
                </div>

                <div className='modal-container'>
                    <div className='modal-content'>
                        <h3>Thyagoof Midia</h3>
                    </div>
                    <Thyagoof />
                </div>

                <div className='modal-container'>
                    <div className='modal-content'>
                        <h3>Projeto Integrador</h3>
                    </div>
                    <PI />
                </div>
                
            </div>
        </div>
    )
};

export default Projects;