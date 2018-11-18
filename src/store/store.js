import books from '../reducers/books.reducer';
import authors from '../reducers/authors.reducer';
import images from '../reducers/images.reducer';

import { combineReducers, createStore } from 'redux';
const reducer = combineReducers({ books, authors, images });
const store = createStore(reducer, {});

export default store;