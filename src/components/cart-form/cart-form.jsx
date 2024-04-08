/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import "./cart-form.css";

export const Cart_form = (props) => {
  console.log("CartForm");
  return (
    <div className="cart__form">
      <h2 className="form__title">Оформление заказа</h2>
      <form action="#" className="in">
        <input type="text" className="name" placeholder="Имя Фамилия" />
      </form>
      <form action="#" className="in">
        <input type="tel" className="phone" placeholder="+ 7 904 000 80 80" />
      </form>
      <form action="#" className="in">
        <input type="text" className="address" placeholder="Адрес доставки" />
      </form>
      <p className="total">Итого: {props.totalAmount}.</p>
      <div className="order1">
        <button className="order">Оформить заказ</button>
      </div>
    </div>
  );
};

Cart_form.propTypes = { totalAmount: PropTypes.string };
