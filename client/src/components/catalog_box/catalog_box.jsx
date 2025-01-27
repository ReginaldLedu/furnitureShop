/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import "./catalog-box.css";
import { List } from "../list/list";
import { Sort } from "../sort/sort";
import { Search } from "../search/search";

export function Catalog_box(props) {
  return (
    <section className="catalog__menu center">
      <h2 className="catalog__title">Каталог товаров</h2>
      <Sort
        sortOnChange={props.sortOnChange}
        searchWord={props.searchWord}
        setSearchWord={props.setSearchWord}
      />
      <Search
        searchOnClick={props.searchOnClick}
        searchWord={props.searchWord}
        setSearchWord={props.setSearchWord}
      />
      <div className="catalog__items center">
        <List
          removeFromLiked={props.removeFromLiked}
          fetching={props.fetching}
          getFurnitureByPageASYNC={props.getFurnitureByPageASYNC}
          setFetching={props.setFetching}
          forScroll={props.forScroll}
          list={props.list}
          addToTheCart={props.addToTheCart}
          setLike={props.setLike}
        />
      </div>
    </section>
  );
}

Catalog_box.propTypes = {
  removeFromLiked: PropTypes.func,
  fetching: PropTypes.bool,
  getFurnitureByPageASYNC: PropTypes.func,
  setFetching: PropTypes.func,
  forScroll: PropTypes.func,
  searchOnClick: PropTypes.func,
  sortOnChange: PropTypes.func,
  setLike: PropTypes.func,
  addToTheCart: PropTypes.func,
  list: PropTypes.array,
  searchWord: PropTypes.string,
  setSearchWord: PropTypes.func,
};
