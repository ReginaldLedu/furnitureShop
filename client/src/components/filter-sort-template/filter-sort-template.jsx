/* eslint-disable react/prop-types */
import React from "react";
import { memo } from "react";

export const FilterSortTemplate = memo(function FilterSortTemplateIn(props) {
  return (
    <form className="sorting" action="#">
      <label className="sorting__id">{props.label}</label>
      <select
        onChange={(e) => props.onChange(e, props.searchWord)}
        name="sort"
        className="list"
      >
        <option value={props.option1.value}>{props.option1.title}</option>
        <option value={props.option2.value}>{props.option2.title}</option>
        <option value={props.option3.value}>{props.option3.title}</option>
        <option defaultValue={props.option4.value} value={props.option4.value}>
          {props.option4.title}
        </option>
      </select>
    </form>
  );
});
