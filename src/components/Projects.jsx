import React, {useEffect} from 'react';

import Aos from 'aos';
import 'aos/dist/aos.css';

import '../style/projects/projects.min.css';

import {projects, toast} from '../projects/data';

const Projects = () => {

    function activeHoverInImage(e) {
        for(let i = 1; i <= toast.length; i++) {
            if (e === i) {
                document.getElementById(`modals-off${i}`).style.display = 'flex';
                document.getElementById(`modals-off${i}`).classList.add('active');
            } else {
                document.getElementById(`modals-off${i}`).style.display = 'none';
                document.getElementById(`modals-off${i}`).classList.remove('active');
            }
        }
    };

    useEffect(() => {
        Aos.init({ duration: 3000 });
    }, []);

    return (
        <div className='container'>

            <div data-aos='fade' className='projects'>
                <h1>Projects 📊</h1>
            </div>

            <div data-aos='fade-up' className='modal'>

                {projects.map((e) => {
                    return (
                        <div key={e.id} className='modal-container'>
                            <div className='modal-content'>
                                <h3>{e.name}</h3>
                            </div>
                            <div style={{cursor: 'pointer'}} onClick={() => activeHoverInImage(e.id)}>
                                {e.return}
                            </div>
                        </div>
                    )
                })}
                
            </div>

            {toast.map((e) => {
                return (
                    <div key={e.id} className='modals-off' id={`modals-off${e.id}`}>
                        <div className='modal-container hover'>
                            {e.return}
                            <div className='modal-content'>
                                <button className='_dsa01293uncle' onClick={() => activeHoverInImage()}>Fechar</button>
                            </div>
                        </div>
                    </div>
                )
            })}

        </div>
    )
};

export default Projects;