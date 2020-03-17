/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useCallback } from 'react'
import { TouchableOpacity, Alert, View, StyleSheet } from "react-native";
import FeatherIcon from 'react-native-vector-icons/FontAwesome'
import styled from 'styled-components/native';
import { setCurrentUser } from '@store/user/function';
import { CustomTheme, ThemeMode } from '@store/theme/ThemeWrapper'
import LoginWithGoogle from './LoginWithGoogle'
import * as Animatable from 'react-native-animatable';
import { loginWithFacebook, validateEmail, loginWithGoogle, loginWithApple } from './helper';
import { useCurrentUser } from '@/store/user/hooks';
import useAsyncFn from 'react-use/lib/useAsyncFn';
import LoadingComponent from '@/components/Loading/Loading';
import Touchable from '@/components/UI/Touchable';

import { AppleButton } from '@invertase/react-native-apple-authentication';
import appleAuth, {
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
  AppleAuthCredentialState,
} from '@invertase/react-native-apple-authentication';
// import { firebase } from "@react-native-firebase/auth";



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
const StyledButton1 = styled(Touchable)`
  flex-direction: row;
  width: 70%;
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

  const onLoginFacebookHandle = async () => {
    fetchLogin()
  }

  const onLoginWithGoogleHandle = async () => {
    fetchLoginGoogle()
  }
  const onLoginWithAppleHandle = async () => {
    fetchAppleLogin()
  }

  const onTextChangeHandle = useCallback((value: string) => {
    setEmail(value)
  }, [email])

  const onConfirmEmailChangeHandle = useCallback((value: string) => {
    setConfirmEmail(value)
  }, [confirmEmail])


    // //apple sign in
    //   const  appleSignIn = (result) => {
    //     console.log('Resssult',result);
    //   };
    //
    //   const styles = StyleSheet.create({
    //     container: {
    //       flex: 1,
    //       justifyContent: 'center',
    //       alignItems: 'center'
    //     },
    //     appleBtn: { height: 44, width: 200 }
    //   });

//     async function onAppleButtonPress() {
//         console.warn('Beginning Apple Authentication');
//
//         try {
//             const appleAuthRequestResponse = await appleAuth.performRequest({
//               requestedOperation: AppleAuthRequestOperation.LOGIN,
//               requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
//             });
//
//             console.log('appleAuthRequestResponse', appleAuthRequestResponse);
//
//             const {
//               user: newUser,
//               email,
//               nonce,
//               identityToken,
//               realUserStatus /* etc */,
//             } = appleAuthRequestResponse;
//
//             user = newUser;
//
//             fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
//               updateCredentialStateForUser(`Error: ${error.code}`),
//             );
//
//             if (identityToken) {
//               // e.g. sign in with Firebase Auth using `nonce` & `identityToken`
//               console.log(nonce, identityToken);
//               const appleCredential = firebase.auth.AppleAuthProvider.credential(identityToken, nonce);
//               const userCredential = await firebase.auth().signInWithCredential(appleCredential);
//
//               // user is now signed in, any Firebase `onAuthStateChanged` listeners you have will trigger
//               console.warn(`Firebase authenticated via Apple, UID: ${userCredential.user.uid}`);
//
//             } else {
//               // no token - failed sign-in?
//             }
//
//
//
//             if (realUserStatus === AppleAuthRealUserStatus.LIKELY_REAL) {
//               console.log("I'm a real person!");
//             }
//
//             console.log(`Apple Authentication Completed, ${user}, ${email}`);
//           } catch (error) {
//             if (error.code === AppleAuthError.CANCELED) {
//               console.warn('User canceled Apple Sign in.');
//             } else {
//               console.error(error);
//             }
//           }
// }







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


  const condition = (currentUser && (!currentUser.weleEmail)) || firstTime


  return (
    <Wrapper>
      <StyledLogoImage
        resizeMode={"contain"}
        source={require('@/assets/branding.jpg')}
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
                <LoginWithGoogle loginWithGoogle={onLoginWithGoogleHandle} />


                <StyledButton onPress={onLoginFacebookHandle}>
                  <StyledFeatherIcon name={'facebook-f'} />
                  <StyledText>Login With Facebook</StyledText>
                </StyledButton>

                <StyledButton1 onPress={onLoginWithAppleHandle} >
                    <StyledText>Login With Apple</StyledText>
                </StyledButton1>









              </React.Fragment>


            )}
          </React.Fragment>}
      </StyledButtonWrapper>

    </Wrapper>
  );
};




export default Login
