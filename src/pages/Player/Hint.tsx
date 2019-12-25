import React from 'react'
import styled from 'styled-components/native'
import { CustomTheme, ThemeMode } from '@store/theme/ThemeWrapper'
import { usePlayer } from '@/store/player/hooks'
import { Text } from 'react-native'

const StyldView = styled.ScrollView<{ theme: CustomTheme }>`
    background-color: ${props => props.theme.backgroundColor};
    width: 100%;
    padding: 10px;
`

const StyledText = styled.Text<{ theme: CustomTheme }>`
    margin-top: 16px;
    font-size: 16px;
    margin-bottom: 32px;
    color: ${props => props.theme.textColorH1};
`


const StyledHighLightText = styled.Text`
    color: #eb4034;
    font-size: 18px;
`;

interface Props {
    hint: string | undefined
}

const exampleText = `[5]----- Payne didn’t ---- -- was ---- ----- one --- -- --- ------ grade [10]-- --- -------- -- ---- ---- - --------- --- ---- ----- --- --- ------ --- cashier --- [20]--- --- ------ ---- 
---- ----- --- ---- a ---------- [25]------- -- his lunch --- always ----- [30]----- never -------- ---- ---- -------- ---- --- their ------ -- [35]suddenly ---- ----- In financial ------ 
[40]----- --- -- ------ than --- --- ------- --- -- --- [45]-------- --------- himself -- ---- --- ---- ------ ---- -- [50]--- ---- -- ----- die -- ------ [150]-- --- ---- [55]-- come ----- ---- -- ---- --- -------- --- ----- --- --- --- -- ------- -- ------ -- ---- [65]indicated -- the ----- ---- -- --- - ---- ------- [70]------ ---- ---- -- ------- -- --- --- ---- -- everyone [75]--- -- --- -- -------- ---- --- ----- [80]--- kept --- distance ---- --------- ----- 
------ -- [85]--- ------- ----- changed --- ------- --- ---- [90]----- -- now - --------- -- social ----------- [95]-- -------- --- -- --- ----- ------ about being ---- [100]is feeling ----- ------- ---- carries ------ ------ [105]Comparing -------- -- ------ who ---- ---- leads -- ------ -- ------- ----- -- ----- [115]--- lead -- -------- --- ---- and ------- ------ [120]-- --- ---- lead -- - ----------- ------ ----- - [125]--- ------- -------- ----- says ---- [130]-- --- ---------- -- ------- --------- to ------ no ------ --- ---- -- ----- He - ----- -- an example [140]-- air ------- ---- ---------- ------ economy ----- ---- ---- ------ -- first-class ------- -- -- air-rage -- ------- --------- ---- --- --------- ---- face [155]to ---- ---- ------ ------ -- the [160]------- ------- ---- --- ---- ------- Poor [165]people are ---- ---- likely -- take greater ----- [170]---- -------- to ------ --- ------------ loans [175]----- 
some --- ---- people --- poor ------- -- --- --- [180]choices ---- ----- ----- ---- it’s ------ --- other --- ------- [185]---- make --- ------- ------- they ---- ---- have [190]------- to ----- ----- [145]---- ---- -------- [195]-- -- ----- -- only half -- --- -------- [200]--- ------ picture -- --- -- ----------- --------- [205]------- -- ----- ------ -- --- --- --- ------ -- -------- [210]--- --- --- ------- --- ---- --- poor -- ---- --------- [215]is ------- out of hand ----- ---- -- doesn’t [220]---- --- ------- --- --------- ---- -- ---- about ---------- [225]-- -- -- ---- -- ---- our --------- ------ --- --- ------`



const validdateHint = (hint: string) => {
    return hint.replace(/&#39;/g, `'`).replace(/&quot;/g, `"`)
}

const transformText = (text: string): Array<{
    time: number,
    text: string
}> => {
    let arrayText = text.split(/(\[\w+\])/g);
    if (! /(\[\w+\])/.test(arrayText[0])) {
        arrayText.unshift('[0]')
    }

    console.log(arrayText)
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

    const { position } = usePlayer()

    console.log(position.position)
    const hintObjects = transformText(exampleText)

    if (hintObjects.length === 1) return (<StyldView>
        <StyledText>{validdateHint(props.hint)}</StyledText>
    </StyldView>)
    return <StyldView>
        <Text>
            {
                hintObjects.map(object => {
                    if (object.time - 0.5 < position.position) {
                        return <StyledHighLightText key={object.time}>{validdateHint(object.text)}</StyledHighLightText>
                    } else {
                        return <StyledText key={object.time}>{validdateHint(object.text)}</StyledText>
                    }
                })
            }
        </Text>

    </StyldView>
    // return (<StyldView>
    //     <StyledText>{validdateHint(props.hint)}</StyledText>
    // </StyldView>)
}, (prev, next) => prev.hint === next.hint)



const HightLightHint = (text: string) => {
    return <StyledHighLightText>Test</StyledHighLightText>
}
export default Hint