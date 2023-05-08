import React, {useEffect, useState} from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import Projects from './components/Projects';

import Aos from 'aos';
import 'aos/dist/aos.css';

import ScrollToTop from 'react-scroll-to-top';

import BounceLoader from 'react-spinners/BounceLoader';

import './style/index.css';

const App = () => {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Aos.init(
        { 
          duration: 2000,
          easing: 'ease-in-out'
        }
      );
    }, 5000);
  }, []);

  return (
    <div>
      {loading ?
        <div className='loading'>
          <BounceLoader color={'#037edb'} loading={loading} size={150} />
        </div>
      :
        <div className='gradient-bg-welcome'>
          <ScrollToTop className='scroll-to-top' top={50} data-aos='fade-left' smooth color='#037edb' />
          <Header />
          <hr data-aos='fade-right' />
          <Projects />
          <Footer />
        </div>
      }
    </div>
  )
};

export default App;