/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @flow
 */

import React, { useContext } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import { FlatList } from 'react-navigation';
import { CustomTheme, ThemeMode } from '@store/theme/ThemeWrapper'
import { UserType, MergeResultsType } from '@store/user/types'
import { useResults, useResultsMonthly, useUsers } from '@store/user/hooks';
import BillboardItem from './BillboardItem';

const StyledBillboardContent = styled.View`
  flex: 2.5;
  padding: 20px ;
`;

const StyledHeader = styled.Text<{theme: CustomTheme}>`
   margin-left: auto;
   margin-right: auto;
   font-weight:bold;
   font-size: 28px;
   margin-bottom: 12px;
   color: ${props=> props.theme.textColorH1};
`




const BillboardMonthly = React.memo(() => {

    const results = useResultsMonthly()
    return (
        <BillboardMontlyMemo results={results}/>
    )
})

const renderItem = ({ item, index }) => {
    const user: UserType = item.user
    return <BillboardItem user={user} total={item.total} index={index} />
}

const renderKey  = item => item.user.email

const ITEM_HEIGHT = 58;
const getItemLayout= (data, index) => (
  {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
)

interface Props{
    results: MergeResultsType[]
}
const BillboardMontlyMemo = React.memo(({results}:Props)=>{
    return (
        <StyledBillboardContent>
        <StyledHeader>Heroes This Month</StyledHeader>
        <FlatList

            data={results}
            renderItem={renderItem}
            keyExtractor={renderKey}
            getItemLayout={getItemLayout}
        />
    </StyledBillboardContent>
    )
},(next, prev)=> next.results.length === prev.results.length)


export default BillboardMonthly;
