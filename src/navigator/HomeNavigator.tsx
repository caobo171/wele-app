
import React from 'react'
import UserProfile from '../pages/UserProfile'
import PodcastDetail from '../pages/PodcastDetail'
import Home from "../pages/Home"

import PlayerThumbnail from "../components/Player/PlayerThumbnail";


import { createStackNavigator } from 'react-navigation-stack';
import { NavigationScreenProp } from 'react-navigation';


const InjectedHome = ( props: { navigation: NavigationScreenProp<any,any> })=>{
    return <PlayerThumbnail {...props}>
        <Home {...props}/>
    </PlayerThumbnail>
}





const InjectedPodcastDetail =  ( props: { navigation: NavigationScreenProp<any,any> })=>{
  return <PlayerThumbnail {...props}>
      <PodcastDetail {...props}/>
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
      screen : InjectedPodcastDetail, 
      navigationOptions:{
        header: null,
      }
    },
}, {
  initialRouteName : 'Home'
})

export default HomeNavigator;