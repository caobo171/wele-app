import * as actions from './actions'

import {createReducer, ActionType} from 'typesafe-actions'
import { State } from './types'


const initialState: State = {
    state: 0 ,
    position: {
        position: 0,
        duration: 0
    },
    track: null,
    playback: 15,
    speed: 1,
    sliding: false
}

export default createReducer<State, ActionType<typeof actions>>(initialState)
.handleAction(actions.updatePlayBack,(state, action)=>({
    ...state,
    playback: action.payload
}))
.handleAction(actions.updateState,(state, action)=>({
    ...state,
    state: action.payload
}))
.handleAction(actions.updateTrack,(state, action)=>({
    ...state,
    track: action.payload
}))
.handleAction(actions.updateSpeed,(state, action)=>({
    ...state,
    speed: action.payload
}))
.handleAction(actions.updatePosition,(state, action)=>{

    if(!state.sliding){
        return {
            ...state,
            position: action.payload
        }
    }else{
        return state
    }
})
.handleAction(actions.updateSliding, (state,action)=>({
    ...state,
    sliding: action.payload
}))


