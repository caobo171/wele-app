

import React from 'react'
import { NavigationScreenConfigProps, NavigationScreenProp } from 'react-navigation';
import styled from 'styled-components/native';

//@ts-ignore
import FeatherIcon from 'react-native-vector-icons/Feather';
import { View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import NotificationType from 'src/models/Notification';
import { updateNotifications } from '../../redux/actions/notificationAction';

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



interface Props {
    navigation: NavigationScreenProp<any>,
    unSeenNotifications:number ,
    updateNotifications: ()=> void
}

const Header = (props: Props) => {

    console.log('check unSeenNotifications', props.unSeenNotifications )
    return (
        <HeaderWrapper>
            
            <TouchableOpacity onPress={() => {
                props.updateNotifications()
                props.navigation.navigate('Notifications');
            }}>
                <StyledView>
                    <StyledFeatherIcon name={'bell'} />
                    {props.unSeenNotifications > 0 && <StyledBadge>{props.unSeenNotifications}</StyledBadge>}
                </StyledView>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {

                props.navigation.navigate('UserProfile');
            }}>
                <View>
                    <StyledFeatherIcon name={'settings'} />
                </View>
            </TouchableOpacity>


        </HeaderWrapper>
    )
}

const mapStateToProps = (state:any)=>{
    return {
        unSeenNotifications: (state.notification.unSeenNotifications as NotificationType[]).length
    }


}

const mapDispatchToProps = (dispatch : any)=>{
    return {
        updateNotifications: ()=> dispatch(updateNotifications())
    }
}



export default connect(mapStateToProps, mapDispatchToProps)( Header ) 


