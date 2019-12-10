/* eslint-disable prettier/prettier */
import React from "react";

import { createBottomTabNavigator, BottomTabBar } from "react-navigation-tabs";

//@ts-ignore
import Icon from "react-native-vector-icons/FontAwesome";
import HomeNavigator from "./HomeNavigator";
import PodcastList from "../pages/PodcastList";
import { View } from "react-native";
import styled from "styled-components/native";
import { useUnreadNotificationNumber } from "@/store/notification/hooks";
import BillboardNavigator from "./BillboardNavigator";


const StyledBadge = styled.Text`
    position: absolute;
    border-radius: 7px;
    right: -4px; 
    bottom: 0px;
    height: 14px;
    width: 14px;
    font-size: 10px;
    background: #ff4f4f;
    color: #696969;
    text-align: center;
    font-weight: bold;
    
`

interface HomeIconProps {
    tintColor: string,
}

const HomeIcon = (props: HomeIconProps) => {
    const unreadNumber = useUnreadNotificationNumber()
    return (
        <View>
            <Icon name="home" color={props.tintColor} size={24} />
            {unreadNumber> 0 && <StyledBadge>{unreadNumber}</StyledBadge>}
        </View>
    )
}


const ConnectedHomeIcon = HomeIcon
const MainBottomTabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: HomeNavigator,
            navigationOptions: {
                tabBarLabel: "Home",
                tabBarIcon: ({ tintColor }) => (
                    <ConnectedHomeIcon tintColor={tintColor as string} />
                )
            }
        },
        BillboardNavigator: {
            screen: BillboardNavigator,
            navigationOptions: {
                tabBarLabel: "BillBoard",
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="bar-chart" color={tintColor} size={24} />
                )
            }
        },
        PodcastList: {
            screen: PodcastList,
            navigationOptions: {
                tabBarLabel: "Podcasts",
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="book" color={tintColor} size={24} />
                )
            }
        }
    },
    {
        tabBarComponent: BottomTabBar,
        tabBarOptions: {
            activeTintColor: "black",
            inactiveTintColor: "grey",
            style: {
                backgroundColor: "white",
                borderTopWidth: 0,
                shadowOffset: { width: 5, height: 3 },
                shadowColor: "black",
                shadowOpacity: 0.5,
                elevation: 5
            }
        }
    }
);


export default MainBottomTabNavigator;