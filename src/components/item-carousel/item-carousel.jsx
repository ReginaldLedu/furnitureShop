/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import "./item-carousel.css";
import { useSelector } from "react-redux";
import { Like } from "../like/like";

export const ItemCarousel = (props) => {
  const cartSlice = useSelector(
    (state) => state.rootReducer.furnitureToolkit.cart
  );
  const add = (item) => {
    props.addToTheCart(item);
  };
  return (
    <div className="item__carousel">
      <img className="item-carousel__picture" src={props.item.src} alt="#" />
      <h3 className="item-carousel__title">{props.item.title}</h3>
      <p className="item-carousel__description">{props.item.description}</p>
      <div className="item-carousel__bottom">
        {props.item["in-sale"] === "true" ? (
          <>
            <p className="item-carousel__price">
              {props.item["discount-price"]}
            </p>
            <p className="discount-item__price">{props.item.price}</p>
          </>
        ) : (
          <p className="item-carousel__price">{props.item.price}</p>
        )}
        <div className="item-carousel__rating">
          <Like
            item={props.item}
            setLike={props.setLike}
            removeFromLiked={props.removeFromLiked}
          />
          <p className="rating__figure">{props.item.rating}</p>
          <img
            className="item-carousel__rating-img"
            src="../IMG/rating.png"
            alt="#"
          />
        </div>
      </div>
      {cartSlice.find((item) => item.id === props.item.id) === undefined ? (
        <button onClick={() => add(props.item)} className="item-carousel__add">
          Добавить в корзину
        </button>
      ) : (
        <button onClick={() => add(props.item)} className="item-carousel__add ">
          {cartSlice.find((item) => item.id === props.item.id).quant}
        </button>
      )}
    </div>
  );
};

ItemCarousel.propTypes = {
  removeFromLiked: PropTypes.func,
  setLike: PropTypes.func,
  item: PropTypes.object,
  addToTheCart: PropTypes.func,
};
