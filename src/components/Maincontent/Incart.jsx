import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import './Incart.scss';

function Incart({
  id,
  setPopUp,
  converPrice,
  cart,
  setCart,
  price,
  img,
  title,
  slide,
  popUp,
}) {
  const [count, setCount] = useState(1);

  const modalRef = useRef(null);
  const handleQuantity = type => {
    if (type === 'plus') {
      setCount(count + 1);
    } else {
      if (count === 1) return;
      setCount(count - 1);
    }
  };

  useEffect(() => {
    if (popUp === true) {
      modalRef.current.style.transform = `translateX(${Math.abs(slide)}px)`;
    }
  }, [popUp]);

  const priceMultiplQanntity = count * price;
  const handleCart = () => {
    fetch('http://localhost:8000/cart/update', {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
        token: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        product_id: id,
        put_quantity: count,
      }),
    });
  };

  // const setQuantity = (id, quantity) => {
  //   const found = cart.filter(el => el.id === id)[0];
  //   const idx = cart.indexOf(found);
  //   const cartItem = {
  //     id: id,
  //     img: img,
  //     price: price,
  //     title: title,
  //     quantity: count,
  //   };
  //   setCart([...cart.slice(0, idx), cartItem, ...cart.slice(idx + 1)]);
  // };

  // const handleCart = () => {
  //   const cartItem = {
  //     id: id,
  //     img: img,
  //     price: price,
  //     title: title,
  //     quantity: count,
  //   };

  //   const found = cart.find(el => el.id === cartItem.id);
  //   if (found) setQuantity(cartItem.id, found.quantity + count);
  //   else setCart([...cart, cartItem]);
  // };

  return (
    <div className="popUpWraper" ref={modalRef}>
      <div className="popUpBox">
        <div className="popUpBoxTop">
          <span>{title}</span>
          <div className="popUpMarginTop10px popUpCartPriceSection">
            <span>{converPrice(priceMultiplQanntity)}원</span>
            <div className="pmBox">
              <button
                onClick={() => handleQuantity('minus')}
                type="button"
                className="pmBoxInBtnM"
              >
                -
              </button>
              <span>{count}</span>
              <button
                onClick={() => handleQuantity('plus')}
                type="button"
                className="pmBoxInBtnP"
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div className="popUpBoxMid">
          <span>합계</span>
          <span>{converPrice(priceMultiplQanntity)}원</span>
        </div>
        <div className="popUpBoxBot">
          <button
            onClick={() => setPopUp(false)}
            type="button"
            className="popUpBotSectionBoxDesign popUpBotSectionBoxDesignL"
          >
            취소
          </button>

          <button
            onClick={handleCart}
            type="button"
            className="popUpBotSectionBoxDesign popUpBotSectionBoxDesignR"
          >
            장바구니 담기
          </button>
        </div>
      </div>
    </div>
  );
}

export default Incart;
