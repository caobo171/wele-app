/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';

import { View , TouchableOpacity , ScrollView , Text } from 'react-native';




import styled from 'styled-components';
const USERS = [
  { id: 1,
    avatar: 'https://scontent.fhan5-5.fna.fbcdn.net/v/t1.0-9/59528057_2337390009919933_2310877556993163264_n.jpg?_nc_cat=108&_nc_oc=AQltd9pUjhuunu-IUR4dEMWT779-EPHYaDBl-EhrXx7iADCLxASJd1IlOP2qpGinDnQ&_nc_ht=scontent.fhan5-5.fna&oh=e1609b24df777c814be2ca0fb390bab3&oe=5E281B00',
    name: 'Nguyễn Văn Cao',
  },
  {
    id: 2,
    avatar: 'https://scontent.fhan5-5.fna.fbcdn.net/v/t1.0-9/59528057_2337390009919933_2310877556993163264_n.jpg?_nc_cat=108&_nc_oc=AQltd9pUjhuunu-IUR4dEMWT779-EPHYaDBl-EhrXx7iADCLxASJd1IlOP2qpGinDnQ&_nc_ht=scontent.fhan5-5.fna&oh=e1609b24df777c814be2ca0fb390bab3&oe=5E281B00',
    name: 'Nguyễn Văn Cao',
  },
  {
    id: 3,
    avatar: 'https://scontent.fhan5-5.fna.fbcdn.net/v/t1.0-9/59528057_2337390009919933_2310877556993163264_n.jpg?_nc_cat=108&_nc_oc=AQltd9pUjhuunu-IUR4dEMWT779-EPHYaDBl-EhrXx7iADCLxASJd1IlOP2qpGinDnQ&_nc_ht=scontent.fhan5-5.fna&oh=e1609b24df777c814be2ca0fb390bab3&oe=5E281B00',
    name: 'Nguyễn Văn Cao',
  },
  {
    id: 4,
    avatar: 'https://scontent.fhan5-5.fna.fbcdn.net/v/t1.0-9/59528057_2337390009919933_2310877556993163264_n.jpg?_nc_cat=108&_nc_oc=AQltd9pUjhuunu-IUR4dEMWT779-EPHYaDBl-EhrXx7iADCLxASJd1IlOP2qpGinDnQ&_nc_ht=scontent.fhan5-5.fna&oh=e1609b24df777c814be2ca0fb390bab3&oe=5E281B00',
    name: 'Nguyễn Văn Cao',
  },
  {
    id: 5,
    avatar: 'https://scontent.fhan5-5.fna.fbcdn.net/v/t1.0-9/59528057_2337390009919933_2310877556993163264_n.jpg?_nc_cat=108&_nc_oc=AQltd9pUjhuunu-IUR4dEMWT779-EPHYaDBl-EhrXx7iADCLxASJd1IlOP2qpGinDnQ&_nc_ht=scontent.fhan5-5.fna&oh=e1609b24df777c814be2ca0fb390bab3&oe=5E281B00',
    name: 'Nguyễn Văn Cao',
  },
  {
    id: 6,
    avatar: 'https://scontent.fhan5-5.fna.fbcdn.net/v/t1.0-9/59528057_2337390009919933_2310877556993163264_n.jpg?_nc_cat=108&_nc_oc=AQltd9pUjhuunu-IUR4dEMWT779-EPHYaDBl-EhrXx7iADCLxASJd1IlOP2qpGinDnQ&_nc_ht=scontent.fhan5-5.fna&oh=e1609b24df777c814be2ca0fb390bab3&oe=5E281B00',
    name: 'Nguyễn Văn Cao',
  },
  {
    id: 7,
    avatar: 'https://scontent.fhan5-5.fna.fbcdn.net/v/t1.0-9/59528057_2337390009919933_2310877556993163264_n.jpg?_nc_cat=108&_nc_oc=AQltd9pUjhuunu-IUR4dEMWT779-EPHYaDBl-EhrXx7iADCLxASJd1IlOP2qpGinDnQ&_nc_ht=scontent.fhan5-5.fna&oh=e1609b24df777c814be2ca0fb390bab3&oe=5E281B00',
    name: 'Nguyễn Văn Cao',
  },
  {
    id: 8,
    avatar: 'https://scontent.fhan5-5.fna.fbcdn.net/v/t1.0-9/59528057_2337390009919933_2310877556993163264_n.jpg?_nc_cat=108&_nc_oc=AQltd9pUjhuunu-IUR4dEMWT779-EPHYaDBl-EhrXx7iADCLxASJd1IlOP2qpGinDnQ&_nc_ht=scontent.fhan5-5.fna&oh=e1609b24df777c814be2ca0fb390bab3&oe=5E281B00',
    name: 'Nguyễn Văn Cao',
  },
];


const Wrapper = styled(LinearGradient)`
  margin-top: 5px;
  height: 99%;
  width: 96%;
  color: yellow;
  margin : auto;
`;


const StyledPodcastImage = styled.Image`
  height: 40px;
  width: 40px;
  border-radius: 50;
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

const StyledOrderIndicator = styled.Text`
  text-align: center;
  flex: 0.5;
  margin-left: 5px;
  padding-top: 8px;
  margin-right: 5px;

  border-bottom-width: 4px;
  border-color: #bababa;
  margin-bottom: 24px;

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

const StyledHeaderImage = styled.Image`
  width: ${props => props.width}px;
  height: ${props=> props.height}px;
  margin: 16px;
`

const renderColor = (index)=>{
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

const Billboard = (props) => {
  return (
    <Wrapper colors={['#7a7a7a', '#b5b5b5', '#e6e6e6']} locations={[0,0.3,0.5]}>
        <StyledBillboardHeader>
          <StyledHeaderImage resizeMode={'contain'} source ={ require('../assets/cup.png') } width={64} height={72}/>
          <StyledHeaderImage resizeMode={'contain'} source ={ require('../assets/cup.png') } width={92} height={112}/>
          <StyledHeaderImage resizeMode={'contain'} source ={ require('../assets/cup.png') } width={52} height={80} />
        </StyledBillboardHeader> 
        <StyledBillboardContent>
          {
            USERS.map( (user,index)=> {
              return (
                <StyledUserSection key={user.id}>
                  <StyledOrderIndicator color={renderColor(index)}>
                        {index + 1}
                  </StyledOrderIndicator>
                  <StyledPodcastImage
                    resizeMode={'contain'}
                    source = {{
                      uri: user.avatar,
                    }}
                  />
                  <StyledUserNameWrapper>
                      <StyledName>{user.name}</StyledName>
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
          }
        </StyledBillboardContent>
    </Wrapper>
  );
};

export default Billboard;
