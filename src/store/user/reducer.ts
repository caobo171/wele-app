import { createReducer, ActionType } from 'typesafe-actions'

import * as actions from './actions'
import { UserType, ResultType, State } from './types'

const initialState: State = {
    currentUser: null,
    listUsers: new Map<string, UserType>(),
    listResult: new Map<string, ResultType>()
}

export default createReducer<State, ActionType<typeof actions>>(initialState)
    .handleAction(actions.updateUser, (state, action) => {
        const user: UserType = action.payload
        const listUsers = state.listUsers.set(user.id, user)
        return {
            ...state,
            listUsers
        }
    })
    .handleAction(actions.getAllUsers, (state, action) => ({
        ...state,
        listUsers: action.payload
    }))
    .handleAction(actions.setCurrentUser, (state, action) => ({
        ...state,
        currentUser: action.payload
    }))
    .handleAction(actions.logOut, (state, action) => ({
        ...state,
        currentUser: null
    }))
    .handleAction(actions.getResults, (state, action) => ({
        ...state,
        listResult: action.payload
    }))
    .handleAction(actions.getMyResult, (state, action) => {
        if (state.currentUser) {
            return {
                ...state,
                currentUser: { ...state.currentUser, result: action.payload }
            }
        }
    })