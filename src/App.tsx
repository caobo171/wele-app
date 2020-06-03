import React, { useCallback, useEffect } from "react";
import {Alert} from 'react-native';
import store from "./store/store";
import InAppBilling from "react-native-billing";
import SplashScreen from "react-native-splash-screen";
//@ts-ignore
import { Provider } from "react-redux";
import MainWrapper from "./MainWrapper";
import ThemeWrapper from "@store/theme/ThemeWrapper";
import { screensEnabled } from "react-native-screens";

screensEnabled();
// const purchase = async () => {
// 	try {
// 		await InAppBilling.open();
// 		const details = await InAppBilling.purchase("1_inapp.wele");
// 		Alert.alert("You purchased: ", JSON.stringify(details));
// 	} catch (err) {
// 		console.log(err);
// 	} finally {
// 		await InAppBilling.close();
// 	}
// };

console.disableYellowBox = true;
const App = () => {
	useEffect(() => {
        SplashScreen.hide();
        // purchase();
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
