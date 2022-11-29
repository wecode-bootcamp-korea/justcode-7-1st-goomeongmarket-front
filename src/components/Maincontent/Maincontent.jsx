import React, { useState, useRef, useEffect } from 'react';
import CardList from './CardList';
import './Maincontent.scss';

function Maincontent({ data, converPrice, cart, setCart, filterTitle }) {
  const TOTAL_SLIDES = data.length / 4;

  const [currentSlide, setCurrentSlide] = useState(0);

  const slideRef = useRef(null);

  const NextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const PrevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    slideRef.current.style.transition = 'all 0.5s ease-in-out';
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  }, [currentSlide]);
  console.log('data.lenth', data.length);
  return (
    <div>
      <div className="MaincontentWraper">
        <div className="MainContentBox">
          <button onClick={PrevSlide} className="btnLeft">
            ←
          </button>
          <button onClick={NextSlide} className="btnRight">
            →
          </button>
          <div className="MainContentTitle">
            <span style={{ fontWeight: 'bold' }}>이 상품 어때요 ?</span>
          </div>

          <div className="productInformation" ref={slideRef}>
            {filterTitle.map((values, index) => {
              const { id, title, price, img } = values;
              return (
                <CardList
                  converPrice={converPrice}
                  key={index}
                  id={id}
                  title={title}
                  price={price}
                  img={img}
                  cart={cart}
                  setCart={setCart}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Maincontent;
