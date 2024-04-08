/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Cart_list } from "../components/cart-list/cart-list";
import Header from "../components/header/header";
import { DiscountCarousel } from "../components/discount-carousel/discount-carousel";
import { TitleCart } from "../components/title-cart/title-cart";

export const Basket = (props) => {
  const cartSlice = useSelector(
    (state) => state.rootReducer.furnitureToolkit.cart
  );
  console.log("Cart");
  const productCost = (object) => {
    if (object["in-sale"] === "true") {
      console.log(object["in-sale"]);
      const amount = object.quant * object["discount-price"];
      console.log(amount);
      return amount;
    } else {
      const amount = object.quant * object.price;
      return amount;
    }
  };
  const costArr = cartSlice.map((item) => productCost(item));
  const totalAmount = costArr.reduce(function (a, b) {
    return a + b;
  }, 0);
  console.log(totalAmount);

  return (
    <div>
      <Header cls="cart center">
        <TitleCart />
      </Header>
      <Cart_list
        removeFromLiked={props.removeFromLiked}
        totalAmount={totalAmount}
        removeFromTheCart={props.removeFromTheCart}
        clearCart={props.clearCart}
        cartList={cartSlice}
        setLike={props.setLike}
      />
      <DiscountCarousel
        setLike={props.setLike}
        discounted={props.discounted}
        addToTheCart={props.addToTheCart}
        removeFromLiked={props.removeFromLiked}
      />
    </div>
  );
};

Basket.propTypes = {
  discounted: PropTypes.array,
  removeFromTheCart: PropTypes.func,
  clearCart: PropTypes.func,
  addToTheCart: PropTypes.func,
  setLike: PropTypes.func,
  removeFromLiked: PropTypes.func,
};
