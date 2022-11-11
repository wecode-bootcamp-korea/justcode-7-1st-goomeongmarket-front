import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Incart from './Incart';

import './CardList.scss';

function CardList({ id, title, img, price, converPrice, cart, setCart }) {
  const [popUp, setPopUp] = useState(false);
  const navigate = useNavigate();
  const moveDetail = () => {
    navigate(`/goods/${id}`);
  };

  return (
    <div className="productBox">
      <img
        className="mainProductImg"
        alt="제풒사진"
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
      {popUp === true ? (
        <Incart
          cart={cart}
          setCart={setCart}
          id={id}
          setPopUp={setPopUp}
          converPrice={converPrice}
          price={price}
          img={img}
          title={title}
        />
      ) : null}
    </div>
  );
}

export default CardList;
