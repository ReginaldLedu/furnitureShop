/* eslint-disable react/prop-types */
import React, { useState } from "react";
import "./register.css";
import { dataValidation } from "../../helpers/helpers";
import { useSetNewUserMutation } from "../../store/rtk";

export default function Register(props) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState(false);

  const [registerNewUser] = useSetNewUserMutation();
  const registerHandler = (login, password) => {
    if (!dataValidation(login, password)) {
      setError(true);
      return;
    } else {
      registerNewUser({
        userName: userName,
        userEmail: login,
        userPassword: password,
      });
      props.setRegister(false);
    }
  };
  return (
    <div className="cover">
      <div className="body__register">
        <section className="register__screen">
          <div className="register__wrapper">
            <input
              type="text"
              className="register__name"
              placeholder="Логин"
              value={login}
              onChange={(event) => setLogin(event.target.value)}
              onKeyDown={(event) => event}
            />
            <input
              type="text"
              className="register__password"
              placeholder="Пароль"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <input
              type="text"
              className="repeat__password"
              placeholder="Имя"
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
            />

            <button
              onClick={() => registerHandler(login, password)}
              type="button"
              className="register__button"
            >
              Зарегистрироваться
            </button>
            <button type="button" className="login__button">
              Войти
            </button>
            {error === true ? (
              <p className="error">
                Длина пароля должна быть не менее 8 символов, пароль должен
                содержать символы латинского алфавита верхнего и нижнего
                регистра, спец.символы и цифры.
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
