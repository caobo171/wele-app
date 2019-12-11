import { useSelector } from 'react-redux'
import { State } from './reducer'


export const useTheme = ()=>{
    return useSelector((state: {theme: State})=> state.theme.theme)
}