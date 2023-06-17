import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import museu0 from '../../imgs/0.png';
import museu1 from '../../imgs/1.png';
import museu2 from '../../imgs/2.png';

import th3 from '../../imgs/3.png';
import th4 from '../../imgs/4.png';
import th5 from '../../imgs/5.png';

import pi6 from '../../imgs/6.png';
import pi7 from '../../imgs/7.png';
import pi8 from '../../imgs/8.png';

import port9 from '../../imgs/9.png';
import port10 from '../../imgs/10.png';

function Museu( {thumbs} ){
  return (
    <Carousel autoPlay transitionTime={1000} showThumbs={thumbs} stopOnHover={false} showStatus={false} infiniteLoop showArrows={false}>
        <div className='modal-content'>
            <img className='carousel-img' src={museu0} />
        </div>
        <div className='modal-content'>
            <img className='carousel-img' src={museu1} />
        </div>
        <div className='modal-content'>
            <img className='carousel-img' src={museu2} />
        </div>
    </Carousel>
  );
};

function Thyagoof( {thumbs} ) {
    return (
      <Carousel autoPlay transitionTime={1000} showThumbs={thumbs} stopOnHover={false} showStatus={false} infiniteLoop showArrows={false}>
          <div className='modal-content'>
              <img className='carousel-img' src={th3} />
          </div>
          <div className='modal-content'>
              <img className='carousel-img' src={th4} />
          </div>
          <div className='modal-content'>
              <img className='carousel-img' src={th5} />
          </div>
      </Carousel>
    );
};

function PI( {thumbs} ) {
    return (
      <Carousel autoPlay transitionTime={1000} showThumbs={thumbs} stopOnHover={false} showStatus={false} infiniteLoop showArrows={false}>
          <div className='modal-content'>
              <img className='carousel-img' src={pi6} />
          </div>
          <div className='modal-content'>
              <img className='carousel-img' src={pi7} />
          </div>
          <div className='modal-content'>
              <img className='carousel-img' src={pi8} />
          </div>
      </Carousel>
    );
};

function Portfolio( {thumbs} ) {
    return (
      <Carousel autoPlay transitionTime={1000} showThumbs={thumbs} stopOnHover={false} showStatus={false} infiniteLoop showArrows={false}>
          <div className='modal-content'>
              <img className='carousel-img' src={port9} />
          </div>
          <div className='modal-content'>
              <img className='carousel-img' src={port10} />
          </div>
      </Carousel>
    );
};

export {Museu, Thyagoof, PI, Portfolio};