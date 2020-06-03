import React from "react";
import  {
	TestIds,
	BannerAd,
	BannerAdSize,
} from "@react-native-firebase/admob";

import { Platform } from "react-native";

const adUnitId = __DEV__
	? TestIds.BANNER
    : ( Platform.OS === 'android' ? "ca-app-pub-9321650002552239/8709284099" : "ca-app-pub-9321650002552239/2848445142" ) ;
    


const BannerAdComponent = React.memo(() => {
	return (
        // <SWrapper>
            <BannerAd
                unitId={adUnitId}
                size={BannerAdSize.FULL_BANNER}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                    keywords: ['english', 'podcast', 'learning']
                }}
            />
        // </SWrapper>

	);
});

export default BannerAdComponent;
