/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import { View, TouchableOpacity, ScrollView } from 'react-native';




import styled from 'styled-components';



const Wrapper = styled.ScrollView`
  height: 100%;
  width: 100%;
  color: yellow;
`;

const HeaderWrapper = styled.View`
  background-color: white;
  height: 32px;
  flex-direction: row;
  justify-content: flex-start;
  padding: 0;
  
`;
const StyledBodyWrapper = styled.View`
  background-color: white;
  flex: 9;
  align-items: flex-start;
`;


const StyledSection = styled.View`
  width: 100%;
  margin: 0 ;
  background-color: white;
`;


const StyledSectionContent = styled.View``;

const StyledUserWrapper = styled.View`
  background-color: white;
  height:  ${props => props.size === 'big' ? '240px' : (props.size === 'medium' ? '180px' : '160px')} ;
  width: 100%;
  flex-direction: column;
  border-style: solid;
  border-color: #d4d4d4;
  padding: 10px 10px 10px 10px;
`;


const StyledPodcastImage = styled.Image`
  height: 140;
  width: 140;
  border-radius: 70;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
`;

const StyledAntDesignIcon = styled(AntDesignIcon)`
  font-size: 28px;
  color: #a8a8a8;
  margin: 4px 0px 0px 10px;
`;

const StyledName = styled.Text`
  width: 100%;
  text-align: center;
  font-size: 20px;
  letter-spacing: 3px;
  font-weight: 800; 
`


const UserProfile = (props) => {

  const [user, setUser]

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
      </HeaderWrapper>


      <StyledBodyWrapper>
        <StyledSection>

          <StyledSectionContent>
            <StyledUserWrapper size="big" >
              <StyledPodcastImage
                resizeMode={"contain"}
                source={{ uri: USER.avatar }}
              />
              <StyledName>
                {USER.name}
              </StyledName>
            </StyledUserWrapper>
          </StyledSectionContent>
        </StyledSection>
      </StyledBodyWrapper>


    </Wrapper>
  );
};

UserProfile.navigationOptions = {
  header: null
};

export default UserProfile;
