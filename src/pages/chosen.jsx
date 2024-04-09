/* eslint-disable react/prop-types */
import React /* memo,*/ from "react";
import PropTypes from "prop-types";
import Header from "../components/header/header";
import { List } from "../components/list/list";
import { TitleChosen } from "../components/title-chosen/title-chosen";
import { useSelector } from "react-redux";
//import { getLikesByUser } from "../store/rtk";

export const Chosen = /*memo(function CatalogueIn*/ (props) => {
  const chosen = useSelector(
    (state) => state.rootReducer.furnitureToolkit.chosen
  );


  return (
    <>
      <Header cls="catalog__top center">
        <TitleChosen />
      </Header>
      <List
        center={"center"}
        removeFromLiked={props.removeFromLiked}
        list={chosen}
        setLike={props.setLike}
        addToTheCart={props.addToTheCart}
      ></List>
    </>
  );
}; /*)*/

Chosen.propTypes = {
  addToTheCart: PropTypes.func,
  removeFromLiked: PropTypes.func,
};
