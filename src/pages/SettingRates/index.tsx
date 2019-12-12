/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useContext } from 'react';

import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';

import { TouchableOpacity } from 'react-native';




import styled from 'styled-components/native';
import storage from '@/service/localStorage';
import globalPlayer from '@/service/playerService';
import { usePlayerSettings } from '@/store/player/hooks';
import { updateSpeed, updatePlayback } from '@/store/player/functions';
import { NavigationContext } from 'react-navigation';

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
const StyledNumberText = styled.Text<{ check: boolean }>`
    color: ${props => props.check ? 'green' : '#737373'};
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

interface SettingsPlaybackProps {
    playback: number;
}

const SettingsPlayBack = React.memo((props: SettingsPlaybackProps) => {
    const handleSetPlayback = (playback: number) => {
        storage.set('playback', playback.toString())
        updatePlayback(playback)
    }

    return <StyledValueColumn>
        {
            [5, 10, 15, 20, 25, 30].map(number => {
                return <StyledNumberView key={number} onPress={() => handleSetPlayback(number)}>
                    {props.playback === number && <StyledAntDesignIcon name="check" />}
                    <StyledNumberText check={props.playback === number}>
                        {number}s
                </StyledNumberText>
                </StyledNumberView>
            })
        }
    </StyledValueColumn>
}, (prev, next) => prev.playback === next.playback)

interface SettingsSpeedProps {
    speed: number
}

const SettingsSpeed = React.memo((props: SettingsSpeedProps) => {

    const handleSetSpeed = (speed: number) => {
        storage.set('speed', speed.toString())
        globalPlayer.fast(speed);
        updateSpeed(speed)
    }

    return (
        <StyledValueColumn>
            {
                [0.5, 0.7, 0.8, 1, 1.2, 1.5, 1.8, 2].map(number => {
                    return <StyledNumberView key={number} onPress={() => handleSetSpeed(number)}>
                        {props.speed === number && <StyledAntDesignIcon name="check" />}
                        <StyledNumberText check={props.speed === number}>
                            {number}x
                </StyledNumberText>
                    </StyledNumberView>
                })
            }
        </StyledValueColumn>
    )
}, (prev, next) => prev.speed === next.speed)

const SettingRates = React.memo(() => {
    const { playback, speed } = usePlayerSettings()
    const nav = useContext(NavigationContext)



    return (
        <Wrapper colors={['#7a7a7a', '#b5b5b5', '#e6e6e6']} locations={[0, 0.3, 0.5]}>
            <StyledTouchableHighlight onPress={() => {
                try {
                    nav.navigate('Player')
                } catch (err) {
                    console.log('err', err)
                }
            }}>.
                <StyledColumnHeader>
                    Change speed
                </StyledColumnHeader>
                <StyledColumnHeader>
                    Change playback
                </StyledColumnHeader>
            </StyledTouchableHighlight>

            <StyledBillboardContent>
                <SettingsSpeed speed={speed} />
                <SettingsPlayBack playback={playback} />
            </StyledBillboardContent>
        </Wrapper>
    );
});



//@ts-ignore
SettingRates.navigationOptions = {
    header: null,
}

export default SettingRates;
