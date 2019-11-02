/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect } from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import { View, TouchableOpacity , Text , Dimensions} from 'react-native';
import { connect } from "react-redux";

import styled from 'styled-components/native';
import { logOut, getMyResult } from "../redux/actions/userActions"
import { NavigationScreenProp } from 'react-navigation';
import UserType from 'src/models/User';
import useEffectOnce from 'react-use/lib/useEffectOnce';


import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";



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

const StyledUserWrapper = styled.View<{ size: 'big' | 'medium' | 'small' }>`
  background-color: white;
  height:  ${props => props.size === 'big' ? '240px' : (props.size === 'medium' ? '180px' : '160px')} ;
  width: 100%;
  flex-direction: column;
  border-style: solid;
  border-color: #d4d4d4;
  padding: 10px 10px 10px 10px;
`;


const StyledPodcastImage = styled.Image`
  height: 100;
  width: 100;
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

const StyledLogOutButton = styled.TouchableOpacity`
  width: 80%;
  margin: auto;
`

const StyledText = styled.Text`
  font-weight: bold; 
  letter-spacing: 1px;
`


interface Props {
  logOut: () => void,
  navigation: NavigationScreenProp<any, any>,
  currentUser: UserType,
  getMyResult: (user: UserType) => void
}

const UserProfile = (props: Props) => {

  useEffectOnce(() => {
    if (props.currentUser) {
      props.getMyResult(props.currentUser)
    }

  })

  useEffect(() => {
    console.log('check props', props.currentUser)
  }, [props.currentUser])

  const logOutHandle = async () => {
    await props.logOut()
  }
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
                source={{ uri: props.currentUser.photoURL }}
              />
              <StyledName>
                {props.currentUser.displayName}
              </StyledName>
            </StyledUserWrapper>
          </StyledSectionContent>
        </StyledSection>

        <StyledLogOutButton onPress={logOutHandle}>
          <StyledText>Log out</StyledText>
        </StyledLogOutButton>
      </StyledBodyWrapper>

      <View>
        <Text>Bezier Line Chart</Text>
        <LineChart
          data={{
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100
                ]
              }
            ]
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisLabel={"$"}
          yAxisSuffix={"k"}
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </View>


    </Wrapper>
  );
};

const mapStateToProps = (state: any) => {
  return {
    currentUser: state.user.currentUser
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    logOut: () => dispatch(logOut()),
    getMyResult: (user: UserType) => dispatch(getMyResult(user))
  }
}

UserProfile.navigationOptions = {
  header: null
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
