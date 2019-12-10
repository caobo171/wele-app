/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect, useState, useContext } from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import { View, TouchableOpacity, Text, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { NavigationContext } from 'react-navigation';

import {
  LineChart,
} from "react-native-chart-kit";
import { useCurrentUser, useMyResult } from '@/store/user/hooks';
import { getMyresult, logOut } from '@/store/user/function';
import useAsync from 'react-use/lib/useAsync';
import LoadingComponent from '@/components/Loading/Loading';
import ProfileChart from './Chart';



const Wrapper = styled.ScrollView`
  height: 100%;
  width: 100%;
  color: yellow;
`;

const HeaderWrapper = styled.View`
  background-color: white;
  height: 32px;
  flex-direction: row;
  justify-content: flex-start;
  padding: 0;
  
`;
const StyledBodyWrapper = styled.View`
  background-color: white;
  flex: 9;
  align-items: flex-start;
`;


const StyledSection = styled.View`
  width: 100%;
  margin: 0 ;
  background-color: white;
`;


const StyledSectionContent = styled.View``;

const StyledUserWrapper = styled.View<{ size: 'big' | 'medium' | 'small' }>`
  background-color: white;
  width: 100%;
  flex-direction: column;
  border-style: solid;
  border-color: #d4d4d4;
  padding: 10px 10px 10px 10px;
`;


const StyledPodcastImage = styled.Image`
  height: 100;
  width: 100;
  border-radius: 70;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
`;

const StyledAntDesignIcon = styled(AntDesignIcon)`
  font-size: 28px;
  color: #a8a8a8;
  margin: 4px 0px 0px 10px;
`;

const StyledName = styled.Text`
  width: 100%;
  text-align: center;
  font-size: 20px;
  letter-spacing: 3px;
  font-weight: 800; 
`

const StyledLogOutButton = styled.TouchableOpacity`
  margin: auto;
  width: 100px;
  height: 40px;
  border-width: 4px;
  border-radius: 20px;
  padding: 4px;
  text-align: center;
  justify-content: center;
  align-items: center;
  border-color: #595959
`

const StyledText = styled.Text`
  font-weight: bold; 
  letter-spacing: 1px;
  text-transform: uppercase;
`

const StyledLineCharWrapper = styled.View`
  width: 80%;
`


const UserProfile = () => {

  const currentUser = useCurrentUser()
  const myResults = useMyResult()

  const nav = useContext(NavigationContext)

  const state = useAsync(async () => {
    if (currentUser) {
      getMyresult(currentUser)
    }
  }, [currentUser])


  const logOutHandle = async () => {
    await logOut()
  }
  return (
    <Wrapper>
      <HeaderWrapper>
        <TouchableOpacity onPress={() => {
          nav.navigate('Home')
        }}>
          <View>
            <StyledAntDesignIcon name={'arrowleft'} />
          </View>
        </TouchableOpacity>
      </HeaderWrapper>


      <StyledBodyWrapper>
        <StyledSection>

          <StyledSectionContent>
            <StyledUserWrapper size="big" >
              <StyledPodcastImage
                resizeMode={"contain"}
                source={{ uri: currentUser.photoURL }}
              />
              <StyledName>
                {currentUser.displayName}
              </StyledName>
            </StyledUserWrapper>
          </StyledSectionContent>
        </StyledSection>

        <StyledLineCharWrapper>
          {
            state.loading ? <LoadingComponent /> :
              <ProfileChart results={myResults}/>
            }

        </StyledLineCharWrapper>


        <StyledLogOutButton onPress={logOutHandle}>
          <StyledText>Log out</StyledText>
        </StyledLogOutButton>
      </StyledBodyWrapper>

    </Wrapper>
  );
};



UserProfile.navigationOptions = {
  header: null
};

export default UserProfile;
