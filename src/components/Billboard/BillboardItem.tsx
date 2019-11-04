import React from 'react'

import { View , TouchableOpacity , ScrollView , Text } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';

import styled from 'styled-components/native';
import ResultType from 'src/models/Result';
import UserType from 'src/models/User';
import UserAvatar from '../User/UserAvatar';
const StyledUserSection = styled.View`
  height: 58px;
  width: 100%;
  flex-direction: row;
`;

const StyledOrderIndicator = styled.Text<{color: string}>`
  text-align: center;
  flex: 0.5;
  padding-top: 8px;
  margin-right: 10px;
  border-bottom-width: 3px;
  border-color: #bababa;
  margin-bottom: 28px;

  font-size: 10px;
  font-weight: bold;
  color: ${props => props.color} ;
`;

const StyledUserNameWrapper = styled.View`
  flex: 8;
  flex-direction: column;
  margin-left: 12px;
`;

const StyledName = styled.Text`
  font-weight: bold;
  font-size: 14px;
  letter-spacing: 1px;

`;

const StyledAvatarWrapper = styled.View`
  flex: 2;
`;


const StyledSubDescription = styled.Text`
  font-size: 12px;
  color: #757575;
`;



const StyledEntypoIcon = styled(EntypoIcon)`
  font-size: 16px;
  color: #a8a8a8;
  margin: 8px 10px 8px 10px;
`;

const StyledActionButtonGroup = styled.View`
  flex: 2;
`;

const renderColor = (index: number)=>{
    switch (index){
      case 0:
        return 'blue';
      case 1:
        return 'green';
      case 2:
        return 'red';
      default:
        return  'grey';
    }
  };


interface Props {
    result : ResultType,
    index: number,
    user: UserType | null
}
const BillboardItem = (props: Props)=>{
    console.log(props.result.id)
    return (
        <StyledUserSection>
        <StyledOrderIndicator color={renderColor(props.index)}>
              {props.index + 1}
        </StyledOrderIndicator>
        <StyledAvatarWrapper>
            <UserAvatar user={props.user}/>
        </StyledAvatarWrapper>
        <StyledUserNameWrapper>
            <StyledName>{props.result.Name}</StyledName>
            <StyledSubDescription>{props.result.Total ? props.result.Total.toFixed(1).toString(): ''}{' scores'}</StyledSubDescription>
        </StyledUserNameWrapper>
        <StyledActionButtonGroup>
            {/* <TouchableOpacity onPress={() => {
                props.navigation.navigate('PodcastDetail');
              }}> */}
                  <StyledEntypoIcon name={'dots-three-vertical'} />
              {/* </TouchableOpacity> */}
        </StyledActionButtonGroup>
      </StyledUserSection>
    )
}


export default BillboardItem