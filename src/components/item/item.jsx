/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import "./item.css";
import { Like } from "../like/like";

export const Item = (props) => {
  console.log("item");

  const cartSlice = useSelector(
    (state) => state.rootReducer.furnitureToolkit.cart
  );
  const add = (item) => {
    props.addToTheCart(item);
  };

  return (
    <div className="item__block">
      <img className="item__picture" src={props.item.src} alt="#" />
      <h3 className="catalog-item__title">{props.item.title}</h3>
      <p className="catalog-item__description">{props.item.description}</p>
      <div className="catalog-item__bottom">
        {props.item["in-sale"] === "true" ? (
          <>
            <p className="catalog-item__price">
              {props.item["discount-price"]}
            </p>
            <p className="discount-item__price">{props.item.price}</p>
          </>
        ) : (
          <p className="catalog-item__price">{props.item.price}</p>
        )}
        <div className="catalog-item__rating">
          <Like
            item={props.item}
            setLike={props.setLike}
            removeFromLiked={props.removeFromLiked}
          />

          <p className="rating__figure">{props.item.rating}</p>
          <img className="rating__img" src="../IMG/rating.png" alt="#" />
        </div>
      </div>
      {cartSlice.find((item) => item.id === props.item.id) === undefined ? (
        <button onClick={() => add(props.item)} className="catalog-item__add">
          Добавить в корзину
        </button>
      ) : (
        <button onClick={() => add(props.item)} className="catalog-item__add">
          {cartSlice.find((item) => item.id === props.item.id).quant}
        </button>
      )}
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.object.isRequired,
  addToTheCart: PropTypes.func,
  setLike: PropTypes.func,
  removeFromLiked: PropTypes.func,
};
