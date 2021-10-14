import React, { useContext, useCallback } from "react";
import EntypoIcon from "react-native-vector-icons/Entypo";
import styled from "styled-components/native";
import { UserType } from "@store/user/types";
import UserAvatar from "@components/User/UserAvatar";
import { CustomTheme } from "@store/theme/ThemeWrapper";
import { NavigationContext } from "react-navigation";
import { useCurrentUser } from "@/store/user/hooks";
import Touchable from "@/components/UI/Touchable";
import Constants from "@/Constants";

// const SUserSection = styled.View`

// `;

const SOrderIndicator = styled.Text<{ color: string }>`
	text-align: center;
	flex: 0.8;
	margin-top: 20px;
	margin-right: 8px;
	border-bottom-width: 2px;
	border-color: #bababa;
	margin-bottom: 28px;

	font-size: 12px;
	font-weight: bold;
	color: ${(props) => props.color};
`;

const SUserNameWrapper = styled.View<{ isFake?: boolean }>`
	flex: 8;
	flex-direction: column;
	margin-left: 12px;
`;

const SName = styled.Text<{ theme: CustomTheme }>`
	font-weight: bold;
	font-size: ${Constants.BILLBOARD_ITEM_FONTSIZE}px;
	letter-spacing: 1px;
	color: ${(props) => props.theme.textColorH1};
`;

const SAvatarWrapper = styled.View`
	flex: 2;
`;

const SSubDescription = styled.Text`
	font-size: ${Constants.BILLBOARD_ITEM_FONTSIZE - 2}px;
	color: #757575;
`;


const STouchable = styled(Touchable)`
	height: 58px;
	width: 100%;
    flex-direction: row;
    align-items: center;
`;

const renderColor = (index: number) => {
	switch (index) {
		case 0:
			return "blue";
		case 1:
			return "green";
		case 2:
			return "red";
		default:
			return "grey";
	}
};

interface Props {
	total: number;
	index: number;
	user: UserType;
}
const BillboardItem = React.memo(
	(props: Props) => {
		const user = useCurrentUser();
		const nav = useContext(NavigationContext);

		const navigateToAnotherProfile = useCallback(() => {
            if (props.user.id === "-1") return;
			nav.navigate("AnotherProfile", {
				user: props.user,
			});
		}, [props.user]);
		return (
			<STouchable onPress={navigateToAnotherProfile}>
				<SOrderIndicator color={renderColor(props.index)}>
					{props.index + 1}
				</SOrderIndicator>
				<SAvatarWrapper>
					<UserAvatar user={props.user} index={props.index} />
				</SAvatarWrapper>
				<SUserNameWrapper isFake={props.user.id !== "-1"}>
					<SName>
						{props.user.displayName}{" "}
						{user && props.user.id === user.id && "(You)"}
					</SName>
					<SSubDescription>
						{Number(props.total)
							.toFixed(1)
							.toString()}
						{" scores"}
					</SSubDescription>
				</SUserNameWrapper>
			</STouchable>
		);
	},
	(prev, next) =>
		prev.total === next.total &&
		prev.user.id === next.user.id &&
		prev.index === next.index
);

export default BillboardItem;
