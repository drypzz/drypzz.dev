import React, {useEffect} from 'react';

import Aos from 'aos';
import 'aos/dist/aos.css';

import '../style/projects/projects.css';

import { Museu, Thyagoof, PI } from './functions/Carousel';

const Projects = () => {

    useEffect(() => {
        Aos.init({ duration: 3000 });
    }, []);

    return (
        <div className='container'>

            <div data-aos='fade' className='projects'>
                <h1>Projects 📊</h1>
            </div>

            <div data-aos='fade-up' className='modal'>

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