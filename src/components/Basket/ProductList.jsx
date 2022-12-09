import React, { useState } from 'react';
import './ProductList.scss';

function ProductList({ converPrice, onRemove, cart, checkedItemHandler }) {
  // const [reFresh, setReFresh] = useState();
  let [Quan, setQuan] = useState(1);

  // const [Checked, setChecked] = useState(false);

  const checkHandler = ({ target }) => {
    // setChecked(!Checked);
    checkedItemHandler(cart.id, target.checked);
  };

  const onClickPlus = () => {
    setQuan(Quan + 1);
  };
  const onClickMinus = () => {
    setQuan(Quan !== 0 ? Quan - 1 : (Quan = 0));
  };

  const priceSum = Quan * cart.price;

  const delCart = () => {
    fetch('http://localhost:8000/cart', {
      method: 'DELETE',
      headers: {
        'content-Type': 'application/json',
        token: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        product_id: cart.id,
      }),
    });
  };

  return (
    <div className="boxSizing">
      <li className="productLi">
        <input
          className="checkBoxBtn"
          type="checkbox"
          id={cart.id}
          onChange={e => checkHandler(e)}
          checked={true}
        />
        <img className="produntImg" alt="" src={cart.img} />
        <div className="productTitle">{cart.title}</div>
        <div className="pmButtonBox">
          <button className="pmButton" onClick={onClickMinus}>
            -
          </button>
          <div>{Quan}</div>
          <button className="pmButton" onClick={onClickPlus}>
            +
          </button>
        </div>
        <div className="productPriceBox">
          <span className="productPrice">{converPrice(priceSum)}원</span>
        </div>
        <button className="listClearbButton" type="button" onClick={delCart} />
      </li>
    </div>
  );
}

export default ProductList;
