import React, {useEffect} from 'react';

import Aos from 'aos';
import 'aos/dist/aos.css';

import '../style/header/header.min.css';

import img from '../imgs/social/0.jpg';

import { BsInstagram, BsGithub, BsLinkedin } from 'react-icons/bs';

const Header = () => {

    useEffect(() => {
        Aos.init({ duration: 3000 });
    }, []);

    return (
        <header>
            <div className='container header-container'>

                <div data-aos='fade-right'>
                    <div className='content'>
                        <h4>Hello everyone 👋</h4>
                    </div>

                    <div className='content'>
                        <h1>I'm DRYPZZ</h1>
                    </div>

                    <div className='content'>
                        <h4 className='text-light'>Programming Student and Front-end Developer</h4>
                    </div>

                    <div className='content'>
                        <span className='text-light'>From Brazil - SC</span>
                    </div>

                    <div className='content me'>
                        <img src={img} alt='img-me' />
                    </div>
                </div>

                <div data-aos='fade-left'>
                    <div className='content icons'>
                        <a href='https://github.com/drypzz/' target='_blank'><BsGithub/></a>
                        <a href='https://www.instagram.com/_gustavoaap/' target='_blank' rel='noreferrer'><BsInstagram/></a>
                        <a href='https://www.linkedin.com/in/gustavoaap/' target='_blank' rel='noreferrer'><BsLinkedin/></a>
                    </div>

                    <div className='content infos'>
                        <img src='https://camo.githubusercontent.com/fff71385c70dfda35bc52a75956e78dbcc516f5983b81e91b0f99897765d37f4/68747470733a2f2f6c616e796172642e636e7261642e6465762f6170692f343637373538303539373936353631393330' />
                    </div>
                </div>
            </div>
        </header>
    )
};

export default Header;