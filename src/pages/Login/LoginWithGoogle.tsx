import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';
import { firebase } from '@react-native-firebase/auth';
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { View , Text, TouchableOpacity, StyleSheet} from 'react-native'
import styled from 'styled-components/native'
import { loginWithGoogle } from './helper';
import {CustomTheme, ThemeMode} from '@store/theme/ThemeWrapper'

const StyledButton = styled(TouchableOpacity)<{theme: CustomTheme}>`
  flex-direction: row;
  width: 70%;
  background-color: #ffffff;
  margin-left: auto;
  margin-right: auto;
  height: 40px;
  border-width: 1px;
  margin-bottom: 10px;
  justify-content: center;
  border-color: ${props=> props.theme.borderSectionColor};
`

const StyledFeatherIcon = styled(AntDesign)`
    margin: auto;
    margin-right: 3px;
    margin-left: 12px;
    text-align: center;
    font-size: 12px;

    color: #d1d1d1;
`

const StyledText = styled.Text`

    text-align: center;
    padding: 8px 5px 10px 0px;
    letter-spacing: 1px;
    font-weight: 800;
    font-size: 16px;
    color: #d1d1d1;
`

export interface Props{
    loginWithGoogle: ()=>void
}


const LoginWithGoogle = (props:Props) => {


    return (
        <StyledButton onPress={props.loginWithGoogle }>
            <StyledFeatherIcon name={'google'} />
            <StyledText>Sign in with Google</StyledText>
        </StyledButton>
      );
}

export default LoginWithGoogle ;
