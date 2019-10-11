import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from './Pages/Home';
import Billboard from './Pages/Billboard';
import {createAppContainer} from 'react-navigation';

import Login from './Pages/Login2';
import {createStackNavigator} from 'react-navigation-stack';

import Player from './Pages/Player';
import SettingRates from './Pages/SettingRates';

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
    initialRouteName: 'OutSideNavigator',
  },
);

const AppContainer = createAppContainer(RootNavigator);

export default Login;
