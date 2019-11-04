import React from 'react'
import styled from 'styled-components/native'
import NotificationType from '../../models/Notification'
import { NavigationScreenProp } from 'react-navigation'



const StyledImage = styled.Image`
  height: 46px;
  width: 46px;
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

const StyledText = styled.Text`
    font-size: 13px;
    flex: 2.2;
`

const StyledTitle = styled.Text`
     font-weight:bold;
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


interface Props {
    notification: NotificationType,
    navigation: NavigationScreenProp<any, any>
}


const TrimText = (text: string) => {
    const MAX_LENGTH = 80 
    if(text.length <= MAX_LENGTH ) return text
    return text.substr(0, Math.min(text.length, 80)) + "...";
};


export const NotificationItem = (props: Props) => {
    return (

        <StyledWrapper>
            <StyledImageWrapper>
                <StyledImage source={{ uri: props.notification.imgUrl }} />
            </StyledImageWrapper>
            <StyledContentWrapper>
                <StyledText>{props.notification.title && <StyledTitle>[{props.notification.title.toUpperCase()}]</StyledTitle>} {TrimText(props.notification.message)}</StyledText>
                <StyledTimeAgo>1 hour ago</StyledTimeAgo>
            </StyledContentWrapper>

        </StyledWrapper>
    )
}

export default NotificationType