/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @flow
 */

import React from 'react';

import EntypoIcon from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';

import { View , TouchableOpacity , ScrollView , Text } from 'react-native';




import styled from 'styled-components/native';
import { NavigationScreenProp, FlatList } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import useEffectOnce from 'react-use/lib/useEffectOnce';
import { listUsers } from '../redux/actions/userActions';
import UserType from '../models/User';
import UserAvatar from '../components/User/UserAvatar';

const Wrapper = styled(LinearGradient)`
  margin-top: 5px;
  height: 99%;
  width: 96%;
  color: yellow;
  margin : auto;
`;


const StyledAvatarWrapper = styled.View`
  flex: 2;
`;


const StyledBillboardHeader = styled.View`
  flex: 1;
  padding-top: 20px;
  justify-content: center;
  flex-direction: row;

`;

const StyledBillboardContent = styled.ScrollView`
  flex: 2.5;
  padding: 20px ;
`;


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

  border-bottom-width: 4px;
  border-color: #bababa;
  margin-bottom: 28px;

  font-size: 12px;
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

const StyledHeaderImage = styled.Image<{width:number, height:number}>`
  width: ${props  => props.width}px;
  height: ${props=> props.height}px;
  margin: 16px;
`

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
  navigation : NavigationScreenProp<any,any>
}

const Billboard = (props : Props) => {

  const dispatch = useDispatch()

  const users: Array<UserType> = useSelector((state:any)=> [...state.user.listUsers.values()] )

  console.log('check users', users)
  useEffectOnce(()=>{
    dispatch(listUsers())
  })
  return (
    <Wrapper colors={['#7a7a7a', '#b5b5b5', '#e6e6e6']} locations={[0,0.3,0.5]}>
        <StyledBillboardHeader>
          <StyledHeaderImage resizeMode={'contain'} source ={ require('../assets/cup.png') } width={64} height={72}/>
          <StyledHeaderImage resizeMode={'contain'} source ={ require('../assets/cup.png') } width={92} height={112}/>
          <StyledHeaderImage resizeMode={'contain'} source ={ require('../assets/cup.png') } width={52} height={80} />
        </StyledBillboardHeader> 
        <StyledBillboardContent>
          <FlatList

            data= {users}
            renderItem = {({item , index})=> {
              return (
                <StyledUserSection key={item.id}>
                <StyledOrderIndicator color={renderColor(index)}>
                      {index + 1}
                </StyledOrderIndicator>
                <StyledAvatarWrapper>
                    <UserAvatar user={item}/>
                </StyledAvatarWrapper>
                <StyledUserNameWrapper>
                    <StyledName>{item.displayName}</StyledName>
                    <StyledSubDescription>Beginner</StyledSubDescription>
                </StyledUserNameWrapper>
                <StyledActionButtonGroup>
                    <TouchableOpacity onPress={() => {
                        props.navigation.navigate('PodcastDetail');
                      }}>
                          <StyledEntypoIcon name={'dots-three-vertical'} />
                      </TouchableOpacity>
                </StyledActionButtonGroup>
              </StyledUserSection>
              )
            }}

            keyExtractor={item => item.id}
          />
          {/* {
            users.map( (user,index)=> {
              return (
                <StyledUserSection key={user.id}>
                  <StyledOrderIndicator color={renderColor(index)}>
                        {index + 1}
                  </StyledOrderIndicator>
                  <StyledAvatarWrapper>
                      <UserAvatar user={user}/>
                  </StyledAvatarWrapper>
                  <StyledUserNameWrapper>
                      <StyledName>{user.displayName}</StyledName>
                      <StyledSubDescription>Beginner</StyledSubDescription>
                  </StyledUserNameWrapper>
                  <StyledActionButtonGroup>
                      <TouchableOpacity onPress={() => {
                          props.navigation.navigate('PodcastDetail');
                        }}>
                            <StyledEntypoIcon name={'dots-three-vertical'} />
                        </TouchableOpacity>
                  </StyledActionButtonGroup>
                </StyledUserSection>

              );
            })
          } */}
        </StyledBillboardContent>
    </Wrapper>
  );
};

export default Billboard;
