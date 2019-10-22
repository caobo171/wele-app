/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";

import { createBottomTabNavigator } from "react-navigation-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import Home from "./Pages/Home";
import Billboard from "./Pages/Billboard";
import { createAppContainer } from "react-navigation";
import Login from "./Pages/Login";
import { connect } from "react-redux";
import { createStackNavigator } from "react-navigation-stack";
import Player from "./components/Player/index";
import SettingRates from "./Pages/SettingRates";
import { firebase } from "@react-native-firebase/auth";
import { setCurrentUser } from "./redux/actions/userActions";
import useAsync from "react-use/lib/useAsync";
import LoadingComponent from "./components/Loading/Loading";

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" color={tintColor} size={24} />
        )
      }
    },
    BillBoard: {
      screen: Billboard,
      tabBarOptions: {
        visible: false
      },
      navigationOptions: {
        tabBarLabel: "BillBoard",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="bar-chart" color={tintColor} size={24} />
        )
      }
    }
  },
  {
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

const OutSideNavigator = createStackNavigator(
  {
    Player: {
      screen: Player
    },
    SettingRates: {
      screen: SettingRates
    }
  },
  {
    initialRouteName: "SettingRates"
  }
);

const RootNavigator = createStackNavigator(
  {
    OutSideNavigator: {
      screen: OutSideNavigator,
      navigationOptions: {
        header: null
      }
    },
    TabNavigator: {
      screen: TabNavigator,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "TabNavigator"
  }
);

const MainAppScreen = (props) => {
  const state = useAsync(async ()=>{
    const rawUser = await firebase.auth().currentUser;

    if(rawUser){
      const user = {
        displayName: rawUser.displayName,
        email: rawUser.email,
        photoURL : rawUser.photoURL
      }
      props.setCurrentUser(user)
      return user
    }
    props.setCurrentUser(user)
    return null
  }, [])

  return (
      <React.Fragment>
        {state.loading ? <LoadingComponent/> : 
        props.currentUser ? <AppContainer/> : <Login/>
        }
      </React.Fragment>
  );
};

const mapStateToProps = (state)=>{
  return {
    currentUser : state.user.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentUser : user => dispatch(setCurrentUser(user))
  }
}

const AppContainer = createAppContainer(RootNavigator);

export default connect(mapStateToProps, mapDispatchToProps )(MainAppScreen);
