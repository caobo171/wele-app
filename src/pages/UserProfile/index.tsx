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
import { getMyresult } from '@/store/user/function';
import useAsync from 'react-use/lib/useAsync';
import LoadingComponent from '@/components/Loading/Loading';
import ProfileChart from './Chart';

import { ThemeMode , CustomTheme } from '@/store/theme/ThemeWrapper';
import UserInfo from './UserInfo';
import GroupActionsButton from './GroupActionsButton';



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



const StyledAntDesignIcon = styled(AntDesignIcon)`
  font-size: 28px;
  color: #a8a8a8;
  margin: 4px 0px 0px 10px;
`;

const StyledLineCharWrapper = styled.View`
  width: 80%;
`


const UserProfile = React.memo(() => {

  const currentUser = useCurrentUser()
  const myResults = useMyResult()


  console.log('aaaaaaaaaaaaaa check user')
  const nav = useContext(NavigationContext)

  const state = useAsync(async () => {
    console.log('check curreUser', currentUser)
    if (currentUser) {
      getMyresult(currentUser)
    }
  }, [currentUser.id])



  return (
    <Wrapper>
      <HeaderWrapper>
        <TouchableOpacity onPress={() => {
          nav.navigate('Home')
        }}>
          
            <StyledAntDesignIcon name={'arrowleft'} />
        </TouchableOpacity>
      </HeaderWrapper>


      <StyledBodyWrapper>
  
        <UserInfo user={currentUser}/>
        <StyledLineCharWrapper>
          {
            state.loading ? <LoadingComponent /> :
              <ProfileChart results={myResults} />
          }

        </StyledLineCharWrapper>

        <GroupActionsButton/>
      </StyledBodyWrapper>

    </Wrapper>
  );
});


//@ts-ignore
UserProfile.navigationOptions = {
  header: null
};

export default UserProfile;
