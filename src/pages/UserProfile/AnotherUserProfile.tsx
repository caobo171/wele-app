/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect, useState, useContext, useCallback } from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { NavigationContext, NavigationScreenProp } from 'react-navigation';

import { useAnotherUserResult } from '@/store/user/hooks';
import { ThemeMode, CustomTheme } from '@/store/theme/ThemeWrapper';
import ProfileChart from './Chart';
import UserInfo from './UserInfo';



const Wrapper = styled.ScrollView<{ theme: CustomTheme }>`
  height: 100%;
  width: 100%;
  background-color: ${props => props.theme.backgroundColor};
`;

const HeaderWrapper = styled.View`
  height: 32px;
  flex-direction: row;
  justify-content: flex-start;
  padding: 0;
  
`;
const StyledBodyWrapper = styled.View`
  flex: 9;
  align-items: flex-start;
`;


const StyledSection = styled.View`
  width: 100%;
  margin: 0 ;
`;


const StyledSectionContent = styled.View``;

const StyledUserWrapper = styled.View<{ size: 'big' | 'medium' | 'small' }>`
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

const StyledName = styled.Text<{ theme: CustomTheme }>`
  width: 100%;
  text-align: center;
  font-size: 20px;
  letter-spacing: 3px;
  font-weight: 800; 
  color: ${props => props.theme.textColorH1}
`

const StyledLineCharWrapper = styled.View`
  width: 80%;
`

interface Props {
  navigation: NavigationScreenProp<any>
}

const AnotherProfile = (props: Props) => {

  const user = props.navigation.getParam('user', null)
  const results = useAnotherUserResult(user)

  const nav = useContext(NavigationContext)

  const onGobackHandle = useCallback(()=>{
    nav.navigate('Billboard')
  },[])

  return (
    <Wrapper>
      <HeaderWrapper>
        <TouchableOpacity onPress={onGobackHandle}>
          <View>
            <StyledAntDesignIcon name={'arrowleft'} />
          </View>
        </TouchableOpacity>
      </HeaderWrapper>


      <StyledBodyWrapper>
        <UserInfo user={user} />

        <StyledLineCharWrapper>
          <ProfileChart results={results} />
        </StyledLineCharWrapper>

      </StyledBodyWrapper>

    </Wrapper>
  );
};



AnotherProfile.navigationOptions = {
  header: null
};

export default AnotherProfile;
