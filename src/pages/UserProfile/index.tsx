/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useContext } from 'react';
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
import LoginWrapper from '../LoginWrapper';
import UpgradeButton from '@/components/InAppPurchase/UpgradeButton';


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
  const state = useAsync(async () => {

    if (currentUser) {
      getMyresult(currentUser)
    }
  }, [currentUser])


  return (
    <Wrapper>
      <StatusBarView/>

      <LoginWrapper>
        <StyledBodyWrapper>
            <UserInfo user={currentUser}/>

            {/* <UpgradeButton/> */}
            <StyledLineCharWrapper>
            {
                state.loading ? <LoadingComponent /> :
                <ProfileChart results={myResults} />
            }

            </StyledLineCharWrapper>
            <GroupActionsButton/>
        </StyledBodyWrapper>
      </LoginWrapper>


    </Wrapper>
  );
});


//@ts-ignore
UserProfile.navigationOptions = {
  header: null
};

export default UserProfile;
