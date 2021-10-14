import React, { useCallback, useContext } from 'react'
import styled from 'styled-components/native'
import NotificationType from '@store/notification/types'
import { NavigationContext } from 'react-navigation';

import {CustomTheme, ThemeMode} from '@store/theme/ThemeWrapper'
import UIBackgroundImage from '@/components/UI/UIBackgroundImage';

const StyledImage = styled.Image`
  height: 100%;
  width: 100%;
  border-radius: 50;

`;

const StyledImageWrapper = styled.View`
  position: relative;
  flex: 1;
  align-items: center;
`


const StyledWrapper = styled.TouchableOpacity`
  height: 76px;
  width: 100%;
  flex-direction: row;
  padding: 4px  8px 4px 8px;
  align-items: center;
`;

const StyledText = styled.Text<{theme: CustomTheme}>`
    font-size: 13px;
    flex: 2.2;
    color: ${props=> props.theme.textColorH2};
`

const StyledTitle = styled.Text<{theme: CustomTheme}>`
     font-weight:bold;
     color: ${props=> props.theme.textColorH1};
`

const StyledTimeAgo = styled.Text`
    font-size: 10px;
    color:#ababab;
    margin-left: 4px;
    flex: 1;
`

const StyledContentWrapper = styled.View`
    flex-direction: column;
    flex: 5;
`
const StyledUIBackgroundImage = styled(UIBackgroundImage)`
  height: 46px;
  width: 46px;
  border-radius: 50px;
`

interface Props {
  notification: NotificationType,
}


const TrimText = (text: string) => {
  const MAX_LENGTH = 80
  if (text.length <= MAX_LENGTH) return text
  return text.substr(0, Math.min(text.length, 80)) + "...";
};


function timeSince(date: Date) {

  var seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

export const NotificationItem = (props: Props) => {
  const nav = useContext(NavigationContext)
  const onClickNotificationHandler = useCallback(() => {
    if (props.notification.type === 'weekly_podcast') {
      nav.navigate('PodcastList', {
        search: props.notification.message.match(/\d+/g)[0]
      })
    }
  },[])
  return (

    <StyledWrapper onPress={onClickNotificationHandler}>
      <StyledImageWrapper>
        <StyledUIBackgroundImage>
        <StyledImage source={{ uri: props.notification.imgUrl }} />
        </StyledUIBackgroundImage>
     
      </StyledImageWrapper>
      <StyledContentWrapper>
        <StyledText>{props.notification.title && <StyledTitle>[{props.notification.title.toUpperCase()}]</StyledTitle>} {TrimText(props.notification.message)}</StyledText>
        <StyledTimeAgo>{timeSince(props.notification.time)} ago</StyledTimeAgo>
      </StyledContentWrapper>

    </StyledWrapper>
  )
}

export default NotificationItem