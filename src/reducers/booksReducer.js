"use strict"

// BOOK REDUCERS
export function booksReducers(state={books:[]}, action) {

	switch(action.type) {
		
		// Get books
		case "GET_BOOKS":
			return {...state, books: [...action.payload]}
		// Post book
		case "POST_BOOK":
			let books = {books: [...state.books, ...action.payload], msg: 'Saved! Click to continue', style:'success', validation: 'success'};
			return books;
		break;

		case "POST_BOOK_REJECTED":
			return {...state, msg: 'Please try again', style: 'danger', validation: 'error'}
		break;

		// Reset Button
		case "RESET_BUTTON":
			return {...state, msg: null, style: 'primary', validation: null}
		break;

		// Delete book
		case "DELETE_BOOK":
		  const currState = [...state.books]
	      const indexOfBookToDelete = currState.findIndex(book => {
	        return book._id == action.payload
	      });
	      return {books: [...currState.slice(0, indexOfBookToDelete), ...currState.slice(indexOfBookToDelete + 1)]};
		
		break;

		// Update book
		case "UPDATE_BOOK":
			const currentBookToUpdate = [...state.books]
			const indexToUpdate = currentBookToUpdate.findIndex(
				function(book) {
					return book._id === action.payload._id;
				}
			)

			const newBooksUpdated = {
				...currentBookToUpdate[indexToUpdate], 
				title: action.payload.title	
			};

			let newBooksUpdateArr = {
				books: [...currentBookToUpdate.slice(0, indexToUpdate), newBooksUpdated,
				...currentBookToUpdate.slice(indexToUpdate + 1)]
			};

			return newBooksUpdateArr;
		break;
	}
	return state;
}