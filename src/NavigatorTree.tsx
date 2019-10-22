/* eslint-disable prettier/prettier */
import React, { useState, useEffect, Dispatch } from "react";

import { createBottomTabNavigator } from "react-navigation-tabs";

//@ts-ignore
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

import UserType from "./models/User"

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


const PlayerNavigator = createStackNavigator(
  {
    Player:{
      screen: Player
    },
    SettingRates:{
      screen: SettingRates
    }
  },
  {
    initialRouteName: "Player"
  }
)


const RootNavigator = createStackNavigator(
  {
    PlayerNavigator: {
      screen: PlayerNavigator,
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

interface Props{
  currentUser: UserType,
  setCurrentUser: (user: UserType | null )=> void
}

const MainAppScreen = (props: Props) => {
  const state = useAsync(async ()=>{
    const rawUser = await firebase.auth().currentUser;

    if(rawUser){
      const user = {
        displayName: rawUser.displayName as string,
        email: rawUser.email as string,
        photoURL : rawUser.photoURL as string,
        id: rawUser.uid
      }
      props.setCurrentUser(user)
      return user
    }
    props.setCurrentUser(null)
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

const mapStateToProps = (state : any)=>{
  return {
    currentUser : state.user.currentUser
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setCurrentUser : (user: UserType) => dispatch(setCurrentUser(user))
  }
}

const AppContainer = createAppContainer(RootNavigator);

//@ts-ignore
export default connect(mapStateToProps, mapDispatchToProps )(MainAppScreen);
