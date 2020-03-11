import React, { useMemo } from 'react'
import styled from 'styled-components/native'
import { CustomTheme, ThemeMode } from '@store/theme/ThemeWrapper'
import { usePlayer } from '@/store/player/hooks'
import { Text } from 'react-native'

const StyledView = styled.ScrollView<{ theme: CustomTheme }>`
    background-color: ${props => props.theme.backgroundColor};
    width: 100%;

`

const StyledText = styled.Text<{ theme: CustomTheme }>`
    line-height: 26px;
    font-size:  18px;
    color: ${props => props.theme.textColorH3};
`

const StyledTextWrapper = styled.Text`
    margin-bottom: 20px;
    padding: 10px;
`


const StyledHighLightText = styled.Text<{ theme: CustomTheme }>`
    line-height: 26px;
    font-size:  18px;
    color: ${props => props.theme.textColorH1};
    font-weight: 700;
`;

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
    text = text.replace(/\n/g,' ')
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
            text:  arrayText[i + 1]
        })


    }

    return transformTextObjects

}



const Hint = React.memo((props: Props) => {

    const { position } = usePlayer()


    const hintObjects = useMemo(()=>transformText(props.hint), [props.hint])


    if (hintObjects.length === 1) return (<StyledView>
        <StyledTextWrapper>

            <StyledText>{validdateHint(props.hint)}</StyledText>
        </StyledTextWrapper>

    </StyledView>)
    return <StyledView>
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
}, (prev, next) => prev.hint === next.hint)


export default Hint