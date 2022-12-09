import React, { useState, useEffect } from 'react';
import './Basket.scss';
import ProductList from './ProductList';
function Basket({ cart, converPrice, setCart }) {
  const [checkList, setCheckList] = useState(new Set());
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/cart/list', {
      headers: {
        'content-Type': 'application/json',
        token: localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(data => setProductList(data.data[0].products));
  }, []);

  // console.log(productList);
  // let changeObj = [...checkList];
  // useEffect(() => {
  //   console.log('출력이 되는거야 마는거야');
  // }, [changeObj]);

  const checkedItemHandler = (id, isChecked) => {
    if (isChecked) {
      checkList.add(id);
      setCheckList(checkList);
    } else if (!isChecked && checkList.has(id)) {
      checkList.delete(id);
      setCheckList(checkList);
    }
  };

  const onRemove = id => {
    setCart(cart.filter(el => el.id !== id));
  };

  let priceSum = productList.map(el => el.price);
  let sumArr = priceSum.reduce((acc, cur) => {
    return acc + cur;
  }, 0);

  const payment = () => {
    const getToken = localStorage.getItem('token');
    if (getToken !== null) {
      fetch('http://localhost:8000/products/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: getToken,
        },
        body: JSON.stringify({
          product_id: cart[0].id,
          ordered_number: cart[0].quantity,
        }),
      }).then(alert('결제완료!'));
    } else alert('로그인하세요 !');
  };

  // const paymentListId = productList.map(el => el.id);
  const paymentPutQuantity = productList.map(el => {
    return { id: el.id, put_quantity: el.put_quantity };
  });
  //

  return (
    <div className="basketBody">
      <div className="cartNameBox">
        <h2 className="letterSpacing fontSettingh2">장바구니</h2>
      </div>
      <div className="cartBoxWraper">
        <div className="cartBoxLeft">
          <div className="selectBox">
            <input className="checkBoxBtnHead" type="checkbox" id="check1" />
            <label form="check1" />
            <span>전체선택(0/{productList.length})</span>
            <span className="borderRightInBasket" />
            <button className="selectDelBox">선택삭제</button>
          </div>
          <div className="productBox">
            <ul>
              {productList.length === 0 ? (
                <div className="noProdInCart">
                  <h4>장바구니에 담긴 상품이 없습니다.</h4>
                </div>
              ) : (
                productList &&
                productList.map(cart => {
                  return (
                    <ProductList
                      key={cart.id}
                      converPrice={converPrice}
                      onRemove={onRemove}
                      cart={cart}
                      checkedItemHandler={checkedItemHandler}
                    />
                  );
                })
              )}
            </ul>
          </div>
        </div>

        <div className="cartBoxRight">
          <div className="productInformationBox">
            <div className="cartBoxRightWraper">
              <div className="cartBoxRightHead">
                <div className="baesong">
                  <span className="locationIcon" />
                  <h4>배송지</h4>
                </div>
                <strong>배송지를 등록</strong>
                하고
                <br />
                <span>구매 가능한 상품을 확인하세요!</span>
                <button className="addressBox">
                  <span>
                    <img
                      className="addressBoxMagnifier"
                      alt=""
                      src="./img/free-icon-magnifier.png"
                    />
                    주소 검색
                  </span>
                </button>
              </div>

              <div className="cartBoxRightBody">
                <div className="cartBoxTop">
                  <span>상품금액</span>
                  <span>{converPrice(sumArr)}원</span>
                </div>
                <div className="cartBoxMid">
                  <span>배송비</span>
                  <span>{converPrice(sumArr >= 30000 ? '0' : '3000')}원</span>
                </div>
                <p className="benefits">
                  30,000원 추가주문 시,<strong>무료배송</strong>
                </p>
                <div className="cartBoxBot">
                  <span>결제예정금액</span>
                  <span>
                    {converPrice(sumArr >= 30000 ? sumArr : sumArr + 3000)}원
                  </span>
                </div>
              </div>
            </div>

            <div className="cartBoxRightFoo">
              <button
                onClick={payment}
                className="cartBoxRightFooBtn"
                type="button"
              >
                <span>
                  {productList.length > 1 ? '결제' : '장바구니가 비었습니다.'}
                </span>
              </button>
              <ul className="listController">
                <li>[주문완료]상태일 경우에만 주문 취소 가능합니다.</li>
                <li>
                  [마이마켓 주문내역 상세페이지]에서 직접 취소하실 수 있습니다.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Basket;
