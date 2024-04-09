/* eslint-disable react/prop-types */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { NavLink } from "react-router-dom";
import "./header.css";
import { LoginCover } from "../login/login-cover";
import Register from "../register/register";
import { UserExit } from "../user-exit/user-exit";
import { ChosenIcon } from "../chosen-icon/chosen-icon";
import { clearChosen } from "../../store/slice";

function Header(props) {
  const dispatch = useDispatch();
  const user = useSelector(
    (state) => state.rootReducer.furnitureToolkit.currentUser
  );
  const [loginCover, setLoginCover] = useState(false);
  const [register, setRegister] = useState(false);

  return (
    // eslint-disable-next-line react/prop-types
    <header className={props.cls}>
      {register === true ? (
        <Register setRegister={setRegister} register={register} />
      ) : (
        ""
      )}
      {loginCover === true ? (
        <LoginCover
          loginCover={loginCover}
          setLoginCover={setLoginCover}
          register={register}
          setRegister={setRegister}
        />
      ) : (
        ""
      )}
      <div className="heading">
        <NavLink to="/furnitureShop/">
          <div className="heading__logo">
            <img className="logo__img" src="./IMG/logo.svg" />
          </div>
        </NavLink>

        <nav>
          <ChosenIcon />
          {user[0].id === "" ? (
            <div
              onClick={() => {
                dispatch(clearChosen());
                setLoginCover(true);
              }}
              className="breadcrumbs_personal"
            >
              <svg
                width="39"
                height="39"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.5,33C7.4,33,0,25.6,0,16.5C0,7.4,7.4,0,16.5,0C25.7,0,33,7.4,33,16.6C33,25.7,25.6,33,16.5,33z M20.6,19.7
					  c3.5,1.5,4.6,2.6,7,6.3c4.3-4.5,5.4-13.3-0.4-19.5C21.5,0.3,11.7,0.3,5.9,6.4c-5.8,6.1-4.8,15-0.5,19.6c1.5-3,3.8-5.1,7-6.3
					  c-4.1-2.8-4.3-8.4-1.1-11.5c3-2.9,7.7-2.8,10.6,0.1C24.9,11.4,24.7,16.9,20.6,19.7z M16,31.1c3.9,0,7.2-1.2,9.8-3.3
					  c0.3-0.2,0.3-0.4,0.2-0.7c-1.9-4-5.1-6.2-9.5-6.2c-4.4,0-7.6,2.2-9.5,6.2c-0.1,0.3-0.1,0.4,0.2,0.7C9.8,30,13,31.1,16,31.1z
						M16.5,7.9c-3.1,0-5.5,2.5-5.5,5.6c0,3,2.5,5.5,5.5,5.5c3.1,0,5.6-2.5,5.6-5.6C22.1,10.3,19.6,7.9,16.5,7.9z"
                  fill="white"
                  stroke="white"
                  strokeWidth="0.1"
                />
              </svg>
            </div>
          ) : (
            <UserExit />
          )}

          <NavLink className="header__link" to="/furnitureShop/catalogue">
            <div className="breadcrumbs">Каталог</div>
          </NavLink>
          <NavLink className="header__link" to="/furnitureShop/basket">
            <div className="breadcrumbs">Корзина</div>
          </NavLink>
        </nav>
        <div className="mob__icons">
          {user[0].id === "" ? (
            <div onClick={() => setLoginCover(true)} className="icon_personal">
              <svg
                width="25"
                height="25"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.5,33C7.4,33,0,25.6,0,16.5C0,7.4,7.4,0,16.5,0C25.7,0,33,7.4,33,16.6C33,25.7,25.6,33,16.5,33z M20.6,19.7
					  c3.5,1.5,4.6,2.6,7,6.3c4.3-4.5,5.4-13.3-0.4-19.5C21.5,0.3,11.7,0.3,5.9,6.4c-5.8,6.1-4.8,15-0.5,19.6c1.5-3,3.8-5.1,7-6.3
					  c-4.1-2.8-4.3-8.4-1.1-11.5c3-2.9,7.7-2.8,10.6,0.1C24.9,11.4,24.7,16.9,20.6,19.7z M16,31.1c3.9,0,7.2-1.2,9.8-3.3
					  c0.3-0.2,0.3-0.4,0.2-0.7c-1.9-4-5.1-6.2-9.5-6.2c-4.4,0-7.6,2.2-9.5,6.2c-0.1,0.3-0.1,0.4,0.2,0.7C9.8,30,13,31.1,16,31.1z
						M16.5,7.9c-3.1,0-5.5,2.5-5.5,5.6c0,3,2.5,5.5,5.5,5.5c3.1,0,5.6-2.5,5.6-5.6C22.1,10.3,19.6,7.9,16.5,7.9z"
                  fill="white"
                  stroke="white"
                  strokeWidth="0.1"
                />
              </svg>
            </div>
          ) : (
            <>
              <UserExit />
              <ChosenIcon />
            </>
          )}

          <NavLink className="header__link" to="/furnitureShop/catalogue">
            <span className="icon__catalog">
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.800537"
                  y="0.900024"
                  width="4.57143"
                  height="4.57143"
                  fill="white"
                />
                <rect
                  x="0.800537"
                  y="8.21436"
                  width="4.57143"
                  height="4.57143"
                  fill="white"
                />
                <rect
                  x="0.800537"
                  y="15.5286"
                  width="4.57143"
                  height="4.57143"
                  fill="white"
                />
                <rect
                  x="8.11401"
                  y="8.21436"
                  width="4.57143"
                  height="4.57143"
                  fill="white"
                />
                <rect
                  x="8.11401"
                  y="15.5286"
                  width="4.57143"
                  height="4.57143"
                  fill="white"
                />
                <rect
                  x="8.11401"
                  y="0.900024"
                  width="4.57143"
                  height="4.57143"
                  fill="white"
                />
                <rect
                  x="15.4285"
                  y="8.21436"
                  width="4.57143"
                  height="4.57143"
                  fill="white"
                />
                <rect
                  x="15.4285"
                  y="15.5286"
                  width="4.57143"
                  height="4.57143"
                  fill="white"
                />
                <rect
                  x="15.4285"
                  y="0.900024"
                  width="4.57143"
                  height="4.57143"
                  fill="white"
                />
              </svg>
            </span>
          </NavLink>
          <NavLink className="header__link" to="/furnitureShop/basket">
            <span className="icon__cart">
              <svg
                width="19"
                height="17"
                viewBox="0 0 19 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg}"
              >
                <path
                  d="M11.5834 16.8333C12.1359 16.8333 12.6658 16.6138 13.0565 16.2231C13.4473 15.8324 13.6667 15.3025 13.6667 14.75C13.6667 14.1974 13.4473 13.6675 13.0565 13.2768C12.6658 12.8861 12.1359 12.6666 11.5834 12.6666C11.0309 12.6666 10.501 12.8861 10.1103 13.2768C9.71957 13.6675 9.50008 14.1974 9.50008 14.75C9.50008 15.3025 9.71957 15.8324 10.1103 16.2231C10.501 16.6138 11.0309 16.8333 11.5834 16.8333ZM4.29174 16.8333C4.84428 16.8333 5.37418 16.6138 5.76488 16.2231C6.15558 15.8324 6.37508 15.3025 6.37508 14.75C6.37508 14.1974 6.15558 13.6675 5.76488 13.2768C5.37418 12.8861 4.84428 12.6666 4.29174 12.6666C3.73921 12.6666 3.20931 12.8861 2.81861 13.2768C2.4279 13.6675 2.20841 14.1974 2.20841 14.75C2.20841 15.3025 2.4279 15.8324 2.81861 16.2231C3.20931 16.6138 3.73921 16.8333 4.29174 16.8333ZM17.873 2.16975C18.133 2.16136 18.3796 2.05217 18.5606 1.86525C18.7416 1.67834 18.8428 1.42836 18.8428 1.16819C18.8428 0.908013 18.7416 0.658037 18.5606 0.471123C18.3796 0.28421 18.133 0.175013 17.873 0.166626H16.674C15.7345 0.166626 14.922 0.818709 14.7178 1.73538L13.4126 7.61246C13.2084 8.52912 12.3959 9.18121 11.4563 9.18121H3.63133L2.12924 3.17079H11.8636C12.1212 3.15904 12.3644 3.04844 12.5425 2.86199C12.7206 2.67555 12.82 2.42761 12.82 2.16975C12.82 1.91189 12.7206 1.66395 12.5425 1.47751C12.3644 1.29106 12.1212 1.18046 11.8636 1.16871H2.12924C1.82473 1.16862 1.5242 1.23796 1.25051 1.37145C0.976815 1.50495 0.737161 1.69909 0.549763 1.93911C0.362364 2.17913 0.232155 2.45872 0.169034 2.75662C0.105914 3.05452 0.111544 3.36289 0.185495 3.65829L1.68758 9.66662C1.79586 10.1002 2.046 10.485 2.39821 10.7601C2.75042 11.0351 3.18447 11.1844 3.63133 11.1843H11.4563C12.368 11.1845 13.2524 10.8736 13.9636 10.3032C14.6748 9.73275 15.1701 8.93681 15.3678 8.04683L16.674 2.16975H17.873Z"
                  fill="white"
                />
              </svg>
            </span>
          </NavLink>
        </div>
      </div>
      {props.children}
    </header>
  );
}

Header.propTypes = {
  cls: PropTypes.string.isRequired,
};
export default React.memo(Header);
