import React, { useState, useRef, useEffect } from 'react';
import CardList from './CardList';
import './Maincontent.scss';

function Maincontent({ data, converPrice, cart, setCart, filterTitle }) {
  const TOTAL_SLIDES = data.length / 4;
  const [currentSlide, setCurrentSlide] = useState(1);
  const [slide, setSlide] = useState(0);

  const slideRef = useRef(null);

  const NextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      setCurrentSlide(1);
      setSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
      setSlide(slide - 1100);
    }
  };

  const PrevSlide = () => {
    if (currentSlide !== 1) {
      setCurrentSlide(slide);
      setCurrentSlide(currentSlide - 1);
      setSlide(slide + 1100);
    }
  };

  useEffect(() => {
    slideRef.current.style.transition = 'all 0.5s ease-in-out';
    slideRef.current.style.transform = `translateX(${slide}px)`;
  }, [currentSlide]);

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
                  slide={slide}
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
