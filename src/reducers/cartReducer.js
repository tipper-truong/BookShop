"use strict"
// CART REDUCERS
export function cartReducers(state={cart: []}, action) {
	switch(action.type) {
		case "GET_CART":
			return {...state, cart: [...action.payload]}

		case "ADD_TO_CART":
			return {cart: [...state.cart, ...action.payload]};

		case "DELETE_CART_ITEM":
			 return {...state, cart: action.payload};

		case "UPDATE_CART":
			 return {...state, cart: action.payload};

		case "UPDATE_TOTAL":
			return {
				cart: action.payload,
				totalAmount: action.totalAmount,
				totalQty: action.totalQty
			}
	}

	return state;
}
