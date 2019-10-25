import { firebase } from "@react-native-firebase/auth";
import database from '@react-native-firebase/database';
import { LoginManager } from "react-native-fbsdk"
import UserType from "src/models/User";


export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const LOAD_FRIENDS = "LOAD_FRIENDS";
export const LOAD_USERS = "LOAD_USERS";
export const LOG_OUT = "LOG_OUT";



export const setCurrentUser = (user: UserType , isNew?: boolean | string) => async (dispatch: any) => {

  if(isNew){
    const ref = database().ref(`/users/${user.id}`)

    await ref.set({
      ...user,
      weleEmail: isNew
    })
  }


  await dispatch({
    type: SET_CURRENT_USER,
    data: user
  });
};

export const logOut = () => async (dispatch: any) => {
  await firebase.auth().signOut();
  await LoginManager.logOut()
  await dispatch({
    type: LOG_OUT
  });
};


const getUsers = ()=>{
  return new Promise((resolve, reject)=>{
    let users = new Map<string,UserType>()
    const ref = database().ref(`/users`);
    ref.once('value', async (snapshots: any)=>{
        await snapshots.forEach( (snapshot: any) =>{
          const user:UserType = snapshot._snapshot.value
          users = users.set(user.id, {id: user.id , ...user} )
        })

        resolve(users)
    })
  })
}

export const listUsers = ()=> async (dispatch: any) => {
    const users = await getUsers()

    console.log('check users', users)
    dispatch({
      type:LOAD_USERS,
      data: users
    })
}