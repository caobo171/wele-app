// import { createStore, applyMiddleware, compose } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
// import rootReducer from "./reducer";

// import thunk from "redux-thunk";

// const middleware = [thunk];
// const enhancers = [];
// const initialState = {};

// // if (process.env.NODE_ENV === "development") {
// //   const devToolsExtension =
// //     window.__REDUX_DEVTOOLS_EXTENSION__ &&
// //     window.__REDUX_DEVTOOLS_EXTENSION__();

// //   if (typeof devToolsExtension === "function") {
// //     enhancers.push(devToolsExtension());
// //   }
// // }

// const composeEnhancers = composeWithDevTools({
//   // Specify name here, actionsBlacklist, actionsCreators and other options if needed
// });

// // const componsedEnhancers = composeWithDevTools(
// //   applyMiddleware(...middleware),
// //   ...enhancers
// // );

// const store = createStore(
//   rootReducer,
//   initialState,
//   compose(
//     applyMiddleware(...middleware),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );

// export default store;

import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer";

const middleware = [thunk];
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);
