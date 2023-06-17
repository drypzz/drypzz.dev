import React from 'react';
import { Museu, Thyagoof, PI } from '../components/functions/Carousel';

/**
 * @description This is the data of the projects.
 * @returns {Array} Returns an array with the data of the projects.
 * @author @drypzz
*/

const toast = [
    {
        id: 1,
        return: <Museu thumbs={false} />
    },
    
    {
        id: 2,
        return: <Thyagoof thumbs={false} />
    },

    {
        id: 3,
        return: <PI thumbs={false} />
    },
]

const projects = [
    {
        id: 1,
        name: 'Museu de Informática',
        return: <Museu thumbs={true} />
    },

    {
        id: 2,
        name: 'Thyagoof Midia',
        return: <Thyagoof thumbs={true} />
    },

    {
        id: 3,
        name: 'Projeto Integrador',
        return: <PI thumbs={true} />
    },
]

/**
 * @description Exporting the data of the projects.
 * @exports projects
 * @exports toast
 * @author @drypzz
 */
export {projects, toast};