import React, { useCallback, useEffect } from "react";
import store from "./store/store";
import useEffectOnce from 'react-use/lib/useEffectOnce'
import SplashScreen from 'react-native-splash-screen'
//@ts-ignore
import { Provider } from "react-redux";
import MainWrapper from "./MainWrapper";
import ThemeWrapper from "@store/theme/ThemeWrapper";

import {screensEnabled} from 'react-native-screens';

import admob, {MaxAdContentRating, InterstitialAd, TestIds , AdEventType, BannerAd} from '@react-native-firebase/admob';
import { Platform } from "react-native";
import BannerAdComponent from "./components/Ad/BannerAdComponent";


const shouldShowAd = ( Platform.OS === 'android' ) 

shouldShowAd  && admob()
.setRequestConfiguration({
      // Update all future requests suitable for parental guidance
      maxAdContentRating: MaxAdContentRating.PG,

      // Indicates that you want your content treated as child-directed for purposes of COPPA.
      tagForChildDirectedTreatment: true,
  
      // Indicates that you want the ad request to be handled in a
      // manner suitable for users under the age of consent.
      tagForUnderAgeOfConsent: true,
})
.then(()=>{
  console.log('request successfull for admob');
})
.catch(err=> console.log('Request error: ', err))





// const interstitial = shouldShowAd  ? InterstitialAd.createForAdRequest(adUnitId, {
//   requestNonPersonalizedAdsOnly: true,
//   keywords: ['english', 'podcast', 'learning'],
// }): null;

screensEnabled();


console.disableYellowBox = true;
const App = () => {

  useEffect(() => {
    SplashScreen.hide()

    // const eventListener = shouldShowAd ? interstitial.onAdEvent(type => {
    //     if (type === AdEventType.LOADED) {
    //       interstitial.show();
    //     }
    //   }) : null
    // shouldShowAd  && interstitial.load();
    return ()=>{
        // shouldShowAd  &&  eventListener();
    }
    
  },[])

  return (
    <Provider store={store}>
      <ThemeWrapper>
        <MainWrapper />
        {/* <BannerAdComponent/> */}
      </ThemeWrapper>
    </Provider>
  );
};

export default App;
