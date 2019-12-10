/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @flow
 */

import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import { FlatList } from 'react-navigation';
import useEffectOnce from 'react-use/lib/useEffectOnce';
import { UserType } from '@store/user/types'
import { getResults } from '@store/user/function';
import { useResults } from '@store/user/hooks';
import BillboardItem from './BillboardItem';
import useAsync from 'react-use/lib/useAsync';
import LoadingComponent from '@/components/Loading/Loading';

const Wrapper = styled(LinearGradient)`
  margin-top: 5px;
  height: 99%;
  width: 96%;
  color: yellow;
  margin : auto;
`;

const StyledBillboardHeader = styled.View`
  flex: 1;
  padding-top: 20px;
  justify-content: center;
  flex-direction: row;

`;

const StyledBillboardContent = styled.ScrollView`
  flex: 2.5;
  padding: 20px ;
`;




const StyledHeaderImage = styled.Image<{ width: number, height: number }>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  margin: 16px;
`




const Billboard = React.memo(() => {

  const mergeResults = useResults()

  const state = useAsync(async () => {
    return await getResults()
  })

  return (
    <Wrapper colors={['#7a7a7a', '#b5b5b5', '#e6e6e6']} locations={[0, 0.3, 0.5]}>
      <StyledBillboardHeader>
        <StyledHeaderImage resizeMode={'contain'} source={require('@/assets/cup.png')} width={64} height={72} />
        <StyledHeaderImage resizeMode={'contain'} source={require('@/assets/cup.png')} width={92} height={112} />
        <StyledHeaderImage resizeMode={'contain'} source={require('@/assets/cup.png')} width={52} height={80} />
      </StyledBillboardHeader>
      {
        state.loading ? <LoadingComponent /> :
          <StyledBillboardContent>
            <FlatList

              data={mergeResults.filter(e => e.user.weleEmail !== 'weenjoylearningenglish@gmail.com')}
              renderItem={({ item, index }) => {

                const user: UserType = item.user
                return <BillboardItem user={user} total={item.total} index={index} />
              }}

              keyExtractor={item => item.user.id}
            />
          </StyledBillboardContent>
      }

    </Wrapper>
  );
})

export default Billboard;
