import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Projects from './components/Projects';

import './style/index.css';

const App = () => {
  return (
    <div className='gradient-bg-welcome'>
      <Header />
      <hr />
      <Projects />
      <Footer />
    </div>
  )
};

export default App;