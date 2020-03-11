/* eslint-disable prettier/prettier */
import React, { useContext, memo } from "react";

import { createBottomTabNavigator, BottomTabBar } from "react-navigation-tabs";

//@ts-ignore
import Icon from "react-native-vector-icons/FontAwesome";
import HomeNavigator from "./HomeNavigator";
import PodcastList from "../pages/PodcastList";
import { View } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import { useUnreadNotificationNumber } from "@/store/notification/hooks";
import BillboardNavigator from "./BillboardNavigator";
import { ThemeMode } from "@/store/theme/ThemeWrapper";
import useEffectOnce from "react-use/lib/useEffectOnce";
import presenceSystem from "@/service/presenseSystem";


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

const HomeIcon = React.memo((props: HomeIconProps) => {
    const unreadNumber = useUnreadNotificationNumber()
    return (
        <View>
            <Icon name="home" color={props.tintColor} size={24} />
            {unreadNumber > 0 && <StyledBadge>{unreadNumber}</StyledBadge>}
        </View>
    )
})


const ConnectedHomeIcon = HomeIcon

export const CustomTabbar = memo((props) => {

    useEffectOnce(()=>{
        presenceSystem.init()
    })
    const theme = useContext(ThemeContext)

    //@ts-ignore
    return <BottomTabBar {...props}
    activeTintColor={theme.name === ThemeMode.DARK ? "#bdbdbd":"#787878"}
    inactiveTintColor = {theme.name === ThemeMode.DARK ? "#787878":"#bdbdbd"}
    style={{
        backgroundColor: theme.backgroundColor
    }} ></BottomTabBar>
})


const MainBottomTabNavigator = createBottomTabNavigator(
    {
        HomeNavigator: {
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
                ),

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
        tabBarComponent: CustomTabbar,
        tabBarOptions: {
            style: {
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