/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect , useState , useCallback} from 'react';

import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage'

import {TouchableOpacity} from 'react-native';




import styled from 'styled-components/native';
import { NavigationScreenProp } from 'react-navigation';
import storage from '../helpers/localStorage';
import { usePlayer, updateSpeed, updatePlayback } from '../hooks/playerHooks';


const Wrapper = styled(LinearGradient)`
  margin-top: 5px;
  height: 99%;
  width: 96%;
  color: yellow;
  margin : auto;
`;


const StyledBillboardContent = styled.View`
  flex: 4;
  padding: 20px ;
  flex-direction: row;
  padding: 20px 0px 40px 0px;
`;

const StyledValueColumn = styled.View`
    flex: 1;
    height: 100%;
    flex-direction: column;
`

const StyledNumberView = styled(TouchableOpacity)`
    flex: 1;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`
const StyledNumberText = styled.Text<{check: boolean}>`
    color: ${props => props.check ? 'green': '#737373'};
    font-weight: bold;
`

const StyledColumnHeader = styled.Text`
    flex:1;
    text-align: center;
    text-align-vertical: bottom;
    margin: 20px;
    font-weight: bold;
    color: #dcdcdc;
`

const StyledTouchableHighlight = styled.TouchableOpacity`
    flex: 1;
    padding-top: 20px;
    justify-content: center;
    flex-direction: row;
`

const StyledAntDesignIcon = styled(AntDesignIcon)`
    color: green;
    font-size: 16px;
`

interface Props{
    navigation: NavigationScreenProp<any,any>
}
const SettingRates = (props: Props) => {

    console.log('checkkkkkkkk 44444444')
  const {playback, speed } = usePlayer()

  const handleSetSpeed = (speed: number)=>{
    storage.set('speed', speed.toString())
    updateSpeed(speed)
  }

  const handleSetPlayback = (playback: number)=>{
    storage.set('playback', playback.toString())
    updatePlayback(playback)
  }

  return (
    <Wrapper colors={['#7a7a7a', '#b5b5b5', '#e6e6e6']} locations={[0,0.3,0.5]}>
        <StyledTouchableHighlight onPress={()=> {
            try{
                props.navigation.navigate('Player')
            }catch(err){
                console.log('err', err)
            }
        }}>
                <StyledColumnHeader>
                    Change speed
                </StyledColumnHeader>
                <StyledColumnHeader>
                    Change playback 
                </StyledColumnHeader>
        </StyledTouchableHighlight>

        <StyledBillboardContent>
            <StyledValueColumn>
                {
                    [1, 1.2, 1.5, 1.8, 2.0, 2.3].map(number=>{
                        return <StyledNumberView  key={number} onPress={()=> handleSetSpeed(number)}>
                            { speed === number && <StyledAntDesignIcon name="check"/>}
                            <StyledNumberText check={speed === number}>
                                {number}x
                            </StyledNumberText>
                        </StyledNumberView>
                    }) 
                }
            </StyledValueColumn>
            <StyledValueColumn>
                {
                    [ 5 , 10 , 15, 20, 25, 30 ].map(number=>{
                        return <StyledNumberView  key={number} onPress={()=> handleSetPlayback(number)}>
                            { playback === number && <StyledAntDesignIcon name="check"/>}
                            <StyledNumberText check={playback === number}>
                                {number}s
                            </StyledNumberText>
                        </StyledNumberView>
                    }) 
                }
            </StyledValueColumn>
        </StyledBillboardContent>
    </Wrapper>
  );
};

SettingRates.navigationOptions = {
    header: null,
}

export default SettingRates;
