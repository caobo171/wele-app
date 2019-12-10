import { createAction } from 'typesafe-actions'
import { UserType , ResultType } from './types'

export const setCurrentUser = createAction('user/SET_CURRENT_USER', 
(user: UserType) => user)<UserType>()


export const updateUser = createAction('user/UPDATE_USER', 
(user: UserType)=> user)<UserType>()

export const logOut = createAction('user/LOG_OUT',()=> null)<null>()


export const getAllUsers = createAction('user/GET_ALL_USER', 
(users: Map<string, UserType>)=> users)<Map<string, UserType>>()




export const getMyResult = createAction('user/GET_MY_RESULT',
(result: null| ResultType)=> result)<null| ResultType>()


export const getResults = createAction('user/GET_ACTION',
(results: Map<string, ResultType> )=> results)<Map<string, ResultType>>()
