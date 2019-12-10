/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useContext }  from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { NavigationContext } from 'react-navigation';
import { FlatList } from 'react-native-gesture-handler';
import NotificationItem  from './NotificationItem';
import { useNotifications } from '@/store/notification/hooks';



const Wrapper = styled.ScrollView`
  height: 100%;
  width: 100%;
  color: yellow;
`;

const HeaderWrapper = styled.View`
  background-color: white;
  height: 40px;
  flex-direction: row;
  justify-content: flex-start;
  padding: 0;
  align-items: center;
  margin-bottom: 10px;

  border-bottom-width: 1px;
  border-color: #d4d4d4;
`;

const StyledAntDesignIcon = styled(AntDesignIcon)`
  font-size: 28px;
  color: #a8a8a8;
  margin: 4px 0px 0px 10px;
`;


const StyledPageTitleText = styled.Text`
  font-weight: bold; 
  letter-spacing: 1px;
  font-size: 24px;
  margin-left: 20px;
`



const Notifications = () => {
    
  const notifications = useNotifications()

  console.log('check notifications', notifications)
  const nav = useContext(NavigationContext)
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
        <StyledPageTitleText>
            Notifications
        </StyledPageTitleText>
      </HeaderWrapper>
      <FlatList
        data = {notifications}
        renderItem = {({item})=> <NotificationItem notification= {item}/>}
        keyExtractor = {item => item.id}
      />

    </Wrapper>
  );
};




export default Notifications;
