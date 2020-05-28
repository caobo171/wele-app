/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useContext, useCallback }  from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { NavigationContext } from 'react-navigation';
import { FlatList } from 'react-native-gesture-handler';
import NotificationItem  from './NotificationItem';
import { useNotifications } from '@/store/notification/hooks';

import {CustomTheme } from '@store/theme/ThemeWrapper'
import StatusBarView from '@/components/UI/StatusbarView';

const Wrapper = styled.ScrollView<{theme: CustomTheme}>`
  height: 100%;
  width: 100%;
  background-color: ${props=> props.theme.backgroundColor}
`;

const HeaderWrapper = styled.View<{theme: CustomTheme}>`
  background-color: ${props=> props.theme.backgroundColor};
  height: 40px;
  flex-direction: row;
  justify-content: flex-start;
  padding: 0;
  align-items: center;
  margin-bottom: 10px;

  border-bottom-width: 1px;
  border-color: ${props=> props.theme.borderSectionColor}
`;

const StyledAntDesignIcon = styled(AntDesignIcon)`
  font-size: 28px;
  color: #a8a8a8;
  margin: 4px 0px 0px 10px;
`;


const StyledPageTitleText = styled.Text<{theme: CustomTheme}>`
  font-weight: bold; 
  letter-spacing: 1px;
  font-size: 24px;
  margin-left: 20px;
  color: ${props=> props.theme.textColorH1};
`


const ITEM_HEIGHT = 46;

const Notifications = () => {
    
  const notifications = useNotifications()

  const nav = useContext(NavigationContext)


  const getItemLayout = useCallback((data, index)=>(
    {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index})
    
  , [])
  return (
    <Wrapper>
      <StatusBarView/>
      <HeaderWrapper>
      </HeaderWrapper>
      <FlatList
        getItemLayout = {getItemLayout}
        data = {notifications}
        renderItem = {({item})=> <NotificationItem notification= {item}/>}
        keyExtractor = {item => item.id}
      />

    </Wrapper>
  );
};




export default Notifications;
