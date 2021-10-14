import React, { useCallback, useEffect } from "react";
import {Alert} from 'react-native';
import store from "./store/store";
import SplashScreen from "react-native-splash-screen";
//@ts-ignore
import { Provider } from "react-redux";
import MainWrapper from "./MainWrapper";
import ThemeWrapper from "@store/theme/ThemeWrapper";
import { screensEnabled } from "react-native-screens";

screensEnabled();

console.disableYellowBox = true;
const App = () => {
	useEffect(() => {
        SplashScreen.hide();
	}, []);

	return (
		<Provider store={store}>
			<ThemeWrapper>
				<MainWrapper />
			</ThemeWrapper>
		</Provider>
	);
};

export default App;
