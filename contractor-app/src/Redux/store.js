import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { combineReducers } from 'redux';
import bookkeepingReducer from './reducers/bookkeepingReducer'
import treeViewReducer from './reducers/treeViewReducer'

const initialState = {};

let middleware = [thunk]

const rootReducer = combineReducers({ 
  treeView: treeViewReducer,
  bookkeeping: bookkeepingReducer,
});

// DEV
const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(...middleware))
);

export default store;