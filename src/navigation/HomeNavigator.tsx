
import React from 'react'
import UserProfile from '@pages/UserProfile'
import PodcastDetail from '@pages/PodcastDetail'
import Home from "@pages/Home"
import { createStackNavigator } from 'react-navigation-stack';



const HomeNavigator = createStackNavigator({
    Home: {
      screen: Home,
      navigationOptions: {
        header: null,
      }
    },
    UserProfile: {
      screen: UserProfile,
    },
    PodcastDetail: {
      screen : PodcastDetail, 
      navigationOptions:{
        header: null,
      }
    },
}, {
  initialRouteName : 'Home'
})

export default HomeNavigator;