import React, { useCallback } from "react";
import styled from "styled-components/native";

import { ThemeMode, CustomTheme } from "@/store/theme/ThemeWrapper";
import { updateTheme } from "@/store/theme/functions";
import { logOut } from "@/store/user/function";
import InAppBilling from "react-native-billing";
import { Alert } from "react-native";
import Constants from "@/Constants";
import { useCurrentUser } from "@/store/user/hooks";
import { upgradeUser } from "@/store/user/function";

const SPayButton = styled.TouchableOpacity`
	width: 200px;
	height: 40px;
	border-width: 4px;
	border-radius: 20px;
	padding: 4px;
	text-align: center;
	justify-content: center;
	align-items: center;
	border-color: #595959;
	margin: 8px;
`;

const StyledText = styled.Text<{ theme: CustomTheme }>`
	font-weight: bold;
	letter-spacing: 1px;
	font-size: ${Constants.BUTTON_FONTSIZE}px;
	text-transform: uppercase;
	color: ${(props) => props.theme.textColorH1};
`;

const SWrapper = styled.View`
	width: 100%;
	align-items: center;
`;



const UpgradeButton = React.memo(() => {
	const user = useCurrentUser();
	const payHandle = useCallback(async () => {
		try {
		    await InAppBilling.open();
            const details = await InAppBilling.purchase(__DEV__? "android.test.purchased": "1_inapp.wele");
            if(details && !user.upgraded){
                console.log('details', details)
                await upgradeUser(user.id);
            }
		} catch (err) {
		    console.log('error purchase'+err);
		} finally {
		    await InAppBilling.close();
		}
	}, [user]);
	return (
		<SWrapper>
			{user.upgraded ? (
				<StyledText> Account is Upgraded</StyledText>
			) : (
				<SPayButton onPress={payHandle}>
					<StyledText>Upgrade Account</StyledText>
				</SPayButton>
			)}
		</SWrapper>
	);
});

export default UpgradeButton;
