import * as actions from './actions'
import store from '../store'
import { Track } from 'react-native-track-player'
export const updatePosition = (duration: number, position: number, storex= store)=>{
    return storex.dispatch(actions.updatePosition(position,duration))
}

export const updateState = (state: number , storex= store)=> {
    return storex.dispatch(actions.updateState(state))
}

export const updateTrack = (track: Track , storex= store)=>{
    return storex.dispatch(actions.updateTrack(track))
}


export const updateSpeed = (speed: number, storex= store)=>{
    return storex.dispatch(actions.updateSpeed(speed))
}


export const updatePlayback = (playback: number , storex= store)=>{
    return storex.dispatch(actions.updatePlayBack(playback))
}

export const updateSliding = (sliding: boolean , storex= store)=>{
    return storex.dispatch(actions.updateSliding(sliding))
}