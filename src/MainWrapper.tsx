/* eslint-disable prettier/prettier */
import React, { useEffect } from "react";
import { createAppContainer } from "react-navigation";
import Login from "./pages/Login";


import { connect } from "react-redux";
import { firebase } from "@react-native-firebase/auth";
import { setCurrentUser, updateUser, listUsers } from "./redux/actions/userActions";
import useAsync from "react-use/lib/useAsync";
import LoadingComponent from "./components/Loading/Loading";

import UserType from "./models/User"

import RootNavigator from "./navigator/root"
import useEffectOnce from "react-use/lib/useEffectOnce";
import globalPlayer, { usePlayer } from "./hooks/playerHooks";
import presenceSystem from "./service/presenseSystem";
import messageSystem from "./service/messageSystem";
import { getGlobalNotifications } from "./redux/actions/notificationAction";
import NotificationType from "./models/Notification";

interface Props {
  currentUser: UserType,
  setCurrentUser: (user: UserType | null) => void,
  updateUser: (user: UserType) => void,
  getGlobalNotifications: (notifications: NotificationType[], me: UserType) => void,
  listUsers: ()=> void
}


export const PlayerContext = React.createContext({
  state: 0,
  position: {
    position: 0,
    duration: 0
  },
  track: null,
  playback: 15,
  speed: 1
})



const MainAppScreen = (props: Props) => {
  const status = useAsync(async () => {
    const rawUser = await firebase.auth().currentUser;

    if (rawUser) {
      console.log('check rawUser', rawUser)
      const user = {
        displayName: rawUser.displayName as string,
        email: rawUser.email as string,
        photoURL: rawUser.photoURL as string,
        id: rawUser.uid
      }
      return await props.setCurrentUser(user)

    }
    return await props.setCurrentUser(null)
  }, [])



  const { state, position, track, playback, speed } = usePlayer()

  useEffectOnce(() => {
    globalPlayer.init()
  })

  useEffect(() => {
    if (props.currentUser) {

      props.listUsers()
      presenceSystem.init(props.updateUser)
      messageSystem.init(props.getGlobalNotifications, props.currentUser)
    }

  }, [props.currentUser])



  return (
    <React.Fragment>
      {status.loading ? <LoadingComponent /> :
        props.currentUser && props.currentUser.weleEmail ?
          <PlayerContext.Provider 
          
          value = {{
            state, position, track, playback, speed
          }}
          >
            <AppContainer />
          </PlayerContext.Provider>
          : <Login />
      }
    </React.Fragment>
  );
};

const mapStateToProps = (state: any) => {
  return {
    currentUser: state.user.currentUser
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setCurrentUser: (user: UserType) => dispatch(setCurrentUser(user)),
    updateUser: (user: UserType) => dispatch(updateUser(user)),
    listUsers : () => dispatch(listUsers()),
    getGlobalNotifications: (notifications: NotificationType[], me: UserType) => dispatch(getGlobalNotifications(notifications, me))
  }
}

const AppContainer = createAppContainer(RootNavigator);

//@ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(MainAppScreen);
