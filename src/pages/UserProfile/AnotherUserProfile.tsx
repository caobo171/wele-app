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

import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { NavigationContext, NavigationScreenProp } from 'react-navigation';

import {useAnotherUserResult } from '@/store/user/hooks';

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

    return (
        <Wrapper>
            <HeaderWrapper>
                <TouchableOpacity onPress={() => {
                    nav.navigate('BillBoard')
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
                                source={{ uri: user.photoURL }}
                            />
                            <StyledName>
                                {user.displayName}
                            </StyledName>
                        </StyledUserWrapper>
                    </StyledSectionContent>
                </StyledSection>

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
