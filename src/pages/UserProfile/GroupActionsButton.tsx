import React, { useCallback } from 'react'
import styled from 'styled-components/native'

import { ThemeMode, CustomTheme } from '@/store/theme/ThemeWrapper';
import { updateTheme } from '@/store/theme/functions';
import { logOut } from '@/store/user/function';
import Constants from '@/Constants';
const StyledThemeButton = styled.TouchableOpacity<{ color: string }>`
  height: 36px;
  width: 36px;
  border-radius: 18px;
  background-color: ${props => props.color};
  border-width: 2px;
  border-color: #bfbfbf;
  margin: 8px;
`
const StyledLogOutButton = styled.TouchableOpacity`
  width: 100px;
  height: 40px;
  border-width: 4px;
  border-radius: 20px;
  padding: 4px;
  text-align: center;
  justify-content: center;
  align-items: center;
  border-color: #595959;
  margin: 8px;
`

const StyledText = styled.Text<{ theme: CustomTheme }>`
  font-weight: bold; 
  letter-spacing: 1px;
  font-size: ${Constants.BUTTON_FONTSIZE}px;
  text-transform: uppercase;
  color: ${props => props.theme.textColorH1};
  
`
const StyledButtonsGroup = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
`


const GroupActionsButton = React.memo(() => {
    const logOutHandle = useCallback(() => {
        logOut()
    }, [])

    const updateDarkTheme = useCallback(()=>{
        requestAnimationFrame(()=>updateTheme(ThemeMode.DARK))
    },[])

    const updateLightTheme = useCallback(()=>{
        requestAnimationFrame(()=>updateTheme(ThemeMode.LIGHT))
    },[])
    return <StyledButtonsGroup>
        <StyledLogOutButton onPress={logOutHandle}>
            <StyledText>Log out</StyledText>

        </StyledLogOutButton>


        <StyledThemeButton color={'#ffffff'} onPress={updateLightTheme} />
        <StyledThemeButton color={'#595959'} onPress={updateDarkTheme}/>
    </StyledButtonsGroup>

})


export default GroupActionsButton