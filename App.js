import React , { useState, useEffect} from 'react';

import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from './Pages/Home';
import Billboard from './Pages/Billboard';
import {createAppContainer} from 'react-navigation';

import Login from './Pages/Login';
import {createStackNavigator} from 'react-navigation-stack';


import Player from './Pages/Player'
import SettingRates from './Pages/SettingRates';

import {
  firebase
} from "@react-native-firebase/auth";
import { useAsyncStorage } from '@react-native-community/async-storage';

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({tintColor}) => (
          <Icon name="home" color={tintColor} size={24} />
        ),
      },
    },
    BillBoard: {
      screen: Billboard,
      tabBarOptions: {
        visible: false,
      },
      navigationOptions: {
        tabBarLabel: 'BillBoard',
        tabBarIcon: ({tintColor}) => (
          <Icon name="bar-chart" color={tintColor} size={24} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: 'grey',
      style: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        shadowOffset: {width: 5, height: 3},
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 5,
      },
    },
  },
);

const OutSideNavigator = createStackNavigator(
  {
    Player: {
      screen: Player,
    },
    SettingRates: {
      screen: SettingRates,
    },
  },
  {
    initialRouteName: 'SettingRates',
  },
);

const RootNavigator = createStackNavigator(
  {
    OutSideNavigator: {
      screen: OutSideNavigator,
      navigationOptions: {
        header: null,
      },
    },
    TabNavigator: {
      screen: TabNavigator,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'TabNavigator',
  },
);


const MainAppScreen = ()=>{

  const [currentUser, setCurrentUser] = useState(null)
  useEffect(() => {
    const currentUser = firebase.auth().currentUser
    console.log('check currentUser', currentUser)

    setCurrentUser(currentUser)
 }, [])
 return (
   <React.Fragment>
     {currentUser ? (<AppContainer/>) :  (<Login/>)}
   </React.Fragment>
 )
 
}

const AppContainer = createAppContainer(RootNavigator);

export default MainAppScreen
