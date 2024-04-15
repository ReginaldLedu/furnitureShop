/* eslint-disable react/prop-types */
import React, { useState, useRef } from "react";
import { IMaskInput } from "react-imask";
import PropTypes from "prop-types";
import "./cart-form.css";

export const Cart_form = props => {
	const [phoneNumber, setPhoneNumber] = useState("");
	const [disabled, setDisabled] = useState(true);
	const [error, setError] = useState(false);
	const inputRef = useRef(null);
	const ref = useRef(null);
	const errorClass = () => {
		if (error) {
			return "in error";
		} else {
			return "in";
		}
	};
	return (
		<div className="cart__form">
			<h2 className="form__title">Оформление заказа</h2>
			<form action="#" className="in">
				<input type="text" className="name" placeholder="Имя Фамилия" />
			</form>
			<form action="#" className={errorClass()}>
				<IMaskInput
					value={phoneNumber}
					className="phone"
					mask={`+{7}(000)000-00-00`}
					radix="."
					unmask={true}
					ref={ref}
					inputRef={inputRef}
					onAccept={value => {
						setPhoneNumber(value);
						if (value.length === 11) {
							setDisabled(false);
							setError(false);
						} else {
							setError(true);
							setDisabled(true);
						}
					}}
					placeholder="+7 (___) ___ __-__"
				/>
				{/*<input type="tel" className="phone" placeholder="+ 7 904 000 80 80" />*/}
			</form>
			<form action="#" className="in">
				<input type="text" className="address" placeholder="Адрес доставки" />
			</form>
			<p className="total">Итого: {props.totalAmount}.</p>
			<div className="order1">
				<button disabled={disabled} className="order">
					Оформить заказ
				</button>
			</div>
		</div>
	);
};

Cart_form.propTypes = { totalAmount: PropTypes.number };
