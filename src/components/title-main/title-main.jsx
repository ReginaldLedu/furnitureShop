import React from "react";
import { NavLink } from "react-router-dom";
import "./title-main.css";

export function TitleMain() {
  return (
    <section className="top__block">
      <div className="title__order">
        <div className="title__first">Все, чего</div>
        <div className="title__second">
          <div className="title__second1">заслуживает</div>
          <div className="title__second2">ваш дом</div>
        </div>
      </div>
      <p className="slogan">Наша мебель - ваше отражение</p>
      <NavLink className="header__link " to="/catalogue">
        <p className="catalog">Перейти в каталог</p>
      </NavLink>
    </section>
  );
}
export default React.memo(TitleMain);
