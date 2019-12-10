

import React, { useContext } from 'react'
import { NavigationContext } from 'react-navigation';
import styled from 'styled-components/native';

//@ts-ignore
import FeatherIcon from 'react-native-vector-icons/Feather';
import { View, TouchableOpacity } from 'react-native';
import { useNotifications, useUnreadNotificationNumber } from '@store/notification/hooks';
import { updateNotifications } from '@store/notification/functions';
import { updateLastSeenOfUser } from '@/store/user/function';
import { useCurrentUser } from '@/store/user/hooks';

const StyledFeatherIcon = styled(FeatherIcon)`
  font-size: 28px;
  color: #a8a8a8;
  margin: 8px 20px 0px 0px;
`;

const HeaderWrapper = styled.View`
  background-color: white;
  height: 40px;
  flex-direction: row;
  justify-content: flex-end;
  padding: 0;
  
`;

const StyledView = styled.View`
    position: relative;
`

const StyledBadge = styled.Text`
    position: absolute;
    border-radius: 7px;
    right: 20px;
    top: 5px;
    height: 14px;
    width: 14px;
    font-size: 10px;
    background: #ff4f4f;
    color: #696969;
    text-align: center;
    font-weight: bold;
`



const Header = () => {

    const unreadNumber = useUnreadNotificationNumber()
    const nav = useContext(NavigationContext)
    const currentUser = useCurrentUser()
    return (
        <HeaderWrapper>

            <TouchableOpacity onPress={() => {
                updateNotifications()
                updateLastSeenOfUser(currentUser)
                nav.navigate('Notifications');
            }}>
                <StyledView>
                    <StyledFeatherIcon name={'bell'} />
                    {unreadNumber > 0 && <StyledBadge>{unreadNumber}</StyledBadge>}
                </StyledView>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => nav.navigate('UserProfile')}>
                <View>
                    <StyledFeatherIcon name={'settings'} />
                </View>
            </TouchableOpacity>
        </HeaderWrapper>
    )
}



export default Header


