import React from 'react';
import Header from '../../components/Header/Header';
import './Main.scss';
import Nav from '../../components/Nav/Nav';
import SliderImages from '../../components/SliderImages/SliderImages';
import Footer from '../../components/Footer/Footer';
import Maincontent from '../../components/Maincontent/Maincontent';

function Main({
  cart,
  setCart,
  data,
  converPrice,
  stock,
  setStock,
  filterTitle,
  setSearch,
  count,
  setCount,
}) {
  return (
    <div className="mainPages ">
      <Nav setSearch={setSearch} />
      <Header setSearch={setSearch} />
      <SliderImages />
      <Maincontent
        cart={cart}
        setCart={setCart}
        data={data}
        converPrice={converPrice}
        stock={stock}
        setStock={setStock}
        filterTitle={filterTitle}
        count={count}
        setCount={setCount}
      />

      <Footer />
    </div>
  );
}

export default Main;
