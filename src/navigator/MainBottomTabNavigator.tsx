/* eslint-disable prettier/prettier */
import React from "react";

import { createBottomTabNavigator, BottomTabBar } from "react-navigation-tabs";

//@ts-ignore
import Icon from "react-native-vector-icons/FontAwesome";
import HomeNavigator from "./HomeNavigator";
import Billboard from "../pages/Billboard";
import PodcastList from "../pages/PodcastList";
import { View } from "react-native";
import styled from "styled-components/native";
import { connect } from "react-redux";
import NotificationType from "src/models/Notification";

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
    unSeenNotifications: number
}

const HomeIcon = (props: HomeIconProps) => {
    return (
        <View>
            <Icon name="home" color={props.tintColor} size={24} />
            {props.unSeenNotifications > 0 && <StyledBadge>{props.unSeenNotifications}</StyledBadge>}
        </View>
    )
}

const mapStateToProps = (state: any) => {
    return {
        unSeenNotifications: (state.notification.unSeenNotifications as NotificationType[]).length
    }
}
const ConnectedHomeIcon = connect(mapStateToProps)(HomeIcon)

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
        BillBoard: {
            screen: Billboard,
            navigationOptions: {
                tabBarLabel: "BillBoard",
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="bar-chart" color={tintColor} size={24} />
                )
            }
        },
        Podcasts: {
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