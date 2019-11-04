/* eslint-disable prettier/prettier */
import React , {useEffect} from "react";
import { createAppContainer  } from "react-navigation";
import Login from "./pages/Login";


import { connect } from "react-redux";
import { firebase } from "@react-native-firebase/auth";
import { setCurrentUser, updateUser } from "./redux/actions/userActions";
import useAsync from "react-use/lib/useAsync";
import LoadingComponent from "./components/Loading/Loading";

import UserType from "./models/User"

import RootNavigator from "./navigator/root"
import useEffectOnce from "react-use/lib/useEffectOnce";
import globalPlayer from "./hooks/playerHooks";
import presenceSystem from "./service/presenseSystem";
import messageSystem from "./service/messageSystem";
import { getGlobalNotifications } from "./redux/actions/notificationAction";
import NotificationType from "./models/Notification";

interface Props{
  currentUser: UserType,
  setCurrentUser: (user: UserType | null )=> void,
  updateUser: (user: UserType) => void,
  getGlobalNotifications: (notifications: NotificationType[] , me : UserType)=> void
}

const MainAppScreen = (props: Props) => {
  const state = useAsync(async ()=>{
    const rawUser = await firebase.auth().currentUser;

    if(rawUser){
      console.log('check rawUser', rawUser)
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


  useEffectOnce(()=>{
    globalPlayer.init()
  })

  useEffect(()=>{
    if(props.currentUser){
      presenceSystem.init(props.updateUser)
      messageSystem.init(props.getGlobalNotifications, props.currentUser)
    }
  
  }, [props.currentUser])



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
    setCurrentUser : (user: UserType) => dispatch(setCurrentUser(user)),
    updateUser: (user: UserType) => dispatch(updateUser(user)),
    getGlobalNotifications : (notifications: NotificationType[], me: UserType)=> dispatch(getGlobalNotifications(notifications, me))
  }
}

const AppContainer = createAppContainer(RootNavigator);

//@ts-ignore
export default connect(mapStateToProps, mapDispatchToProps )(MainAppScreen);
