/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./login-cover.css";
import { getUserByEmailASYNC } from "../../store/rtk";
import { dataValidation } from "../../helpers/helpers";


export function LoginCover(props) {
  const dispatch = useDispatch();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const user = useSelector(
    (state) => state.rootReducer.furnitureToolkit.currentUser
  );

  const loginHandler = (login, password) => {
  
    if (!dataValidation(login, password)) {
      setError(true);
      return;
    }
    if (user[0].userPassword === password) {
      props.setLoginCover(false);
    } else if (!password || !user[0].userPassword) {
      setError(true);
    } else if (user[0].userPassword !== password) {
      setError(true);
    }
  };

  return (
    <div className="cover">
      <div className="body__login">
        <section className="login__screen">
          <div className="login__wrapper">
            <input
              type="text"
              className="login__name"
              placeholder="Логин"
              value={login}
              onChange={(event) => setLogin(event.target.value)}
              onBlur={() => {
                dispatch(getUserByEmailASYNC(login));
              }}
            />
            <input
              type="password"
              className="login__password"
              placeholder="Пароль"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              type="button"
              className="login__button"
              onClick={() => loginHandler(login, password)}
            >
              Войти
            </button>

            <button
              onClick={() => {
                props.setLoginCover(false);
                props.setRegister(true);
              }}
              type="button"
              className="register__button"
            >
              Зарегистрироваться
            </button>
            {error === true ? (
              <p className="error">
                Пожалуйста, введите корректные адрес эл.почты и пароль
              </p>
            ) : (
              ""
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
