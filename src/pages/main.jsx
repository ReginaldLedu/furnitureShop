/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import Header from "../components/header/header";
import { For } from "../components/for/for";
import { DiscountCarousel } from "../components/discount-carousel/discount-carousel";
import { TitleMain } from "../components/title-main/title-main";

export const Main = /*memo(function MainIn */ (props) => {
  console.log("main");

  return (
    <>
      <Header cls="top center">
        <TitleMain />
      </Header>
      <For />
      <DiscountCarousel
        removeFromLiked={props.removeFromLiked}
        setLike={props.setLike}
        discounted={props.discounted}
        addToTheCart={props.addToTheCart}
      />
    </>
  );
};

Main.propTypes = {
  discounted: PropTypes.array,
  addToTheCart: PropTypes.func,
  setLike: PropTypes.func,
  removeFromLiked: PropTypes.func,
};
