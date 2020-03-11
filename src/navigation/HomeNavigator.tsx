
import React from 'react'
import UserProfile from '@pages/UserProfile'
import PodcastDetail from '@pages/PodcastDetail'
import Home from "@pages/Home"

import PlayerThumbnail from "@pages/Player/PlayerThumbnail";
import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator } from 'react-navigation';

const InjectedHome = React.memo(()=>{
    return <PlayerThumbnail>
        <Home/>
    </PlayerThumbnail>
})





const InjectedPodcastDetail =  React.memo(()=>{
  return <PlayerThumbnail>
    <PodcastDetail/>
  </PlayerThumbnail>
})


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