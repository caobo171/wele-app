import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { createBottomTabNavigator } from 'react-navigation-tabs'
import Icon from 'react-native-vector-icons/FontAwesome'
import Home from './Pages/Home'
import Billboard from './Pages/Billboard'
import { createAppContainer } from 'react-navigation';


const TabNavigator  =  createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="home" color={tintColor} size={24} />
      )
    }
  },
  BillBoard: {
    screen: Billboard,
    tabBarOptions:{
      visible: false
    }, 
    navigationOptions: {
      tabBarLabel: 'BillBoard',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="bar-chart" color={tintColor} size={24} />
      )
    }
  },


}, {
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'grey',
      style: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        shadowOffset: { width: 5, height: 3 },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 5
      }
    }
  })


export default createAppContainer(TabNavigator,)