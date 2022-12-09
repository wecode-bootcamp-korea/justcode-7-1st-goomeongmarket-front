import React from 'react';

function TrueNav({ goToLogin, goToSignUp }) {
  return (
    <>
      <button onClick={goToSignUp} className="signUp btnDesign">
        회원가입
      </button>
      <div className="borderRight" />
      <button onClick={goToLogin} className=" btnDesign">
        로그인
      </button>
      <div className="borderRight" />
    </>
  );
}

export default TrueNav;
