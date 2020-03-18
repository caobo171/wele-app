import { firebase } from "@react-native-firebase/auth";
import database from '@react-native-firebase/database';
import { LoginManager } from "react-native-fbsdk"
import * as actions from './actions'
import { UserType, ResultType, ResultV2Type } from "./types";
import store from "../store";
import { GoogleSignin } from "@react-native-community/google-signin";
import storage from "@/service/localStorage";
import NetInfo, { NetInfoCellularGeneration } from "@react-native-community/netinfo";

import CurrentUser from '@/service/CurrentUser';

export const RESULTS_COLLECTION = "results"

export const RESULTS_COLLECTION_V2 = 'resultsv2'

export const USERS_COLLECTION = 'users'

export const TOTAL_PROPERTY = 'Total'

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
    try{
        const ref = database().ref(`/${USERS_COLLECTION}/${user.id}`)

        console.log(ref);
        return await ref.set({
            ...user,
            weleEmail
        })
         
    }catch(err){
        console.log(err)
        return 
    }
    

}


export const setCurrentUser = async (user: UserType, isNew?: boolean | string, storex = store) => {

    console.log(user)

    if (!user) {
        return storex.dispatch(actions.setCurrentUser(user))
    }

    const netState = await NetInfo.fetch()
    if (!netState.isConnected) {
        CurrentUser.setUser(user)
        return storex.dispatch(actions.setCurrentUser(user))
    }



    console.log(isNew && typeof isNew === 'string', isNew)

    if (isNew && typeof isNew === 'string') {

        console.log('aaaaaaa')
        await updateWELEEmail(user, isNew)
        console.log('bbbbbb')
        await storage.setCurrentUser({ ...user, weleEmail: isNew })
        console.log('cccccc')
        await CurrentUser.setUser(user);
        console.log('ow vao day roi ne ')
        return storex.dispatch(actions.setCurrentUser({ ...user, weleEmail: isNew }))
    } else {


        const userData: UserType = await getCurrentUserAsync(user.id)
        if (userData.email) {
            const setUser = { ...userData, ...user }
            CurrentUser.setUser(setUser);
            await storage.setCurrentUser(setUser)
            return storex.dispatch(actions.setCurrentUser(setUser))

        } else {
            CurrentUser.setUser(user)
            await storage.setCurrentUser(user)
            return storex.dispatch(actions.setCurrentUser(user))
        }

    }
};


export const logOut = async (storex = store) => {
    try{
        await firebase.auth().signOut();
    }catch(err){}
  
    await storage.removeCurrentUser()

    try {
        await LoginManager.logOut()
    } catch (e) {

    }

    try {
        await GoogleSignin.signOut()
    } catch (e) {

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


const getAllUsersAsync = (): Promise<actions.getAllUserParams> => {
    return new Promise((resolve, reject) => {
        let users = new Map<string, UserType>()
        let byWeleEmail = new Map<string, UserType>()
        const ref = database().ref(`/users`);
        ref.once('value', async (snapshots: any) => {
            console.log(snapshots)
            await snapshots.forEach((snapshot: any) => {
                const user: UserType = snapshot._snapshot.value
                if (user.id) {
                    users = users.set(user.id, { id: user.id, ...user })
                }

                if(user.weleEmail || user.email){
                    const mapId = (user.weleEmail? user.weleEmail : user.email).toLowerCase().replace(/\s/g, '')
                    byWeleEmail = byWeleEmail.set(mapId, user)
                }

            })

        resolve({users, byWeleEmail})
        })
    })
}


export const getAllUsers = async (storex = store) => {
    console.log('aaaaaaaa');
    try{
        const {users, byWeleEmail} = await getAllUsersAsync()
        console.log({users, byWeleEmail})
        return storex.dispatch(actions.getAllUsers({users, byWeleEmail}))
    }catch(err){
        console.log(err);
    }
  
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

const getResultsMonthlyAsync = (): Promise<Map<string, ResultV2Type>> => {
    return new Promise((resolve, reject) => {
        let results = new Map<string, ResultV2Type>()
        const ref = database().ref(`/${RESULTS_COLLECTION_V2}`)
        ref.once('value', async (snapshots: any) => {
            await snapshots.forEach((snapshot: any) => {
                const id = convertId(snapshot._snapshot.key)
                const result:number = Number(snapshot._snapshot.value)
                results.set(id, {
                    sum: result,
                    id: id
                })
            })
            resolve(results)
        })
    })
}

export const getResultsMonthly = async (storex = store) => {
    const results = await getResultsMonthlyAsync()

    if (results) {
        return await storex.dispatch(actions.getResultsMonthly(results))
    }

}

export const getResults = async (storex = store) => {
    console.log('aaaaaa')
    const results = await getResultsAsync()

    console.log(results);
    if (results) {
        return await storex.dispatch(actions.getResults(results))
    }

}

