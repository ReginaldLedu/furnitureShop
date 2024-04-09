import React from "react";
import { Link } from "react-router-dom";
import "./chosen-icon.css";

export function ChosenIcon() {
  return (
    <>
      <Link to="/furnitureShop/chosen">
        <div className="breadcrumbs__chosen">
          <img
            className="breadcrumbs__chosen_img"
            src="./IMG/likered.png"
          ></img>
        </div>
      </Link>
    </>
  );
}
