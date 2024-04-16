import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
	cart: [],
	currentUser: [{ id: "", userName: "", userEmail: "", userPassword: "" }],
	likes: [],
	chosen: [],
};
export const furnitureSlice = createSlice({
	name: "furnitureToolkit",
	initialState,
	reducers: {
		setCurrentUser: (state, action) => {
			state.currentUser = action.payload;
		},
		clearUser: state => {
			state.currentUser = [
				{ id: "", userName: "", userEmail: "", userPassword: "" },
			];
		},
		currentUserLikes: (action, state) => {
			state.currentUserLikes = [...state.currentUserLikes, action.payload];
		},
		addItemToTheCart: (state, action) => {
			let item = state.cart.find(item => item.id === action.payload.id);
			if (item) {
				state.cart.find(item => item.id === action.payload.id).quant++;
			} else {
				state.cart.push({ ...action.payload, quant: 1 });
			}
		},
		setCartOnLoad: (state, action) => {
			state.cart = action.payload;
		},

		removeAllGoodsFromTheCart: state => {
			state.cart = [];
		},
		removeGoodFromTheCart: (state, action) => {
			let item = state.cart.find(item => item.id === action.payload.id);
			if (item.quant > 1) {
				state.cart.find(item => item.id === action.payload.id).quant--;
			} else if (item.quant === 1) {
				state.cart = state.cart.filter(item => item.id !== action.payload.id);
			} else {
				return;
			}
		},

		setChosen: (state, action) => {
			state.chosen = [...state.chosen, action.payload];
		},

		removeFromChosen: (state, action) => {
			state.chosen = state.chosen.filter(item => item.id !== action.payload.id);
		},
		clearChosen: state => {
			state.chosen = [];
		},
	},
});

export default furnitureSlice;
export const {
  setCartOnLoad,
	clearChosen,
	removeFromChosen,
	setChosenInSlice,
	setChosen,
	setFiltered,
	setCurrentUser,
	clearUser,
	currentUserLikes,
	addItemToTheCart,
	removeAllGoodsFromTheCart,
	removeGoodFromTheCart,
	setSorted,
} = furnitureSlice.actions;
