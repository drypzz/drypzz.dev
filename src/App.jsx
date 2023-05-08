import React, {useEffect, useState} from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import Projects from './components/Projects';

import Aos from 'aos';
import 'aos/dist/aos.css';

import BounceLoader from 'react-spinners/BounceLoader';

import './style/index.css';

const App = () => {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Aos.init({ duration: 3000 });
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