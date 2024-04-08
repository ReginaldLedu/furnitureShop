/* eslint-disable react/prop-types */
import React from "react";
import { memo, useEffect } from "react";
import { Item } from "../item/item";
import PropTypes from "prop-types";
import "./list.css";
//import { getRandomInt } from "../../helpers/get-random";

export const List = memo(function ListIn(props) {
  console.log("list");
  useEffect(() => {
    if (props.forScroll !== undefined) {
      props.forScroll();
    }
  }, [props.fetching]);

  useEffect(() => {
    if (props.getFurnitureByPageASYNC !== undefined) {
      props.getFurnitureByPageASYNC();
    }
  }, [props.fetching]);
  const center = () => {
    if (props.center !== undefined) {
      return "center";
    } else {
      return "";
    }
  };

  return (
    <div className={`item__blocks ${center()}`}>
      {props.list
        ? props.list.map((point) => (
            <Item
              key={point.id}
              setLike={props.setLike}
              removeFromLiked={props.removeFromLiked}
              item={point}
              addToTheCart={props.addToTheCart}
            />
          ))
        : " "}
    </div>
  );
});

List.propTypes = {
  center: PropTypes.string,
  list: PropTypes.array.isRequired,
  addToTheCart: PropTypes.func,
  setLike: PropTypes.func,
  removeFromLiked: PropTypes.func,
  fetching: PropTypes.bool,
  getFurnitureByPageASYNC: PropTypes.func,
  setFetching: PropTypes.func,
  forScroll: PropTypes.func,
};
