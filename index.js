/**
 * @format
 */

<<<<<<< HEAD
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
=======
import { AppRegistry } from "react-native";
import App from "./src/App";
import { firebase } from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-community/async-storage";
//@ts-ignore
import { name as appName } from "./app.json";
import TrackPlayer from "react-native-track-player";

AppRegistry.registerComponent(appName, () => App);

firebase.messaging().setBackgroundMessageHandler(async remoteMessage => {
  // Update a users messages list using AsyncStorage
  const currentMessages = await AsyncStorage.getItem("messages");
  const messageArray = JSON.parse(currentMessages);
  messageArray.push(remoteMessage.data);
  await AsyncStorage.setItem("messages", JSON.stringify(messageArray));
});

TrackPlayer.registerPlaybackService(() => require("./backgroundPlayerService"));
>>>>>>> admob
