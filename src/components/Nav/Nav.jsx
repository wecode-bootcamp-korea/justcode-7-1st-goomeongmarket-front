import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TrueNav from './TrueNav';
import './Nav.scss';
function Nav({ setSearch }) {
  const navigateSignUp = useNavigate();
  const navigateLogin = useNavigate();
  const NavigateBasket = useNavigate();

  const goToSignUp = () => {
    navigateSignUp('/signup');
  };
  const goToLogin = () => {
    navigateLogin('/login');
  };
  const goToBasket = () => {
    NavigateBasket('/basket');
  };

  const token = localStorage.getItem('token');

  return (
    <div className="fontAdd">
      <nav className="navMain ">
        <div className="navBody ">
          <div className="naviHead">
            {token ? (
              <>
                <span className="welcome">웰컴</span>
                <span className="user">홍길동님</span>
                <span className="underTriangle">▼</span>
                <div className="borderRight" />
              </>
            ) : (
              <TrueNav goToSignUp={goToSignUp} goToLogin={goToLogin} />
            )}

            <div className="dropDown">
              <button className=" btnDesign">고객센터 ▼</button>
            </div>
            <div className="serviceCenterBox">
              <span>공지사항</span>
              <br />
              <span>자주하는 질문</span>
              <br />
              <span>1:1 문의</span>
              <br />
              <span>대량주문 문의</span>
            </div>
          </div>

          <div className="navSection">
            <div className="navSectionLeft">
              <Link to="/">
                <img alt="컬리" src="/img/GMMK.jpg" />
              </Link>
              <button className="NavKurlyMarkerBtn marginLeft20">GM마켓</button>
              <div className="borderRightSection" />
              <button
                className="NavKurlyBeautyBtn marginLeft20"
                onClick={() => alert('준비중입니다.')}
              >
                뷰티GM
              </button>
              <button className="redNWord">N</button>
            </div>
            <form className="navSectionCenter">
              <input
                className="navSearch"
                placeholder="검색어를 입력해주세요"
                onChange={e => setSearch(e.target.value)}
              />
              <button className="SearchBarMagnifier" />
            </form>
            <div className="navSectionLeft">
              <img
                className="iconControl "
                alt="위치"
                src="/img/location.png"
                onClick={() => alert('준비중입니다.')}
              />
              <img
                className="iconControl "
                alt="하트"
                src="/img/love.png"
                onClick={() => alert('준비중입니다.')}
              />
              <img
                className="iconControl "
                alt="장바구니"
                src="/img/purchase.png"
                onClick={goToBasket}
              />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
