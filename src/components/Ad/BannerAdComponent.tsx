import React from "react";
import  {
	TestIds,
	BannerAd,
	BannerAdSize,
} from "@react-native-firebase/admob";
import { Platform } from "react-native";

import styled from 'styled-components/native';

// const SWrapper = styled.View`
//     background-color: red;
//     height: 20px;
//     width: 100%;
// `


const adUnitId = __DEV__
	? TestIds.BANNER
    : "ca-app-pub-9321650002552239/7717497590";
    


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
