import React, { useMemo, useContext, useCallback, useRef, useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { CustomTheme, ThemeMode } from '@store/theme/ThemeWrapper'
import { usePlayer } from '@/store/player/hooks'
import { Text, Dimensions } from 'react-native'
import { NavigationContext } from 'react-navigation'
import globalPlayer from '@/service/playerService'
import ActionButtons from './ActionButtons'
import { ScrollView } from 'react-native-gesture-handler'
import PlayerSlider from './Slider'
import { updateSliding, updatePosition } from '@/store/player/functions'
import Constants from '@/Constants';
import Analytics from '@/service/Analytics'

const StyledView = styled.ScrollView<{ theme: CustomTheme }>`
    background-color: ${props => props.theme.backgroundColor};
    width: 100%;

`

const StyledText = styled.Text<{ theme: CustomTheme }>`
    line-height: 26px;
    font-size:  ${Constants.HINT_FONTSIZE}px;
    color: ${props => props.theme.textColorH3};
`

const StyledTextWrapper = styled.Text`
    margin-bottom: 100px;
    padding: 10px;
`

const StyledWrapper = styled.View`
    width: 100%;
    position: relative;
`

const StyledHighLightText = styled.Text<{ theme: CustomTheme }>`
    line-height: 26px;
    font-size:  ${Constants.HINT_FONTSIZE}px;
    color: ${props => props.theme.textColorH1};
    font-weight: 700;
`;

const StyledAbsoluteWrapper = styled.View<{theme: CustomTheme}>`
    position: absolute;
    width: 100%;
    bottom : 10px;
    left: 0;
    background-color: ${props=> props.theme.backgroundColor}
`
interface Props {
    hint: string | undefined
}



const validdateHint = (hint: string) => {
    return hint.replace(/&#39;/g, `'`).replace(/&quot;/g, `"`)
}

const transformText = (text: string): Array<{
    time: number,
    text: string
}> => {
    text = text.replace(/\n/g, ' ')
    let arrayText = text.split(/(\[\w+\])/g);
    if (! /(\[\w+\])/.test(arrayText[0])) {
        arrayText.unshift('[0]')
    }

    let transformTextObjects: Array<{
        time: number,
        text: string
    }> = []

    for (let i = 0; i < arrayText.length; i += 2) {
        transformTextObjects.push({
            time: Number(arrayText[i].match(/\d+/g)[0]),
            text: arrayText[i + 1]
        })


    }

    return transformTextObjects

}



const Hint = React.memo((props: Props) => {

    const nav = useContext(NavigationContext)
    let scrollRef = useRef<ScrollView>(null)
    const { state, position, playback, speed, } = usePlayer()
    const [height, setHeight] = useState(-1);
    const hintObjects = useMemo(() => transformText(props.hint), [props.hint])

    const onPlayBackHandle = useCallback(async () => {
        await globalPlayer.playBack(playback)
    }, [])

    const onPausePlayHandle = useCallback(() => {
        globalPlayer.playPause()
    }, [])

    const onSlideCompleHandle = useCallback(async (value: number) => {
        await globalPlayer.seekTo(value)
        await updateSliding(false)
        await updatePosition(position.duration,value)
    },[])

    const onSlideStartHandle = useCallback(async () => {
        await updateSliding(true)
    },[])


    useEffect(()=>{
        Analytics.trackScreenView('Hint');
    },[])


   useEffect(() => {
        if (scrollRef && scrollRef.current) {
            //@ts-ignore
            scrollRef.current.scrollTo({
                x: 0,
                y: position.position / position.duration * height - 120   ,
                animated: true
            })
        }
    }, [scrollRef, position.position, height])


    const setHeightHandle = useCallback((contentWidth, contentHeight)=>{
        setHeight(contentHeight)
    }, [height])
    if (hintObjects.length === 1) return (<StyledView>
        <StyledTextWrapper>

            <StyledText>{validdateHint(props.hint)}</StyledText>
        </StyledTextWrapper>

    </StyledView>)
    return (
        <StyledWrapper>
            <StyledView 
                //@ts-ignore
                ref={scrollRef}
                onContentSizeChange={setHeightHandle}>
                <StyledTextWrapper>
                    {
                        hintObjects.map(object => {
                            if (object.time - 0.3 < position.position) {
                                return <StyledHighLightText key={object.time}>{validdateHint(object.text)}</StyledHighLightText>
                            } else {
                                return <StyledText key={object.time}>{validdateHint(object.text)}</StyledText>
                            }
                        })
                    }


                </StyledTextWrapper>
            </StyledView>
            <StyledAbsoluteWrapper>
                <PlayerSlider
                    duration={position.duration}
                    position={position.position}
                    onSlidingComplete={onSlideCompleHandle}
                    onSlidingStart={onSlideStartHandle}
                />
                <ActionButtons
                    openSettings={() => {
                        nav.navigate('SettingRates')
                    }}
                    speed={speed ? Number(speed) : 1}
                    playing={globalPlayer.isPlaying(state)}
                    playback={playback ? Number(playback) : 5}
                    onPlayBackHandle={onPlayBackHandle}
                    onPausePlayHandle={onPausePlayHandle}
                />

            </StyledAbsoluteWrapper>
        </StyledWrapper>
    )


}, (prev, next) => prev.hint === next.hint)


export default Hint