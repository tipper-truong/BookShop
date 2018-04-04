"use strict"

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// React-Router
import { BrowserRouter, Route, IndexRoute, browserHistory, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

import {applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

// import combined reducers
import reducers from './reducers/index';

// import actions
import { addToCart } from './actions/cartActions'
import { postBooks, deleteBooks, updateBooks } from './actions/bookActions'

// STEP 1 create the middleware and store
const middleware = applyMiddleware(thunk, logger);

const store = createStore(reducers, middleware);

import BooksList from './components/pages/booksList';
import Cart from './components/pages/cart';
import BooksForm from './components/pages/booksForm';
import Menu from './components/menu';
import Footer from './components/footer';

// Provider --> React application can access the state from any component
// store is a props

const Routes = (
  <Provider store={store}>
      <BrowserRouter>
        <div>
        <Menu />
        <Switch>
            <Route exact path="/" component={BooksList}/>
            <Route path="/admin" component={BooksForm}/>
            <Route path="/cart" component={Cart}/>
        </Switch>
        <Footer />
        </div>
      </BrowserRouter>
  </Provider>
)
 
render(
  Routes, document.getElementById('app')
);




