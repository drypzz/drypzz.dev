import React from 'react';

import '../style/footer/footer.min.css';

import getActualYear from './functions/geralFunctions';

const Footer = () => {
    return (
        <footer>
            <div className='content'>
                <span> 2021 - {getActualYear()} © All rights reserved</span>
            </div>
            <div className='content'>
                <span>Published with Netlify</span>
            </div>
        </footer>
    )
};

export default Footer;