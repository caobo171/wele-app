/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useCallback } from 'react'
import { TouchableOpacity, Alert, View, StyleSheet, Text, Button, Platform } from "react-native";
import FeatherIcon from 'react-native-vector-icons/FontAwesome'
import styled from 'styled-components/native';
import { setCurrentUser } from '@store/user/function';
import { CustomTheme, ThemeMode } from '@store/theme/ThemeWrapper'
import LoginWithGoogle from './LoginWithGoogle'
import * as Animatable from 'react-native-animatable';
import { loginWithFacebook, validateEmail, loginWithGoogle, loginWithApple, rEmail } from './helper';
import { useCurrentUser } from '@/store/user/hooks';
import useAsyncFn from 'react-use/lib/useAsyncFn';
import LoadingComponent from '@/components/Loading/Loading';
import Touchable from '@/components/UI/Touchable';

import { AppleButton } from '@invertase/react-native-apple-authentication';


const SWarningText= styled.Text<{ theme: CustomTheme }>`
    text-align: center;
    margin-bottom: 32px;
    color: ${props=> props.theme.textColorH1};
    font-weight: 700;
    font-size: 18px;
`

const SAppleButton = styled(AppleButton)<{theme: CustomTheme}>`
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

const Wrapper = styled.View<{ theme: CustomTheme }>`
  height: 100%;
  width: 100%;
  flex-direction: column;
  background-color: ${props => props.theme.backgroundColor};
`;

const StyledLogoImage = styled.Image<{ theme: CustomTheme }>`
  width: 100%;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  flex: 1;
  ${props => props.theme.name === ThemeMode.DARK && `
    opacity: 0.7;
  `}
`;


const StyledButtonWrapper = styled.View`
    flex: 1;
`

const StyledButton = styled(Touchable)`
  flex-direction: row;
  width: 70%;
  background-color: #4267b2;
  margin-left: auto;
  margin-right: auto;
  height: 40px;
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

const StyledTextInput = styled.TextInput`
  flex-direction: row;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  height: 40px;
  border-bottom-width: 2px;
  border-bottom-color: #83bcfc;
`

const StyledTextNote = styled.Text`

`

const Login = () => {

  const [email, setEmail] = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')
  const [user, setUser] = useState<any>({})

  const [firstTime, setFirstTime] = useState(false)
  const currentUser = useCurrentUser()

  const [loginState, fetchLogin] = useAsyncFn(async () => {
    // Login with permissions
    const user = await loginWithFacebook()

    if (user.additionalUserInfo.isNewUser) {
      setFirstTime(true)
      setUser(user)
    } else {

      return await setCurrentUser({
        id: user.user.uid,
        displayName: user.user.displayName ? user.user.displayName : '',
        email: user.user.email ? user.user.email : '',
        photoURL: user.user.photoURL ? user.user.photoURL : ''
      }, false)


    }
  })

  //Login Apple
  const [loginAppleState, fetchAppleLogin] = useAsyncFn(async () => {
    // Login with permissions
    const user = await loginWithApple()
    if(user){
      return await setCurrentUser({
        id: user.id,
        displayName: user.displayName,
        email: user.email,
        photoURL: 'https://cdn2.iconfinder.com/data/icons/apple-inspire-black/100/Apple-21-512.png'
      }, user.email)
    }else{
      setCurrentUser(null);
    }

  })

  const [loginGoogleState, fetchLoginGoogle] = useAsyncFn(async () => {
    const user = await loginWithGoogle()
    if (user.additionalUserInfo.isNewUser) {
      return await setCurrentUser({
        id: user.user.uid,
        displayName: user.user.displayName ? user.user.displayName : '',
        email: user.user.email ? user.user.email : '',
        photoURL: user.user.photoURL ? user.user.photoURL : ''
      }, user.user.email)
    } else {

      return await setCurrentUser({
        id: user.user.uid,
        displayName: user.user.displayName ? user.user.displayName : '',
        email: user.user.email ? user.user.email : '',
        photoURL: user.user.photoURL ? user.user.photoURL : ''
      }, false)

    }
  })

  const onTextChangeHandle = useCallback((value: string) => {
    setEmail(value)
  }, [email])

  const onConfirmEmailChangeHandle = useCallback((value: string) => {
    setConfirmEmail(value)
  }, [confirmEmail])


  const onContinueHandle = () => {
    const reformatEmail = rEmail(email);
    if (email !== rEmail(confirmEmail)) {
      Alert.alert('Error', 'Confirm Email is not match');
      return
    } else if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter valid Email');
      return
    } else {

      if (currentUser) {
        setCurrentUser(currentUser, reformatEmail)
      } else {
        setCurrentUser({
          id: user.user.uid,
          displayName: user.user.displayName ? user.user.displayName : '',
          email: user.user.email ? user.user.email : '',
          photoURL: user.user.photoURL ? user.user.photoURL : ''
        }, email)
      }
    }
  }


  const condition = (currentUser && (!currentUser.weleEmail)) || firstTime


  return (
    <Wrapper>
      <StyledLogoImage
        resizeMode={"contain"}
        source={require('@/assets/branding.jpg')}
      />

      <SWarningText>
          You need to Sign in to Use this Feature
      </SWarningText>

      {condition && (

        <Animatable.Text
          style={{
            width: '80%',
            marginLeft: 'auto',
            marginRight: 'auto',
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 14,
            textAlign: 'center'
          }}
          animation="pulse" easing="ease-out" iterationCount={Infinity}>
          <StyledTextNote>{'Firstly!! Enter your email register in WELE '}</StyledTextNote>
        </Animatable.Text>
      )}

      <StyledButtonWrapper>

        {(loginState.loading || loginGoogleState.loading || loginAppleState.loading) ? <LoadingComponent /> :
          <React.Fragment>
            {}
            {
              condition && (
                <React.Fragment>
                  <StyledTextInput value={confirmEmail} onChangeText={onConfirmEmailChangeHandle} placeholder={"WELE email ..."} />

                  <StyledTextInput value={email} onChangeText={onTextChangeHandle} placeholder={"Confirm your email ..."} />
                  <StyledButton onPress={onContinueHandle}>
                    <StyledText>{"Continue >>"}</StyledText>
                  </StyledButton>
                </React.Fragment>
              )
            }

            {!condition && (
              <React.Fragment
              // animation="bounce" easing="ease-out" iterationCount={Infinity}
              >
                <LoginWithGoogle loginWithGoogle={fetchLoginGoogle} />

{/* 
                {Platform.OS === 'android' &&<StyledButton onPress={fetchLogin}>
                  <StyledFeatherIcon name={'facebook-f'} />
                  <StyledText>Login With Facebook</StyledText>
                </StyledButton>} */}

                {Platform.OS === 'ios' && <SAppleButton
                    buttonType={AppleButton.Type.SIGN_IN}
                    buttonStyle={AppleButton.Style.WHITE}
                    onPress={fetchAppleLogin}
                  />  
                }

              </React.Fragment>


            )}
          </React.Fragment>}
      </StyledButtonWrapper>

    </Wrapper>
  );
};




export default Login
