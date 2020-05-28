import React from "react";

import styled from "styled-components/native";
import { ThemeMode, CustomTheme } from "@/store/theme/ThemeWrapper";
import Constants from "@/Constants";

const SWrapper = styled.View`
	flex: 1;
	align-items: center;
    justify-content: center;
    height: 100%;
`;

const SText = styled.Text<{ theme: CustomTheme }>`
    font-weight: 600;
    font-size: 20px;
    color: ${props=> props.theme.textColorH1};
    opacity: 0.6;
`;
const SImage = styled.Image<{ theme: CustomTheme }>`
    margin-top: 20px;
    width: ${Constants.WIDTH * 0.7};
    height: ${Constants.WIDTH * 0.7};
    opacity: ${props=> props.theme.name === ThemeMode.LIGHT ? 1: 0.3};
`;

const EmptyComponent = React.memo(() => {
	return (
		<SWrapper>
            <SImage 
            resizeMode="contain"
            source={require("@/assets/empty-noti.png")} />
			<SText>{"No notifications right now! "}</SText>
		</SWrapper>
	);
});

export default EmptyComponent;
