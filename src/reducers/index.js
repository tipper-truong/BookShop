"use strict"
import { combineReducers } from 'redux';

// import reducers to be combined
import { booksReducers } from './booksReducer';
import { cartReducers } from './cartReducer';
// combine the reducers
export default combineReducers({
	books: booksReducers,
	cart: cartReducers

});