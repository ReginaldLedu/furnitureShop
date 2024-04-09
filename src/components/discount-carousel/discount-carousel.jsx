/* eslint-disable react/prop-types */
import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import "./discount-carousel.css";
import { ItemCarousel } from "../item-carousel/item-carousel";
//import { CSSTransition } from "react-transition-group";

export const DiscountCarousel = (props) => {
  const slider = useRef(null);
  const parentElement = useRef(null);

  let slidesToShow = 1;
  if (parentElement.current !== null) {
    slidesToShow = Math.floor(parentElement.current.style.width / 280);
  }
  let [position, setPosition] = useState(0);
  const slidesToScroll = 1;
  const movePosition = slidesToScroll * 280;

  const prevHandler = () => {
    const itemLeft =
      props.discounted.length - (Math.abs(position) + slidesToShow * 280) / 280;

    if (
      (position += 1 >= slidesToScroll ? movePosition : itemLeft * 280) >= 0
    ) {
      setPosition(0);
      slider.current.style.transform = `translateX(${position})`;
    } else {
      setPosition(
        (position += 1 >= slidesToScroll ? movePosition : itemLeft * 280)
      );

      slider.current.style.transform = `translateX(${position}px)`;
    }
  };

  const nextHandler = () => {
    const itemLeft =
      props.discounted.length - (Math.abs(position) + slidesToShow * 280) / 280;
    setPosition(
      (position -= itemLeft >= slidesToScroll ? movePosition : itemLeft * 280)
    );

    if (position <= props.discounted.length * movePosition * -1) {
      slider.current.style.transform = "translateX(0)";
      setPosition(0);
    } else {
      slider.current.style.transform = `translateX(${position}px)`;
    }
  };

  return (
    <>
      <h2 className="discount__title center">Специальные предложения</h2>
      <div className="wrapper center">
        <div ref={parentElement} className="slider-container">
          <button onClick={prevHandler} className="swiper-button-prev">
            <img
              src="./IMG/arr.png"
              className="button-prev-img"
              alt="arrowback"
            />
          </button>
          <section ref={slider} className="slider-track">
            {props.discounted.map((point) => {
              return (
                <ItemCarousel
                  removeFromLiked={props.removeFromLiked}
                  setLike={props.setLike}
                  key={point.id}
                  item={point}
                  addToTheCart={props.addToTheCart}
                />
              );
            })}
          </section>
          <button className="swiper-button-next" onClick={nextHandler}>
            <img
              src="./IMG/arr.png"
              className="button-back-img"
              alt="arrowForward"
            />
          </button>
        </div>
      </div>
    </>
  );
};

DiscountCarousel.propTypes = {
  removeFromLiked: PropTypes.func,
  setLike: PropTypes.func,
  discounted: PropTypes.array,
  addToTheCart: PropTypes.func,
};
