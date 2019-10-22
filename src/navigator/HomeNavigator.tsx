
import React from 'react'
import UserProfile from './../Pages/UserProfile'
import PodcastDetail from './../Pages/PodcastDetail'
import Home from "./../Pages/Home"

import PlayerThumbnail from "../components/Player/PlayerThumbnail";


import { createStackNavigator } from 'react-navigation-stack';
import { NavigationScreenProp } from 'react-navigation';


const InjectedHome = ( props: { navigation: NavigationScreenProp<any,any> })=>{
    return <PlayerThumbnail>
        <Home {...props}/>
    </PlayerThumbnail>
}

const HomeNavigator = createStackNavigator({
    Home: {
      screen: InjectedHome,
      navigationOptions: {
        header: null,
      }
    },
    UserProfile: {
      screen: UserProfile,

    },
    PodcastDetail: {
      screen : PodcastDetail, 
    },
}, {
  initialRouteName : 'Home'
})

export default HomeNavigator;