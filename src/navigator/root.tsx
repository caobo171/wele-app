/* eslint-disable prettier/prettier */
import React, { useState, useEffect, Dispatch } from "react";
import { createStackNavigator } from "react-navigation-stack";
import PlayerNavigator from "./PlayerStackNavigator";
import MainBottomTabNavigator from "./MainBottomTabNavigator"


const RootNavigator = createStackNavigator(
    {
        PlayerNavigator: {
            screen: PlayerNavigator,
            navigationOptions: {
                header: null
            }
        },
        BottomTabNavigator: {
            screen: MainBottomTabNavigator,
            navigationOptions: {
                header: null
            }
        }
    },
    {
        initialRouteName: "BottomTabNavigator"
    }
);

export default RootNavigator ;

