import { firebase } from "@react-native-firebase/auth";
import database from '@react-native-firebase/database';
import { LoginManager } from "react-native-fbsdk"
import * as actions from './actions'
import { UserType, ResultType } from "./types";
import store from "../store";
import { GoogleSignin } from "@react-native-community/google-signin";


export const RESULTS_COLLECTION = "results"

export const USERS_COLLECTION = 'users'

export const TOTAL_PROPERTY = 'Total'

const getCurrentUserAsync = (id: string): Promise<UserType> => {
    return new Promise((resolve, reject) => {
        const ref = database().ref(`/${USERS_COLLECTION}/${id}`);
        ref.once('value', async (snapshot: any) => {
            const user: UserType = { id: id, ...snapshot._snapshot.value }
            resolve(user)
        })
    })
}

const updateWELEEmail = async (user: UserType, weleEmail: string) => {
    const ref = database().ref(`/${USERS_COLLECTION}/${user.id}`)
    await ref.set({
        ...user,
        weleEmail
    })

}


export const setCurrentUser = async (user: UserType, isNew?: boolean | string, storex = store) => {

    if (!user) {
        return storex.dispatch(actions.setCurrentUser(user))
    }

    if (isNew && typeof isNew === 'string') {
        await updateWELEEmail(user, isNew)
        return storex.dispatch(actions.setCurrentUser({ ...user, weleEmail: isNew }))
    } else {

        const userData: UserType = await getCurrentUserAsync(user.id)
        if(userData.email){
            return storex.dispatch(actions.setCurrentUser({ ...userData, ...user }))

        }else{
            return  storex.dispatch(actions.setCurrentUser(user))
        }
        
    }
};


export const logOut = async (storex = store) => {
    await firebase.auth().signOut();
    try{
        await LoginManager.logOut()
    }catch(e){
        
    }
   
    try{
        await GoogleSignin.signOut()
    }catch(e){

    }
    
    return await storex.dispatch(actions.logOut())
};


export const updateUser = async (user: UserType, storex = store) => {
    return storex.dispatch(actions.updateUser(user))
}


export const updateLastSeenOfUser = async (user: UserType, storex = store) => {
    const currentTime = (new Date).getTime()
    firebase.database().ref(`/${USERS_COLLECTION}/${user.id}/lastSeen`).set(currentTime)

    return updateUser({ ...user, lastSeen: currentTime })
}


const getAllUsersAsync = (): Promise<Map<string, UserType>> => {
    return new Promise((resolve, reject) => {
        let users = new Map<string, UserType>()
        const ref = database().ref(`/users`);
        ref.once('value', async (snapshots: any) => {
            await snapshots.forEach((snapshot: any) => {
                const user: UserType = snapshot._snapshot.value
                if(user.id){
                    users = users.set(user.id, { id: user.id, ...user })
                }
               
            })

            resolve(users)
        })
    })
}


export const getAllUsers = async (storex = store) => {
    const users = await getAllUsersAsync()
    return storex.dispatch(actions.getAllUsers(users))
}

const validateKey = (email: string) => {
    return email
        .replace('.', 'weledotwele')
        .replace('[', 'weleopenwele')
        .replace(']', 'weleclosewele')
        .replace('#', 'welesharpwele')
        .replace('$', 'weledollarwele')
        .replace('.', 'weledotwele')
        .replace('.', 'weledotwele')
        .replace('.', 'weledotwele')
}


const getMyResultAsync = (user: UserType): Promise<ResultType> => {
    if (user.weleEmail) {
        return new Promise((resolve, reject) => {
            const email = user.weleEmail as string
            const reConvertEmail = validateKey(email)
            const resultRef = database().ref(`/${RESULTS_COLLECTION}/${reConvertEmail}`)
            resultRef.once('value', async (snapshots: any) => {
                resolve(snapshots._snapshot.value)
            })
        })
    } else {
        return Promise.resolve(null)
    }
}

export const getMyresult = async (user: UserType, storex = store) => {
    const result = await getMyResultAsync(user)
    return storex.dispatch(actions.getMyResult(result))
}



const convertId = (key: string) => {

    return key.toString()
        .replace(new RegExp('weledotwele', 'g'), '.')
        .replace(new RegExp('weleopenwele', 'g'), '[')
        .replace(new RegExp('weleclosewele', 'g'), ']')
        .replace(new RegExp('welesharpwele', 'g'), '#')
        .replace(new RegExp('weledollarwele', 'g'), '$')
}

const getResultsAsync = (): Promise<Map<string, ResultType>> => {
    return new Promise((resolve, reject) => {
        let results = new Map<string, ResultType>()
        const ref = database().ref(`/${RESULTS_COLLECTION}`).orderByChild(TOTAL_PROPERTY)
        ref.once('value', async (snapshots: any) => {
            await snapshots.forEach((snapshot: any) => {
                const id = convertId(snapshot._snapshot.key)
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

export const getResults = async (storex = store) => {
    const results = await getResultsAsync()

    if(results){
        return await storex.dispatch(actions.getResults(results))
    }
    
}

