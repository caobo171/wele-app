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
  margin: auto;
  width: 100px;
  height: 40px;
  border-width: 4px;
  border-radius: 20px;
  padding: 4px;
  text-align: center;
  justify-content: center;
  align-items: center;
  border-color: #595959
`

const StyledText = styled.Text`
  font-weight: bold; 
  letter-spacing: 1px;
  text-transform: uppercase;
`

const StyledLineCharWrapper = styled.View`
  width: 80%;
`


interface Props {
  logOut: () => void,
  navigation: NavigationScreenProp<any, any>,
  currentUser: UserType,
  getMyResult: (user: UserType) => void,
  result: {
    totalArray: number[],
    labelArray:number[]
  } 
}

const transformResult = (result: ResultType | undefined)=>{


  if(!result ) return { totalArray : [ 0, 0, 0, 0, 0, 0, 0, 0 , 0], labelArray:['', '', '', '', '', '', '', '' , ''] } 

  const rResult = {...result}

  const keys = Object.keys(rResult)
  let data: number[] = []
  for (let i = 0 ; i< keys.length; i++){
    if(Number(keys[i]) > 0 ){      
      data.push(Number(keys[i]))
    }
  }

  data = data.sort((a,b)=> a-b )

  let tempTotal = 0;
  let totalArray  = []
  let labelArray = []
  const divider = Math.round(data.length / 6)
  for (let i = 0 ; i< data.length; i++){
    if(rResult[data[i]]){
      tempTotal += Number(rResult[data[i]])
        if(i% divider === 0){
          totalArray.push(tempTotal)
          labelArray.push(data[i])
        }
        
    }
  }

  if(data.length -1 % divider !== 0 ){
    totalArray.push(tempTotal)
    labelArray.push(data[data.length -1])
  }

  console.log({ totalArray, labelArray })

  return { totalArray, labelArray }
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
              labels : props.result.labelArray,
              datasets: [
                {
                  data: props.result.totalArray
                }
              ]
            }}
            width={Dimensions.get("window").width  } // from react-native
            height={220}
            yAxisLabel={""}
            yAxisSuffix={""}
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 0.7) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
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
