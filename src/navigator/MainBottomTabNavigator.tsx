/* eslint-disable prettier/prettier */
import React from "react";

import { createBottomTabNavigator, BottomTabBar } from "react-navigation-tabs";

//@ts-ignore
import Icon from "react-native-vector-icons/FontAwesome";
import HomeNavigator from "./HomeNavigator";
import Billboard from "../pages/Billboard";



const MainBottomTabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: HomeNavigator,
            navigationOptions: {
                tabBarLabel: "Home",
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="home" color={tintColor} size={24} />
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
  

export default MainBottomTabNavigator ;