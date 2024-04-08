/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import "./cart-list.css";
import { Item_cart } from "../item-cart/item-cart";
import { Cart_form } from "../cart-form/cart-form";
import { ClearCart } from "../clear-cart/clear-cart";
import { Link } from "react-router-dom";

export const Cart_list = (props) => {
  console.log(props);
  return (
    <div className="cart__block center">
      <div className="cart__items">
        {props.cartList.length > 0 ? (
          <div className="items__header">
            <p className="cart__title">Товар</p>
            <div className="q">К&nbsp;-&nbsp;во</div>
          </div>
        ) : (
          <div className="items__header">Корзина пуста</div>
        )}
        {props.cartList.length > 0
          ? props.cartList.map((item) => (
              <Item_cart
                removeFromLiked={props.removeFromLiked}
                key={props.cartList.indexOf(item).toString()}
                item={item}
                setLike={props.setLike}
                removeFromTheCart={props.removeFromTheCart}
              />
            ))
          : " "}
        {props.cartList.length > 0 ? (
          <div className="cart__links">
            <ClearCart />
            <Link to="/catalogue">
              <button className="cart__link">Продолжить покупки</button>
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
      {props.cartList.length > 0 ? (
        <Cart_form totalAmount={props.totalAmount} />
      ) : (
        " "
      )}
    </div>
  );
};
Cart_list.propTypes = {
  cartList: PropTypes.array.isRequired,
  setLike: PropTypes.func,
};
