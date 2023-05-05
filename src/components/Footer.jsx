import React from 'react';
import '../style/footer.css';
import getActualYear from './functions/getDate';

const Footer = () => {
    return (
        <footer>
            <div className='content'>
                <span> 2021 - {getActualYear()} © All rights reserved</span>
            </div>
            <div className='content'>
                <span>Published with GitHub Pages</span>
            </div>
        </footer>
    )
};

export default Footer;