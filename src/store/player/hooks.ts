import {useSelector } from 'react-redux'
import { State } from './types'


export const usePlayer = ()=> {
    return useSelector((state: {player: State})=> ({
        state: state.player.state,
        position: state.player.position,
        playback: state.player.playback,
        speed: state.player.speed,
        track: state.player.track
    }))
}


export const usePlayerSettings = ()=>{
    return useSelector((state: {player: State})=> ({
        playback: state.player.playback,
        speed: state.player.speed
    }))
}