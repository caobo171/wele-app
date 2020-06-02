/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useContext, useCallback } from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import { View } from 'react-native';
import styled from 'styled-components/native';
import { NavigationContext, NavigationScreenProp } from 'react-navigation';

import { useAnotherUserResult } from '@/store/user/hooks';
import {CustomTheme } from '@/store/theme/ThemeWrapper';
import ProfileChart from './Chart';
import UserInfo from './UserInfo';
import StatusBarView from '@/components/UI/StatusbarView';
import Touchable from '@/components/UI/Touchable';



const Wrapper = styled.ScrollView<{ theme: CustomTheme }>`
  height: 100%;
  width: 100%;
  background-color: ${props => props.theme.backgroundColor};
`;

const STouchable = styled(Touchable)`
    height : 70px;
    width: 70px;
`

const HeaderWrapper = styled.View`
  height: 32px;
  flex-direction: row;
  justify-content: flex-start;
  padding: 0;
  
`;
const SBodyWrapper = styled.View`
  flex: 9;
  align-items: flex-start;
`;


const SAntDesignIcon = styled(AntDesignIcon)`
  font-size: 28px;
  color: #a8a8a8;
  margin: 4px 0px 0px 10px;
`;


const SLineCharWrapper = styled.View`
  width: 80%;
`

interface Props {
  navigation: NavigationScreenProp<any>
}

const AnotherProfile = React.memo((props: Props) => {

  const user = props.navigation.getParam('user', null)

  const results = useAnotherUserResult(user)
  const nav = useContext(NavigationContext)

  const onGobackHandle = useCallback(()=>{
    nav.navigate('Billboard')
  },[])

  return (
    <Wrapper>
      <StatusBarView/>
      <HeaderWrapper>
        <STouchable onPress={onGobackHandle}>
          <View>
            <SAntDesignIcon name={'arrowleft'} />
          </View>
        </STouchable>
      </HeaderWrapper>


      <SBodyWrapper>
        <UserInfo user={user} />

        <SLineCharWrapper>
          <ProfileChart results={results} />
        </SLineCharWrapper>

      </SBodyWrapper>
    </Wrapper>
  );
});


//@ts-ignore
AnotherProfile.navigationOptions = {
  header: null
};

export default AnotherProfile;
