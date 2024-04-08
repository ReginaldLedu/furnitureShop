/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export function Like(props) {
  const user = useSelector(
    (state) => state.rootReducer.furnitureToolkit.currentUser
  );
  const chosen = useSelector(
    (state) => state.rootReducer.furnitureToolkit.chosen
  );

  const inChosen = chosen.find((item) => item.id === props.item.id);
  return (
    <>
      {inChosen !== undefined ? (
        <img
          onClick={() => {
            props.removeFromLiked(
              {
                furnitureIdFromUser: props.item.id,
                userId: user[0].id,
              },
              props.item
            );
          }}
          className="catalog-item__like"
          src="../IMG/likered.png"
          alt="#"
        />
      ) : (
        <img
          onClick={() => {
            props.setLike(
              {
                furnitureIdFromUser: props.item.id,
                userId: user[0].id,
              },
              props.item
            );
          }}
          className="catalog-item__like"
          src="../IMG/like.svg"
          alt="#"
        />
      )}
    </>
  );
}

Like.propTypes = {
  item: PropTypes.object,
  setLike: PropTypes.func,
  removeFromLiked: PropTypes.func,
};
