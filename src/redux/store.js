import { createStore, applyMiddleware } from "redux";

import rootReducer from "./reducer";

import thunk from "redux-thunk";

const enhancers = applyMiddleware(thunk);

const initialState = {};

const store = createStore(rootReducer, initialState, enhancers);

export default store;
