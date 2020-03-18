/* eslint-disable prettier/prettier */
import React, { useEffect } from "react";
import { createAppContainer } from "react-navigation";
import Login from "./pages/Login";
import { firebase } from "@react-native-firebase/auth";
import useAsync from "react-use/lib/useAsync";
import LoadingComponent from "./components/Loading/Loading";
import NetInfo from "@react-native-community/netinfo";
import RootNavigator from "@/navigation/AppContainer"
import useEffectOnce from "react-use/lib/useEffectOnce";
import globalPlayer from "@/service/playerService";
import messageSystem from "@/service/messageSystem";


import { useCurrentUser } from "./store/user/hooks";
import { setCurrentUser, getAllUsers, getResults, getResultsMonthly } from "./store/user/function";
import { getAllPodcasts } from "./store/podcast/functions";
import storage from "./service/localStorage";




const MainAppScreen = () => {

  const currentUser = useCurrentUser()

  const status = useAsync(async () => {
      const user = await storage.getCurrentUser()
      return await setCurrentUser(user)
  }, [])


  useEffectOnce(() => {
    globalPlayer.init()
  })

  useEffect(() => {
    if (currentUser) {
      getAllUsers()
      messageSystem.init(currentUser)
      getAllPodcasts()
      getResults()
      getResultsMonthly()
    }

  }, [currentUser])



  return (
    <React.Fragment>
      {status.loading ? <LoadingComponent /> :
        currentUser && currentUser.weleEmail ?
          <AppContainer />
          : <Login />
      }
    </React.Fragment>
  );
};


const AppContainer = createAppContainer(RootNavigator);


export default MainAppScreen;
