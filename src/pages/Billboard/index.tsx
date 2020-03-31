/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @flow
 */

import React, { useContext, useMemo } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import { FlatList } from 'react-navigation';
import { CustomTheme, ThemeMode } from '@store/theme/ThemeWrapper'
import { UserType, MergeResultsType } from '@store/user/types'
import { useResults } from '@store/user/hooks';
import BillboardItem from './BillboardItem';
import { useTheme } from '@/store/theme/hook';
import Swiper from 'react-native-swiper'
import BillboardMonthly from './BillboardMonthly';
import { Dimensions } from 'react-native';
import StatusBarView from '@/components/UI/StatusbarView';
import Constants from '@/Constants';
import useEffectOnce from 'react-use/lib/useEffectOnce';
import Analytics from '@/service/Analytics';

const Wrapper = styled(LinearGradient) <{ theme: CustomTheme }>`
  width: 100%;
  height: 100%;
  color: yellow;
  margin : auto;
  background-color: ${props => props.theme.backgroundColor};
`;

const StyledBillboardHeader = styled.View`
  height: ${Dimensions.get('window').height* 1 / 4.5}
  padding-top: 20px;
  justify-content: center;
  flex-direction: row;

`;

const StyledBillboardContent = styled.View`
  flex: 2.5;
  padding: 20px ;
`;




const StyledHeaderImage = styled.Image<{ width: number, height: number }>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  margin: 16px;
`

const StyledHeader = styled.Text<{theme:CustomTheme}>`
   margin-left: auto;
   margin-right: auto;
   font-weight:bold;
   font-size: ${Constants.BILLBOARD_FONTSIZE}px;
   margin-bottom: 12px;
   color: ${props=> props.theme.textColorH1};
`



const Billboard = React.memo(() => {

  useEffectOnce(()=>{
      Analytics.trackScreenView('Billboard');
  })

  const mergeResults = useResults()

  const theme = useTheme()


  return <BillboardMemo mergeResults={mergeResults} theme={theme} />
})

interface Props {
  theme: ThemeMode,
  mergeResults: MergeResultsType[]
}


const renderItem = ({ item, index }) => {

  const user: UserType = item.user
  return <BillboardItem user={user} total={item.total} index={index} />
}

const ITEM_HEIGHT = 58;
const getItemLayout= (data, index) => (
  {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
)



const BillboardMemo = React.memo((props: Props) => {
  const gradient = props.theme === ThemeMode.LIGHT ? {
    colors: ['#7a7a7a', '#b5b5b5', '#e6e6e6'],
    locations: [0, 0.3, 0.5]
  } : {
      colors: ['#787878', '#333333', '#000000'],
      locations: [0, 0.2, 0.5]
    }

  

  const data = useMemo(()=> props.mergeResults.filter(e => e.user.weleEmail !== 'weenjoylearningenglish@gmail.com'),[props.mergeResults])
  return (
    <Wrapper colors={gradient.colors} locations={gradient.locations}>
      <StatusBarView/>
      <StyledBillboardHeader>
        <StyledHeaderImage resizeMode={'contain'} source={require('@/assets/cup.png')} width={64} height={72} />
        <StyledHeaderImage resizeMode={'contain'} source={require('@/assets/cup.png')} width={92} height={112} />
        <StyledHeaderImage resizeMode={'contain'} source={require('@/assets/cup.png')} width={52} height={80} />
      </StyledBillboardHeader>

      <Swiper 
      loop={false}
      style = {{
        height: Dimensions.get('window').height* 2.5 / 3.5
      }}>
         <BillboardMonthly/>
        <StyledBillboardContent>
          <StyledHeader>
             Billboard
          </StyledHeader>
          <FlatList

            data={data}
            renderItem={renderItem}
            getItemLayout = {getItemLayout}
            keyExtractor={item => item.user.id}
          />
        </StyledBillboardContent>

       
      </Swiper>

    </Wrapper>
  )
}, (prev, next) => prev.theme === next.theme && prev.mergeResults === next.mergeResults)


//@ts-ignore
Billboard.navigationOptions = {
  header: null
};


export default Billboard;
