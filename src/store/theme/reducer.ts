import { createReducer , ActionType} from 'typesafe-actions'
import { ThemeMode } from './ThemeWrapper';

import * as actions from './actions'

export interface State{
    theme: ThemeMode
}

const initialState = {
    theme: ThemeMode.LIGHT
}

export default createReducer<State, ActionType<typeof actions>>(initialState)
.handleAction(actions.updateTheme,(state,action)=>({
    ...state,
    theme: action.payload
}))