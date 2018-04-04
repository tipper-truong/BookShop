"use strict"
import axios from 'axios';

// GET CART 
export function getCart() {
	return function(dispatch) {
		axios.get("/api/cart")
			 .then(function(response) {
			 	if(response.data.hasOwnProperty('cart')) {
				 	dispatch({type:"GET_CART", payload: response.data.cart})
				} else {
					dispatch({type:"GET_CART", payload: response.data})
				}
			 })
			 .catch(function(err) {
			 	dispatch({type:"GET_CART_REJECTED", payload:err})
			 })
	}
}

// ADD TO CART
export function addToCart(cart) {
	return function(dispatch) {
		axios.post("/api/cart", cart)
			 .then(function(response) {
			 	if(response.data.hasOwnProperty('cart')) {
			 		dispatch({type: "ADD_TO_CART", payload: response.data.cart})
				} else {
					dispatch({type: "ADD_TO_CART", payload: response.data})
				}
			})
			 .catch(function(err) {
			 	dispatch({type:"ADD_TO_CART_REJECTED", payload:"there was an error while adding your book to the cart"})
			 })
	}
}

// DELETE CART ITEM
export function deleteCartItem(cart) {
	return function(dispatch) {
		axios.post("/api/cart", cart)
			 .then(function(response) {
			 	if(response.data.hasOwnProperty('cart')) {
			 		dispatch({type: "DELETE_CART_ITEM", payload: response.data.cart})
			 	} else {
			 		dispatch({type: "DELETE_CART_ITEM", payload: response.data})
			 	}
			})
			 .catch(function(err) {
			 	dispatch({type:"DELETE_CART_ITEM_REJECTED", payload:"there was an error while deleting an item from your cart"})
			 })
	}
}

// UPDATE CART
export function updateCart(_id, unit, cart) {
	const currentBookToUpdate = cart;
	const indexToUpdate = currentBookToUpdate.findIndex(
				function(book) {
					return book._id === _id;
				}
			)

	const newBooksUpdated = {
				...currentBookToUpdate[indexToUpdate], 
				quantity: currentBookToUpdate[indexToUpdate].quantity + unit

			};

	let cartUpdate = {
				cart: [...currentBookToUpdate.slice(0, indexToUpdate), newBooksUpdated,
				...currentBookToUpdate.slice(indexToUpdate + 1)],
			};

	return function(dispatch) {
		axios.post("/api/cart", cartUpdate)
			 .then(function(response) {
			 	if(response.data.hasOwnProperty('cart')) {
			 		dispatch({type: "UPDATE_CART", payload: response.data.cart})
			 	} else {
			 		dispatch({type: "UPDATE_CART", payload: response.data})
			 	}
			})
			 .catch(function(err) {
			 	dispatch({type:"UPDATE_CART_REJECTED", payload:"there was an error while updating your cart"})
			 })
	}
}

// UPDATE TOTAL WHEN USER CHECK OUT
export function updateTotal(totalAmount, totalQty, currentCart) {
	return {
		type: "UPDATE_TOTAL",
		totalAmount: totalAmount,
		totalQty: totalQty,
		payload: currentCart
	}
}