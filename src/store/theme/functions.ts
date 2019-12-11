import { ThemeMode } from './ThemeWrapper'
import store from '../store'
import * as actions from './actions'
import storage from '@/service/localStorage'

export const updateTheme = (theme: ThemeMode, storex = store)=>{

    storage.saveTheme(theme)
    return storex.dispatch(actions.updateTheme(theme))
}