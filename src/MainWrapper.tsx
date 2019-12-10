/* eslint-disable prettier/prettier */
import React, { useEffect } from "react";
import { createAppContainer } from "react-navigation";
import Login from "./pages/Login";
import { firebase } from "@react-native-firebase/auth";
import useAsync from "react-use/lib/useAsync";
import LoadingComponent from "./components/Loading/Loading";

import RootNavigator from "./navigation/AppContainer"
import useEffectOnce from "react-use/lib/useEffectOnce";
import globalPlayer from "./service/playerService";
import presenceSystem from "./service/presenseSystem";
import messageSystem from "./service/messageSystem";


import { useCurrentUser } from "./store/user/hooks";
import { setCurrentUser, getAllUsers } from "./store/user/function";




const MainAppScreen = () => {

  const currentUser = useCurrentUser()

  const status = useAsync(async () => {
    const rawUser = await firebase.auth().currentUser;

    if (rawUser) {
      const user = {
        displayName: rawUser.displayName as string,
        email: rawUser.email as string,
        photoURL: rawUser.photoURL as string,
        id: rawUser.uid
      }

      return await setCurrentUser(user)

    }
    return await setCurrentUser(null)
  }, [])


  useEffectOnce(() => {
    globalPlayer.init()
  })

  useEffect(() => {
    if (currentUser) {
      getAllUsers()
      presenceSystem.init()
      messageSystem.init(currentUser)
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
