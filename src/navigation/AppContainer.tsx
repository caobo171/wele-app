/* eslint-disable prettier/prettier */
import React, { useState, useEffect, Dispatch } from "react";
import { createStackNavigator } from "react-navigation-stack";
import PlayerNavigator from "./PlayerStackNavigator";
import MainBottomTabNavigator from "./MainBottomTabNavigator"
import AnotherProfile from "@/pages/UserProfile/AnotherUserProfile";
import { createSwitchNavigator } from "react-navigation";


const RootNavigator = createSwitchNavigator(
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
        // AnotherProfile:{
        //     screen: AnotherProfile
        // }
            
    },
    {
        initialRouteName: "BottomTabNavigator",
        navigationOptions:{
            header:  null
        }
    }
);

export default RootNavigator ;

