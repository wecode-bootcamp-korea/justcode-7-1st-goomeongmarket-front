import React, { useState } from 'react';
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
}) {
  const [count, setCount] = useState(1);
  // const onClickPlus = () => {
  //   setCount(count + 1);
  // };
  // const onClickMinus = () => {
  //   setCount(count !== 0 ? count - 1 : (count = 0));
  // };

  const handleQuantity = type => {
    if (type === 'plus') {
      setCount(count + 1);
    } else {
      if (count === 1) return;
      setCount(count - 1);
    }
  };

  const priceMultiplQanntity = count * price;

  const setQuantity = (id, quantity) => {
    const found = cart.filter(el => el.id === id)[0];
    const idx = cart.indexOf(found);
    const cartItem = {
      id: id,
      img: img,
      price: price,
      title: title,
      quantity: count,
    };
    setCart([...cart.slice(0, idx), cartItem, ...cart.slice(idx + 1)]);
  };

  const handleCart = () => {
    const cartItem = {
      id: id,
      img: img,
      price: price,
      title: title,
      quantity: count,
    };

    const found = cart.find(el => el.id === cartItem.id);
    if (found) setQuantity(cartItem.id, found.quantity + count);
    else setCart([...cart, cartItem]);
  };

  // console.log(cart);

  return (
    <div className="popUpWraper">
      <div className="popUpBox">
        <div className="popUpBoxTop">
          <span>{title}</span>
          <div className="popUpMarginTop10px popUpCartPriceSection">
            <span>{converPrice(priceMultiplQanntity)}원</span>
            <div className="pmBox">
              <button
                // onClick={onClickMinus}
                onClick={() => handleQuantity('minus')}
                type="button"
                className="pmBoxInBtnM"
              >
                -
              </button>
              <span>{count}</span>
              <button
                // onClick={onClickPlus}
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
