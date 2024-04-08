import React from "react";
import { memo } from "react";
import "./for.css";

export const For = memo(function ForIn() {
  console.log("for");
  return (
    <section className="for center">
      <h2 className="for__title">Мебель для ...</h2>
      <div className="for__blocks">
        <div className="for__item for__item_1 for__item_big">ОТДЫХА</div>
        <div className="for__item for__item_2 for__item_big">РАБОТЫ</div>
        <div className="for__item for__item_3">КУХНИ</div>
        <div className="for__item for__item_4">ДЕТСКОЙ</div>
        <div className="for__item for__item_5">ВАННОЙ</div>
      </div>
    </section>
  );
});
