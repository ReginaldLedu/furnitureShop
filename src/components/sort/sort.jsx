/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import "./sort.css";
import { FilterSortTemplate } from "../filter-sort-template/filter-sort-template";

export const Sort = (props) => {
  return (
    <div className="linkbox center">
      <ul className="breadcrumbs__middle">
        <li className="breadcrumbs__item">
          <Link to="/" className="breadcrumbs__item">
            Главная
          </Link>
        </li>
        <li className="breadcrumbs__item">
          <Link to="/catalogue" className="breadcrumbs__item">
            Каталог
          </Link>
        </li>
      </ul>
      <FilterSortTemplate
        searchWord={props.searchWord}
        label="Порядок:"
        onChange={props.sortOnChange}
        option1={{ value: "toexpensive", title: "по возрастанию цены" }}
        option2={{ value: "tocheap", title: "по убыванию цены" }}
        option3={{ value: "popular", title: "по популярности" }}
        option4={{ value: "defaultValue", title: "по умолчанию" }}
      />
     
    </div>
  );
};
