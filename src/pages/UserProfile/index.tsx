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
import StatusBarView from '@/components/UI/StatusbarView';



const Wrapper = styled.ScrollView<{theme: CustomTheme}>`
  height: 100%;
  width: 100%;
  background-color: ${props=> props.theme.backgroundColor};
`;

const StyledBodyWrapper = styled.View`
  padding-top: 20px;
  flex: 9;
  align-items: flex-start;
`;


const StyledLineCharWrapper = styled.View`
  width: 80%;
`


const UserProfile = React.memo(() => {

  const currentUser = useCurrentUser()
  const myResults = useMyResult()

  const nav = useContext(NavigationContext)

  const state = useAsync(async () => {

    if (currentUser) {
      getMyresult(currentUser)
    }
  }, [currentUser.id])

 const goBackHandle = useCallback(()=> nav.goBack(),[])

  return (
    <Wrapper>
      <StatusBarView/>
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
