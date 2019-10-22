import React from "react";
import store from "./redux/store";
import { Provider } from "react-redux";
import NavigatorTree from "./NavigatorTree";

const App = () => {
  return (
    <Provider store={store}>
      <NavigatorTree />
    </Provider>
  );
};

export default App;
