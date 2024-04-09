/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import "./item-cart.css";
import { addItemToTheCart, removeGoodFromTheCart } from "../../store/slice";
import { Like } from "../like/like";

export const Item_cart = (props) => {

  const dispatch = useDispatch();

  return (
    <div className="cart__item">
      <img className="cart__img" src={props.item.src} alt="picture" />
      <div className="text">
        <h3 className="item__title">{props.item.title}</h3>

        {props.item["in-sale"] === "true" ? (
          <p className="item__price">{props.item["discount-price"]}</p>
        ) : (
          <p className="item__price">{props.item.price}</p>
        )}
        <p className="item__price"></p>
        <div className="link-box">
          <Like
            item={props.item}
            setLike={props.setLike}
            removeFromLiked={props.removeFromLiked}
          />
          <div
            className="delete_btn"
            onClick={() => props.removeFromTheCart(props.item)}
          >
            <img className="delete_btn" src="./IMG/delete.png" />
          </div>
        </div>
      </div>
      <div className="quan">
        <div className="q-ty">
          <p className="quantity">{props.item.quant}</p>

          <div className="arrows">
            <div
              onClick={() => dispatch(addItemToTheCart(props.item))}
              className="arrow-top"
            >
              <img src="./IMG/Vectortop.svg" alt="arrow" />
            </div>
            <div
              onClick={() => dispatch(removeGoodFromTheCart(props.item))}
              className="arrow-bottom"
            >
              <img src="./IMG/Vectorbottom.svg" alt="arrow" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Item_cart.propTypes = {
  removeFromLiked: PropTypes.func,
  item: PropTypes.object,
  setLike: PropTypes.func,
  removeFromTheCart: PropTypes.func,
};
