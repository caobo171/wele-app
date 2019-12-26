import React from 'react'
import styled from 'styled-components/native'
import { CustomTheme, ThemeMode } from '@store/theme/ThemeWrapper'
import { usePlayer } from '@/store/player/hooks'
import { Text } from 'react-native'

const StyledView = styled.ScrollView<{ theme: CustomTheme }>`
    background-color: ${props => props.theme.backgroundColor};
    width: 100%;

`

const StyledText = styled.Text<{ theme: CustomTheme }>`
    margin-top: 16px;
    font-size:  15px;
    margin-bottom: 32px;
    color: ${props => props.theme.textColorH1};
`

const StyledTextWrapper = styled.Text`
    margin-bottom: 20px;
    padding: 10px;
`


const StyledHighLightText = styled.Text<{ theme: CustomTheme }>`
    color: ${props => props.theme.name === 'light' ? '#69acff' : '#afbf45'};
    font-size: 18px;
    font-weight: 700;
`;

interface Props {
    hint: string | undefined
}

// const exampleText = `------- -- Spotlight --- --- ----- --- I’m ------ ---- [10]Spotlight ---- - special English method of [15]broadcasting -- -- ------ --- people to ----------- [20]-- ------ where -- --- ----- they ----- Above ---- --- --- -- [40]---- -- ---- deeply --- [45]--------- towards anyone -------- -- the [635]------ [50]---- -- --- ---- beautiful quality in - revolutionary These [60]----- --- from - ------ ------- -- --- -------- [65]-- ----- this ------ to his -------- ------ -- died --- Guevara --- - -------- --- [75]famous ----- -------- -------------- -- ------ to ------ -- -- ----------- governments --- change [85]social systems -- ------ --- the ------ -- --- ---------- ---- ------ greatly ------- --- work of Che [95]--- ----- ------ hate him [100]Today’s --------- is on --- Guevara [110]------- Che [115]------- [225]--- ---- -- --------- -- [120]----- --- ------ --- ----- --- wealthy [125]-- had a ---- ---------- --- -- grew up reading ---- [130]------ --- enjoyed ---- ----- -- ----- - [135]------- philosophy fiction [140]and --------- writing ----- ----- shaped his [145]ideas about --- world ---- ---- encouraged him [150]-- ---- --- ---- he believed --- ----- and just In ---- Che started [160]------- ------ -- ------ ------ ---------- He --- [165]-------- -- become - ------- ------ his -------- Che left --- one year -- travel ------- ----- -------- He --- --- ------ - ------ Granado -------- ----- kilometers total [185]---- trip --- ---- --------- --- ----- Che In ----- -- later -- --- - ---- called [195]Motorcycle Diaries about ---- time -- [200]---- trip --- --- ---- things ---- ------- ---- -- - -------- --- 
// visited a copper ---- in ------ --- -------- ---------- [305]---- --------- [215]---- ---- forced to work long ---- ----- [220]for ------ ---- --- ---- was ---------- And ---- -- --- ------- became ---- from --- ---------- -- --- ------ --- also ------- [235]the ------ ruins of ----- ------ -- ----- [240]---- in --- Andes ---------- -- --- ---- --- - -------- [245]These ------- ------ the ---- -- ---- ---- [250]owners They --- to --- the landowners to ---- the [255]- ---- --- ---- ---- ------ ----- --- ----- ---- work ---- the --- of --- trip --- [265]and Alberto visited San Pablo leper ------ in ----- [270]--- ------ --- ----- in this ---- [275]--- --- disease -------- ------- ------ [280]-- 
// this town feared ------- the -------- [285]--- they ------ --- people ---- ------- -- ---- ---- from town - -- [720]the --- -- ------- ----- ------- [295]at the leper colony --- [300]----- -- ---------- [5]--- --- ------ were pushed ---- ---- ------ -- They ---- forced -- ---- -- ------- - they had ------ -------- ---- [315]-- --------- --- lepers --- - --------- ---- - --- --- --- --- love --- ------- they had --- each ------ Che [330]---------- ---- ---------- --- many ------ -- --- -- [335]9 month trip -- saw [340]many people ---- ------- had ---------- This [345]trip ---- --- ------- ---- he ------ - - ---- make - ------ [350]for --- -- ----- -------- -- ----- [355]---- he --- --- ------- 
// as A ------- [360]-- --- ------- -------- -- - ------ --- same miseries&quot; [370]----- ---- trip --- -------- -- ------ ------ -- -------- [380]his --------- and ------ - - ------ [385]---- after -- ------- -- ---- --- ---- --- --------- - --- not ---- -- a ------- In ----- Che met ----- and - --- Castro [400]in ------ ----- ----- --- were [410]political ---------------- ---- were -------- -- --------- ------ --- -- -------- -- ----- ---- were --------- [420]or 
// Communists ---- ------ a new ---------- [425]---- ---- -------- equal money --------- land --- education --- [780]------ with --- [730]--------- [435]---- idea -- equality --- --- people - [440]-- he decided -- ---- them -- ----- ---- --- Castros and a ----- -- [450]------ ------ -- ----- ---- attacked the Cuban --------- Their ------- -- ------ the [460]government ------- And ---- -- --- ------ ---- ------- --- ------ this ------- --- ----------- -- --------- ------- -- - ------- [475]Che’s job --- -- care --- ------- --------- [480]------ --- attack many -- his friends ---- ----- [485]------ were -------- -- --- -- he ----- -- ---- his friends -------- -- - --- ---- --- ------- supplies [495]and reached --- a ---- ---- act --- [470]an [500]--------- ------ --- ---- It ----------- - - ----- [505]-- --- ----- -- --- not a ------ ---- He [445]--- - ------- --- a -------------- After ---- ----------- --- ------ ---- -------- [520]-- became - ---- ------ --- hard ------- [525]-- ------- --- --- -- ------ --- rules [530]If they --- ---- -- treated ---- ------ [535]-------- many men ---- ----- ------- -- ------ Che His ----- ----- -------- --- [545]---- --- all ------ ---- --------- [550]In 1958 --- and a ------ ----- -- ------ ----- -------- --- ----- ----------- ---- ----- ---- [560]-- -- successful --- ------ a ----- ------- [565]and - leader -- --- --- ----------- During --- ------ 
// -- [570]----------- --- ------ [170]his ------- ----- --- [465]--- [640]--- ---- ------ -- --- political -------- [580]Instead he let angry crowds ------ - ------ the enemies [585]----- ---- -- ---- ---- people ---- -------- [590]---- no ------ to ------ ----------- ----- [205]--- ---- [595]------- --- --- Cuban government ---- ------- -- [600]--- --- land Then they gave ----- ----- -- ---- -- ---- -- ------ [605]---- ------- ---- ------- landowners Che [610]---- 
// --------- --- year of [615]---------- -- 1961 -- -------- --- [620]--- -- teachers And [705]-- ---- ---- to poor [625]------- ----- to ------ ---- ------ [630]--- had never had -- --------- -- ----- to ----- After ---- this --- ----- 
// --- ---- Cubans could ----- [655]For ---- ----- ----- this revolution --- -------- ------ the world - in ----- -------- ------ [665]--- ----- He ------- politicians --- world -------- [670]-- helped ----- groups in other countries who [675]---- ------ a Marxist ----------- Che [680]also --- ---- enemies around --- world --- ---- ----- ------ -- ------ ---- ----- from ------------ [690]--- ---- --- ------- in countries [695]---- ---------- ------- did not like this Some ------- ---- ------ --- ----- -- ----- --- ---- -- Bolivia [710]-- ----- -- ----- - ---------- there [715]However -- had little ------- ---- --- Bolivian ------- The -- -------- ------ --- Che’s ------- ----- him --- was -------- --- ------ -- ------- ---- 1967 ------ --- ------- -- [750]loved -- [700]---- ------- They --- --- [175]-- [755]------- who [210]------ --- --- ----- ---- -------- --- [760]as - ---- and loving healer [765]-------- [320]---- ----- ------ remember --- -- - [770]------- ---- ---- cannot ------ --- ----------- [775]Many other people -- --- agree with --- --------- ------ However -- matter ---- people ----- -- Che ------- - everyone ------ that -- ------- history and [795]Latin ------- forever! [805]--- ------ of ---- program was ---- --- [810]------ --- -------- was Michio ------ [815]--- ------ ---- adapted and voiced by ---------- [325]--- --- ---- --- programs -- --- -------- -- wwwradioenglishnet This program [830]-- ------ ------- -- --------- We ---- you --- ---- -- [390]----- --- the next --------- -------- --------`



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


    const hintObjects = transformText(props.hint)

    console.log(hintObjects)

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