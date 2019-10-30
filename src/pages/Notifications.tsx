/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React  from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import { View, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";

import styled from 'styled-components/native';
import { logOut } from "../redux/actions/userActions"
import { NavigationScreenProp } from 'react-navigation';
import UserType from 'src/models/User';
import NotificationType from 'src/models/Notification';
import { FlatList } from 'react-native-gesture-handler';
import { NotificationItem } from '../components/Notifications/NotificationItem';



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
const StyledBodyWrapper = styled.View`
  background-color: white;
  flex: 9;
  align-items: flex-start;
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

interface Props{
  navigation: NavigationScreenProp<any,any>,
  currentUser : UserType,
  notifications: NotificationType[]
}

const Notifications = (props: Props) => {
    
 console.log('check notifications',props.notifications)
  return (
    <Wrapper>
      <HeaderWrapper>
        <TouchableOpacity onPress={() => { 
          props.navigation.navigate('Home')
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
        data = {props.notifications}
        renderItem = {({item})=> <NotificationItem notification= {item} navigation={props.navigation} />}
        keyExtractor = {item => item.id}
      />

      <StyledBodyWrapper>
          
      </StyledBodyWrapper>


    </Wrapper>
  );
};

const mapStateToProps = (state: any)=>{
  return {
    
    notifications: [...state.notification.unSeenNotifications, ...state.notification.seenNotifications]
  }
}



export default connect(mapStateToProps)(Notifications);
