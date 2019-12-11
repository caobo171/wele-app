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

import { View, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import { NavigationContext } from 'react-navigation';

import { useCurrentUser, useMyResult } from '@/store/user/hooks';
import { getMyresult, logOut } from '@/store/user/function';
import useAsync from 'react-use/lib/useAsync';
import LoadingComponent from '@/components/Loading/Loading';
import ProfileChart from './Chart';
import { updateTheme } from '@/store/theme/functions';
import { ThemeMode , CustomTheme } from '@/store/theme/ThemeWrapper';



const Wrapper = styled.ScrollView<{theme: CustomTheme}>`
  height: 100%;
  width: 100%;
  background-color: ${props=> props.theme.backgroundColor};
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

const StyledName = styled.Text<{theme: CustomTheme}>`
  width: 100%;
  text-align: center;
  font-size: 20px;
  letter-spacing: 3px;
  font-weight: 800; 
  color: ${props=> props.theme.textColorH1};
`
const StyledEmail = styled.Text<{theme: CustomTheme}>`
  width: 100%;
  text-align: center;
  font-size: 18px;
  letter-spacing: 1px;
  font-weight: 700; 
  color: ${props=> props.theme.textColorH2};
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

const StyledText = styled.Text<{theme: CustomTheme}>`
  font-weight: bold; 
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${props=> props.theme.textColorH1};
  
`

const StyledLineCharWrapper = styled.View`
  width: 80%;
`

const StyledThemeButton = styled.TouchableOpacity<{ color: string }>`
  height: 36px;
  width: 36px;
  border-radius: 18px;
  background-color: ${props => props.color};
  border-width: 2px;
  border-color: #bfbfbf;
  margin: 8px;
`

const StyledButtonsGroup = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
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
              <StyledEmail>
                ( {currentUser.weleEmail ? currentUser.weleEmail : `You dont' have WELE Email`} )
              </StyledEmail>
            </StyledUserWrapper>
          </StyledSectionContent>
        </StyledSection>

        <StyledLineCharWrapper>
          {
            state.loading ? <LoadingComponent /> :
              <ProfileChart results={myResults} />
          }

        </StyledLineCharWrapper>

        <StyledButtonsGroup>
          <StyledLogOutButton onPress={logOutHandle}>
            <StyledText>Log out</StyledText>

          </StyledLogOutButton>

          <StyledThemeButton color={'#ffffff'} onPress={() => {
            updateTheme(ThemeMode.LIGHT)
          }} />
          <StyledThemeButton color={'#595959'}
            onPress={() => {
              updateTheme(ThemeMode.DARK)
            }}
          />
        </StyledButtonsGroup>

      </StyledBodyWrapper>

    </Wrapper>
  );
};



UserProfile.navigationOptions = {
  header: null
};

export default UserProfile;
