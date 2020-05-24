

import React, { useContext, useCallback } from 'react'
import { NavigationContext } from 'react-navigation';
import styled from 'styled-components/native';
import { CustomTheme } from '@store/theme/ThemeWrapper'

//@ts-ignore
import FeatherIcon from 'react-native-vector-icons/Feather';
import { View, TouchableOpacity } from 'react-native';
import { useNotifications, useUnreadNotificationNumber } from '@store/notification/hooks';
import { updateNotifications } from '@store/notification/functions';
import { updateLastSeenOfUser } from '@/store/user/function';
import { useCurrentUser } from '@/store/user/hooks';
import { UserType } from '@/store/user/types';
import Touchable from '@/components/UI/Touchable';


const StyledFeatherIcon = styled(FeatherIcon)`
  font-size: 28px;
  color: #a8a8a8;
  margin: 8px 20px 0px 0px;
`;

const HeaderWrapper = styled.View<{ theme: CustomTheme }>`
  background-color: ${props => props.theme.backgroundColor}
  height: 40px;
  flex-direction: row;
  justify-content: flex-end;
  padding: 0;
  
`;

const StyledView = styled.View`
    position: relative;
`

const StyledBadge = styled.Text`
    color: #ffffff;
    text-align: center;
    font-weight: bold;
`
const StyledBadgeWrapper = styled.View`
    background: #ff4f4f;
    align-items: center;
    justify-content: center;
    position: absolute;
    border-radius: 8px;
    right: 20px;
    top: 5px;
    height: 16px;
    width: 16px;
    background: #ff4f4f;
`

const STouchable = styled(Touchable)`
    height: 60px;
    width: 60px;
`

const Header = React.memo(() => {

    const unreadNumber = useUnreadNotificationNumber()
    const currentUser = useCurrentUser()
    return <HeaderMemo unreadNumber={unreadNumber} currentUser={currentUser} />
})
interface Props {
    currentUser: UserType,
    unreadNumber: number
}
const HeaderMemo = React.memo((props: Props) => {

    const onNotificationClickHandle = useCallback(() => {
        updateNotifications()
        updateLastSeenOfUser(props.currentUser)
        nav.navigate('Notifications');
    }, [props.currentUser])

    const nav = useContext(NavigationContext)

    const navigateToUserProfile = useCallback(() => {
        nav.navigate('UserProfile')
    }, [])
    return <HeaderWrapper>
        <STouchable onPress={onNotificationClickHandle}>
            <StyledView>
                <StyledFeatherIcon name={'bell'} />
                {props.unreadNumber > 0 && <StyledBadgeWrapper>
                    <StyledBadge>{props.unreadNumber}</StyledBadge>
                </StyledBadgeWrapper>}
            </StyledView>
        </STouchable>
        <STouchable onPress={navigateToUserProfile}>
            <View>
                <StyledFeatherIcon name={'settings'} />
            </View>
        </STouchable>
    </HeaderWrapper>
}, (prev, next) => prev.currentUser.id === next.currentUser.id && prev.unreadNumber === next.unreadNumber)



export default Header


