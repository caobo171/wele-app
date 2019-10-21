import React, { useState, useEffect } from "react";

import { createBottomTabNavigator } from "react-navigation-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import Home from "./src/Pages/Home";
import Billboard from "./src/Pages/Billboard";
import { createAppContainer } from "react-navigation";
import Login from "./src/Pages/Login";
import { createStackNavigator } from "react-navigation-stack";

import Player from "./src/components/Player/index";
import SettingRates from "./src/Pages/SettingRates";

import { firebase } from "@react-native-firebase/auth";

import store from "./src/redux/store";
import { Provider } from "react-redux";

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

const MainAppScreen = () => {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const currentUser = firebase.auth().currentUser;
    console.log("check currentUser", currentUser);

    setCurrentUser(currentUser);
  }, []);
  return (
    <Provider store={store}>
      <React.Fragment>
        {currentUser ? <AppContainer /> : <Login />}
      </React.Fragment>
    </Provider>
  );
};

const AppContainer = createAppContainer(RootNavigator);

export default MainAppScreen;
