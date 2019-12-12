import { GoogleSignin } from '@react-native-community/google-signin';
import { firebase } from '@react-native-firebase/auth';
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { View , TouchableOpacity} from 'react-native'
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

  border-color: ${props=> props.theme.borderSectionColor};
`

const StyledFeatherIcon = styled(AntDesign)`
    margin: auto;
    text-align: center;
    font-size: 24px;
    flex: 1;
    color: #d1d1d1;
`

const StyledText = styled.Text`
    flex: 5;
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


    return <View
    // animation="bounce" easing="ease-out" iterationCount={Infinity}
    >
        <StyledButton onPress={props.loginWithGoogle }>
            <StyledFeatherIcon name={'google'} />
            <StyledText>Login With Google</StyledText>
        </StyledButton>
    </View>
}

export default LoginWithGoogle ;