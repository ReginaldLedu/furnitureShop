import React from "react";
import "./clear-cart.css";
import { useDispatch } from "react-redux";
import { removeAllGoodsFromTheCart } from "../../store/slice";

export const ClearCart = () => {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => dispatch(removeAllGoodsFromTheCart())}
      className="cart__link"
    >
      Очистить корзину
    </button>
  );
};
