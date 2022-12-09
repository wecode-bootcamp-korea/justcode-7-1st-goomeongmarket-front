import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Incart from './Incart';

import './CardList.scss';
import { useEffect } from 'react';

function CardList({
  id,
  title,
  img,
  price,
  converPrice,
  cart,
  setCart,
  slide,
}) {
  const [popUp, setPopUp] = useState(false);
  const navigate = useNavigate();
  const moveDetail = () => {
    navigate(`/goods/${id}`);
  };

  useEffect(() => {
    setPopUp(false);
  }, [slide]);

  return (
    <div className="productBox">
      <img
        className="mainProductImg"
        alt="제품사진"
        src={img}
        onClick={moveDetail}
      />
      <h3 className="productName">{title}</h3>
      <span>{converPrice(price)}</span>
      <button
        onClick={() => {
          setPopUp(true);
        }}
        type="button"
        className="cart"
      />
      {popUp && (
        <Incart
          slide={slide}
          cart={cart}
          setCart={setCart}
          id={id}
          popUp={popUp}
          setPopUp={setPopUp}
          converPrice={converPrice}
          price={price}
          img={img}
          title={title}
        />
      )}
    </div>
  );
}

export default CardList;
