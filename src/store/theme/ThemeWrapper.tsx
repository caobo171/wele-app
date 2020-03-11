import { DefaultTheme, ThemeProvider } from 'styled-components'
import { PropsWithChildren } from 'react'
import useEffectOnce from 'react-use/lib/useEffectOnce'
import storage from '@/service/localStorage'
import { updateTheme } from './functions'
import { useTheme } from './hook'
import React , {useEffect} from 'react'
import { StatusBar , StatusBarStyle} from 'react-native'

export enum ThemeMode {
    LIGHT = 'light',
    DARK = 'dark'
}

export interface CustomTheme  extends DefaultTheme{
    name: string,
    backgroundColor: string
    secondaryBackgroundColor: string,
    primaryColor: string,
    secondaryColor: string,
    underlayColor: string,
    textColorH1: string,
    textColorH2: string,
    textColorH3: string,
    submitButtonColor: string,
    inputUnderPrimaryBackgroundColor: string,
    borderSectionColor: string
}

export const getTheme = (mode: ThemeMode) : CustomTheme =>{
    if(mode === ThemeMode.LIGHT){
        return {
            name: 'light',
            backgroundColor: '#ffffff',
            secondaryBackgroundColor: '#f8f8f8',
            primaryColor: '#595959',
            secondaryColor: '#ffffff',
            underlayColor: '#F9F9F9',
            textColorH1: '#4a4a4a',
            textColorH2: '#5e5e5e',
            textColorH3: '#8c8c8c',
            submitButtonColor: '#595959',
            inputUnderPrimaryBackgroundColor: '#ffffff' ,
            borderSectionColor: '#d4d4d4'
        }
    }else{
        return {
            name: 'dark',
            backgroundColor: '#1A1A1A',
            secondaryBackgroundColor: '#1A1A1A',
            primaryColor: '#111111',
            secondaryColor: '#1A1A1A',
            underlayColor: '#111111',
            textColorH1: '#C8C7CC',
            textColorH2: '#8A8A8F',
            textColorH3: '#666666',
            submitButtonColor: '#4CD964',
            inputUnderPrimaryBackgroundColor: '#343434',
            borderSectionColor: '#999999'
        }
    }
}




const ThemeWrapper: React.FC<PropsWithChildren<{}>> = ({children})=>{

    const themeMode = useTheme()
    useEffectOnce(()=>{
        (async ()=>{
            const savedTheme = await storage.getTheme()
            updateTheme(savedTheme)
        })()
    })

    useEffect(()=>{
        const background = getTheme(themeMode).backgroundColor
        StatusBar.setBackgroundColor(background)
        if(themeMode===ThemeMode.DARK){
            
            StatusBar.setBarStyle('light-content')
        }else{
            StatusBar.setBarStyle('dark-content')
            
        }
       
    },[themeMode])


    return <ThemeProvider theme={getTheme(themeMode)}>
            <React.Fragment>{children}</React.Fragment> 
    </ThemeProvider>
}

export default ThemeWrapper