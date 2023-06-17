import React from 'react';
import { Museu, Thyagoof, PI, Portfolio } from '../components/functions/Carousel';

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

    {
        id: 4,
        return: <Portfolio thumbs={false} />
    },
]

const projects = [
    {
        id: 1,
        name: 'Museu de Informática',
        return: <Museu thumbs={true} />,
        imgs: [
            {id: 1, src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', title: 'HTML5'},
            {id: 2, src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', title: 'CSS3'},
            {id: 3, src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', title: 'JavaScript'},
        ],
    },

    {
        id: 2,
        name: 'Thyagoof Midia',
        return: <Thyagoof thumbs={true} />,
        imgs: [
            {id: 1, src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', title: 'CSS3'},
            {id: 2, src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg', title: 'PHP'},
        ],
    },

    {
        id: 3,
        name: 'Projeto Integrador',
        return: <PI thumbs={true} />,
        imgs: [
            {id: 1, src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', title: 'CSS3'},
            {id: 2, src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg', title: 'PHP'},
            {id: 3, src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', title: 'JavaScript'},
        ],
    },

    {
        id: 4,
        name: 'Portfolio',
        return: <Portfolio thumbs={true} />,
        imgs: [
            {id: 1, src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', title: 'CSS3'},
            {id: 2, src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', title: 'NextJS'},
            {id: 3, src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', title: 'JavaScript'},
            {id: 4, src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', title: 'ReactJS'},
        ],
    },
]

/**
 * @description Exporting the data of the projects.
 * @exports projects
 * @exports toast
 * @author @drypzz
 */
export {projects, toast};