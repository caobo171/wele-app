/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useCallback } from 'react'
import { TouchableOpacity, Alert } from "react-native";
import { AccessToken, LoginManager } from "react-native-fbsdk";
import { firebase } from "@react-native-firebase/auth";
import FeatherIcon from 'react-native-vector-icons/FontAwesome'
import { connect } from "react-redux";
import styled from 'styled-components/native';
import { setCurrentUser } from '@store/user/function';
import { UserType } from "@store/user/types"


import * as Animatable from 'react-native-animatable';
import { loginWithFacebook, validateEmail } from './helper';
import { useCurrentUser } from '@/store/user/hooks';
const Wrapper = styled.View`
  margin-top: 20px;
  height: 100%;
  width: 100%;
  flex-direction: column;
`;

const StyledLogoImage = styled.Image`
  width: 100%;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  flex: 1;
`;


const StyledButtonWrapper = styled.View`
    flex: 1;
`

const StyledButton = styled(TouchableOpacity)`
  flex-direction: row;
  width: 70%;
  background-color: #4267b2;
  margin-left: auto;
  margin-right: auto;
  height: 40px;
`

const StyledFeatherIcon = styled(FeatherIcon)`
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

  const onLoginFacebookHandle = async () => {
    // Login with permissions
    const user = await loginWithFacebook()
    //@ts-ignore
    if (user.additionalUserInfo.isNewUser) {
      setFirstTime(true)
      setUser(user)
    } else {
      
      setCurrentUser({
        id: user.user.uid,
        displayName: user.user.displayName ? user.user.displayName : '',
        email: user.user.email ? user.user.email : '',
        photoURL: user.user.photoURL ? user.user.photoURL : ''
      }, false)
    }
  }

  const onTextChangeHandle = useCallback((value: string) => {
    setEmail(value)
  }, [email])

  const onConfirmEmailChangeHandle = useCallback((value: string) => {
    setConfirmEmail(value)
  }, [confirmEmail])



  const onContinueHandle = () => {
    if (email !== confirmEmail) {
      Alert.alert('Error', 'Confirm Email is not match');
      return
    } else if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter valid Email');
      return
    } else {

      if (currentUser) {
        setCurrentUser(currentUser, email)
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


  const condition = (currentUser && !currentUser.weleEmail || firstTime)


  return (
    <Wrapper>
      <StyledLogoImage
        resizeMode={"contain"}
        source={{ uri: 'https://external.fhan5-7.fna.fbcdn.net/safe_image.php?d=AQDMvQfI0WkUxIgV&w=540&h=282&url=https%3A%2F%2Fstatic.wixstatic.com%2Fmedia%2F29b9a8_05dd638ec28a4b26826c557f0bc92d7f%257Emv2.jpg&cfs=1&upscale=1&fallback=news_d_placeholder_publisher&_nc_hash=AQATC3dBf1z-fyYw' }}
      />

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

        {
          !condition && (
            <Animatable.View
              animation="bounce" easing="ease-out" iterationCount={Infinity}
            >
              <StyledButton onPress={onLoginFacebookHandle}>
                <StyledFeatherIcon name={'facebook-f'} />
                <StyledText>Login With Facebook</StyledText>
              </StyledButton>
            </Animatable.View>

          )
        }

      </StyledButtonWrapper>

    </Wrapper>
  );
};




export default Login
