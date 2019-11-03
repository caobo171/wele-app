/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect, useState } from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import { View, TouchableOpacity, Text, Dimensions } from 'react-native';
import { connect } from "react-redux";

import styled from 'styled-components/native';
import { logOut, getMyResult } from "../redux/actions/userActions"
import { NavigationScreenProp } from 'react-navigation';
import UserType from 'src/models/User';
import ResultType from 'src/models/Result'
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
  margin-bottom: 10px;
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

const StyledLineCharWrapper = styled.View`
  width: 80%;
`


interface Props {
  logOut: () => void,
  navigation: NavigationScreenProp<any, any>,
  currentUser: UserType,
  getMyResult: (user: UserType) => void,
  result: number[]
}

const transformResult = (result: ResultType | undefined)=>{


  if(!result ) return [ 0, 0, 0, 0, 0, 0, 0, 0 , 0]

  const rResult = {...result}

  const keys = Object.keys(rResult)
  let data: number[] = []
  for (let i = 0 ; i< keys.length; i++){
    if(Number(keys[i]) > 0 ){      
      data.push(Number(keys[i]))
    }
  }

  data = data.sort((a,b)=> a-b )
  console.log(data.map((e:any)=> ({result:  rResult[e], e})))

  let tempTotal = 0;
  let totalArray  = []
  for (let i = 0 ; i< data.length; i++){
    if(rResult[data[i]]){
      tempTotal += Number(rResult[data[i]])
      console.log('check aa', tempTotal)
        if(i% 20 === 0){
          totalArray.push(tempTotal)
        }
        
    }
  }

  if(data.length -1 % 20 !== 0 ){
    totalArray.push(tempTotal)
  }

  return totalArray
}

const UserProfile = (props: Props) => {

  const [data, setData] = useState<any>([])

  useEffectOnce(() => {
    if (props.currentUser) {
      props.getMyResult(props.currentUser)
    }

  })

  useEffect(() => {
    console.log('check ', props.result)
    
  
  }, [props.currentUser, props.result])

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

        <StyledLineCharWrapper>
          <LineChart
            data={{

              datasets: [
                {
                  data: props.result
                }
              ]
            }}
            width={Dimensions.get("window").width  } // from react-native
            height={220}
            yAxisLabel={""}
            yAxisSuffix={""}
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
               
              },
              propsForDots: {
                r: "2",
                strokeWidth: "1",
                stroke: "#ffa726"
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
              margin: 'auto'
            }}
          />
        </StyledLineCharWrapper>


        <StyledLogOutButton onPress={logOutHandle}>
          <StyledText>Log out</StyledText>
        </StyledLogOutButton>
      </StyledBodyWrapper>

    </Wrapper>
  );
};

const mapStateToProps = (state: any) => {
  return {
    currentUser: state.user.currentUser,
    result : transformResult(state.user.currentUser.result)
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
