import React, { useState, useRef, useEffect } from 'react';
import CardList from './CardList';
import './Maincontent.scss';

function Maincontent({ data, converPrice, cart, setCart, filterTitle }) {
  const TOTAL_SLIDES = data.length / 4;

  const [currentSlide, setCurrentSlide] = useState(0);

  const slideRef = useRef(null);

  const NextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      // 더 이상 넘어갈 슬라이드가 없으면
      setCurrentSlide(0); // 1번째 사진으로 넘어갑니다.
      // return;  // 클릭이 작동하지 않습니다.
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  // Prev 버튼 클릭 시
  const PrevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES); // 마지막 사진으로 넘어갑니다.
      // return;  // 클릭이 작동하지 않습니다.
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    slideRef.current.style.transition = 'all 0.5s ease-in-out';
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`; // 백틱을 사용하여 슬라이드로 이동하는 에니메이션을 만듭니다.
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
            {/* {data.map((titleName, index) => {
              const { titlename } = titleName;

              return <span key={index}>{titlename}</span>;
            })} */}
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
