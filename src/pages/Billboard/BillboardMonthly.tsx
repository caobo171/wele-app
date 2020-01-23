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

const StyledBillboardContent = styled.ScrollView`
  flex: 2.5;
  padding: 20px ;
`;



const BillboardMonthly = React.memo(() => {

    const results = useResultsMonthly()

    return (
        <BillboardMontlyMemo results={results}/>
    )
})

interface Props{
    results: MergeResultsType[]
}
const BillboardMontlyMemo = React.memo(({results}:Props)=>{
    return (
        <StyledBillboardContent>
        <FlatList

            data={results}
            renderItem={({ item, index }) => {

                const user: UserType = item.user
                return <BillboardItem user={user} total={item.total} index={index} />
            }}

            keyExtractor={item => item.user.email}
        />
    </StyledBillboardContent>
    )
},(next, prev)=> next.results.length === prev.results.length)


export default BillboardMonthly;
