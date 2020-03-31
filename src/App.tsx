import React, { useCallback } from "react";
import store from "./store/store";

import {check} from 'react-native-permissions';


import useEffectOnce from 'react-use/lib/useEffectOnce'
import SplashScreen from 'react-native-splash-screen'
//@ts-ignore
import { Provider } from "react-redux";
import NavigatorTree from "./MainWrapper";
import ThemeWrapper from "@store/theme/ThemeWrapper";

import {screensEnabled} from 'react-native-screens';

screensEnabled();


console.disableYellowBox = true;
const App = () => {




  useEffectOnce(() => {
    SplashScreen.hide()
  })

  return (
    <Provider store={store}>
      <ThemeWrapper>
        <NavigatorTree />
      </ThemeWrapper>
    </Provider>
  );
};

export default App;
