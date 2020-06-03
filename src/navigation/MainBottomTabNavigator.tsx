/* eslint-disable prettier/prettier */
import React, { useContext, memo } from "react";

import { createBottomTabNavigator, BottomTabBar } from "react-navigation-tabs";

//@ts-ignore
import Icon from "react-native-vector-icons/FontAwesome";
import HomeNavigator from "./HomeNavigator";
import PodcastList from "../pages/PodcastList";
import { View, Platform } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import { useUnreadNotificationNumber } from "@/store/notification/hooks";
import BillboardNavigator from "./BillboardNavigator";
import { ThemeMode } from "@/store/theme/ThemeWrapper";
import useEffectOnce from "react-use/lib/useEffectOnce";
import presenceSystem from "@/service/presenseSystem";
import UserProfile from "@/pages/UserProfile";
import Notifications from "@/pages/Notifications";
import BannerAdComponent from "@/components/Ad/BannerAdComponent";
import PlayerThumbnail from "@/pages/Player/PlayerThumbnail";
import admob, {MaxAdContentRating} from '@react-native-firebase/admob';


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


const StyledBadge = styled.Text`
	font-size: 10px;
	color: #ffffff;
	text-align: center;
	font-weight: bold;
`;

const StyledBadgeWrapper = styled.View`
	background: #ff4f4f;
	align-items: center;
	justify-content: center;
	border-radius: 7px;
	position: absolute;
	right: -4px;
	bottom: 0px;
	height: 14px;
	width: 14px;
`;




interface HomeIconProps {
	tintColor: string;
}

const NotificationIcon = React.memo((props: HomeIconProps) => {
	const unreadNumber = useUnreadNotificationNumber();
	return (
		<View>
			<Icon name="bell-o" color={props.tintColor} size={24} />
			{unreadNumber > 0 && (
				<StyledBadgeWrapper>
					<StyledBadge>{unreadNumber}</StyledBadge>
				</StyledBadgeWrapper>
			)}
		</View>
	);
});

export const CustomTabbar = memo((props) => {
	useEffectOnce(() => {
		presenceSystem.init();
	});
	const theme = useContext(ThemeContext);

	return (
		<>
            {shouldShowAd &&  <BannerAdComponent/>}
            <PlayerThumbnail/>
			<BottomTabBar
				{...props}
				activeTintColor={
					theme.name === ThemeMode.DARK ? "#bdbdbd" : "#787878"
				}
				inactiveTintColor={
					theme.name === ThemeMode.DARK ? "#787878" : "#bdbdbd"
				}
				style={{
					backgroundColor: theme.backgroundColor,
				}}
			/>
		</>
	);
});

const MainBottomTabNavigator = createBottomTabNavigator(
	{
		HomeNavigator: {
			screen: HomeNavigator,
			navigationOptions: {
				tabBarLabel: "Home",
				tabBarIcon: ({ tintColor }) => (
					<Icon name="home" color={tintColor} size={24} />
				),
			},
		},
		BillboardNavigator: {
			screen: BillboardNavigator,
			navigationOptions: {
				tabBarLabel: "BillBoard",
				tabBarIcon: ({ tintColor }) => (
					<Icon name="bar-chart" color={tintColor} size={24} />
				),
			},
		},
		PodcastList: {
			screen: PodcastList,
			navigationOptions: {
				tabBarLabel: "Podcasts",
				tabBarIcon: ({ tintColor }) => (
					<Icon name="book" color={tintColor} size={24} />
				),
			},
		},
		Notification: {
			screen: Notifications,
			navigationOptions: {
				tabBarLabel: "Notification",
				tabBarIcon: ({ tintColor }) => (
					<NotificationIcon tintColor={tintColor} />
				),
			},
		},
		UserProfile: {
			screen: UserProfile,
			navigationOptions: {
				tabBarLabel: "You",
				tabBarIcon: ({ tintColor }) => (
					<Icon name="user" color={tintColor} size={24} />
				),
			},
		},
	},
	{
		tabBarComponent: CustomTabbar,
		tabBarOptions: {
			style: {
				borderTopWidth: 0,
				shadowOffset: { width: 5, height: 3 },
				shadowColor: "black",
				shadowOpacity: 0.5,
				elevation: 5,
			},
		},
	}
);

export default MainBottomTabNavigator;
