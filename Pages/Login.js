/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import { View, TouchableOpacity, ScrollView , Text } from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather'


import styled from 'styled-components';

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
  margin-bottom: 30px;
  flex: 1;
`;


const StyledButtonWrapper = styled.View`
    flex: 1;

`

const StyledButton= styled.View`
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



const Login = (props) => {
  return (
    <Wrapper>
        <StyledLogoImage
            resizeMode={"contain"}
            source={{ uri: 'https://external.fhan5-7.fna.fbcdn.net/safe_image.php?d=AQDMvQfI0WkUxIgV&w=540&h=282&url=https%3A%2F%2Fstatic.wixstatic.com%2Fmedia%2F29b9a8_05dd638ec28a4b26826c557f0bc92d7f%257Emv2.jpg&cfs=1&upscale=1&fallback=news_d_placeholder_publisher&_nc_hash=AQATC3dBf1z-fyYw' }}
        />
        <StyledButtonWrapper>
            <StyledButton>
                <StyledFeatherIcon name={'facebook'}/>
                <StyledText>Login With Facebook</StyledText>
            </StyledButton>
        </StyledButtonWrapper>

    </Wrapper>
  );
};


export default Login;
