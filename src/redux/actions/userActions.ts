import { firebase } from "@react-native-firebase/auth";
import database from '@react-native-firebase/database';
import { LoginManager } from "react-native-fbsdk"
import UserType from "src/models/User";
import ResultType from "src/models/Result";


export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const LOAD_FRIENDS = "LOAD_FRIENDS";
export const LOAD_USERS = "LOAD_USERS";
export const LOG_OUT = "LOG_OUT";
export const UPDATE_USER = "UPDATE_USER"
export const LOAD_MY_RESULT = "LOAD_MY_RESULT"

export const LOAD_RESULTS = "LOAD_RESULTS"

export const RESULTS_COLLECTION = "results"



const getCurrentUserAsync = (id:string) => {
  return new Promise((resolve, reject) => {
    const ref = database().ref(`/users/${id}`);
    ref.once('value', async (snapshot: any) => {
      const user: UserType = {id: id , ...snapshot._snapshot.value}
      resolve(user)
    })
  })
}



export const setCurrentUser = (user: UserType, isNew?: boolean | string) => async (dispatch: any) => {

  
  if (isNew && typeof isNew === 'string') {
    const ref = database().ref(`/users/${user.id}`)

    await updateNewUserToResult( isNew  , user)
    user = {...user, weleEmail: isNew}
    await ref.set({
      ...user,
      weleEmail: isNew
    })

    await dispatch({
      type: SET_CURRENT_USER,
      data: { ...user, weleEmail: isNew }
    });


  }else{
    const userData : any = await getCurrentUserAsync(user.id)
    
  

    await dispatch({
      type: SET_CURRENT_USER,
      data: {  ...userData, ...user}
    });
  }

};

export const logOut = () => async (dispatch: any) => {
  await firebase.auth().signOut();
  await LoginManager.logOut()
  await dispatch({
    type: LOG_OUT
  });
};



export const updateUser = (user: UserType) => async (dispatch: any) => {
  await dispatch({
    type: UPDATE_USER,
    data: user
  })
}

const getUsers = () => {
  return new Promise((resolve, reject) => {
    let users = new Map<string, UserType>()
    const ref = database().ref(`/users`);
    ref.once('value', async (snapshots: any) => {
      await snapshots.forEach((snapshot: any) => {
        const user: UserType = snapshot._snapshot.value
        users = users.set(user.id, { id: user.id, ...user })
      })

      resolve(users)
    })
  })
}


const convertId = (key: string) => {

  return key.toString().replace(new RegExp('<dot>', 'g'), '.')
    .replace(new RegExp('<open>', 'g'), '[')
    .replace(new RegExp('<close>', 'g'), ']')
    .replace(new RegExp('<sharp>', 'g'), '#')
    .replace(new RegExp('<dollar>', 'g'), '$')

}

const getResultsAsync = () => {
  return new Promise((resolve, reject) => {
    let results = new Map<string, ResultType>()
    const ref = database().ref(`/results`).orderByChild('Total').limitToLast(51);
    ref.once('value', async (snapshots: any) => {
      await snapshots.forEach((snapshot: any) => {
        const id = convertId(snapshot._snapshot.value.id)
        const result: ResultType = {
          ...snapshot._snapshot.value,
          id
        }

        results.set(id, result)

      })

      resolve(results)
    })
  })
}


export const listUsers = () => async (dispatch: any) => {
  const users = await getUsers()

  dispatch({
    type: LOAD_USERS,
    data: users
  })
}

export const updateNewUserToResult = (email: string, user: UserType) => {

  return new Promise((resolve, reject) => {
    const reConverEmail = email.toString().replace('.', '<dot>').replace('[', '<open>').replace(']', '<close>').replace('#', '<sharp>').replace('$', '<dollar>').replace('.', '<dot>').replace('.', '<dot>').replace('.', '<dot>')
  
    console.log('check ', `/results/${reConverEmail}`)
    const resultRef = database().ref(`/results/${reConverEmail}`)

    
    resultRef.once('value', async (snapshots: any) => {
      if(!snapshots._snapshot.value){
        reject('EMAIL DOES')
      }else{
        resultRef.update({
          photoURL: user.photoURL,
          UserId: user.id,
          Name: user.displayName
        })

        resolve(snapshots)
      }
      
    })
  })
}

const getMyResultAsync = (user: UserType)=>{
  if(user.weleEmail){
    return new Promise((resolve, reject) => {
      const email = user.weleEmail as string
      const reConverEmail = email.toString().replace('.', '<dot>').replace('[', '<open>').replace(']', '<close>').replace('#', '<sharp>').replace('$', '<dollar>').replace('.', '<dot>').replace('.', '<dot>').replace('.', '<dot>')
    

      const resultRef = database().ref(`/results/${reConverEmail}`)
  
      
      resultRef.once('value', async (snapshots: any) => {
          resolve(snapshots._snapshot.value)    
      })
    })
  }else{
    return null 
  }
}

export const getMyResult = (user: UserType) => async (dispatch: any) =>{
  const result = await getMyResultAsync(user)

  dispatch({
    type: LOAD_MY_RESULT,
    data: result
  })
}

export const getResults = () => async (dispatch: any) => {
  const results = await getResultsAsync()
  dispatch({
    type: LOAD_RESULTS,
    data: results
  })
}