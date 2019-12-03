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
import { NavigationScreenProp, FlatList } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import useEffectOnce from 'react-use/lib/useEffectOnce';
import { listUsers, getResults } from '../redux/actions/userActions';
import UserType from '../models/User';
import UserAvatar from '../components/User/UserAvatar';
import ResultType from 'src/models/Result';
import BillboardItem from '../components/Billboard/BillboardItem';

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




const StyledHeaderImage = styled.Image<{width:number, height:number}>`
  width: ${props  => props.width}px;
  height: ${props => props.height}px;
  margin: 16px;
`



interface Props {
  navigation : NavigationScreenProp<any,any>
}

interface MergeType{
  user: UserType,
  total: number
}

const Billboard = React.memo((props : Props) => {

  const dispatch = useDispatch()

  const results: Map<string,ResultType> = useSelector((state:any) => state.user.listResult);

  const users : Array<UserType> = useSelector(((state:any) => [...state.user.listUsers.values()].reverse()))

  //@ts-ignore
  const mergeResult: MergeType[] = users.map( (user: UserType)=> {
      if(user.weleEmail && results.get(user.weleEmail)){
          return {
            user,
            //@ts-ignore
            total: results.get(user.weleEmail) ? results.get(user.weleEmail).Total : 0 as number
          }
      }else{
        return {
          user,
          total: 0 as number
        }
      }} )
  
  useEffectOnce(()=>{
    dispatch(getResults())
  })
  return (
    <Wrapper colors={['#7a7a7a', '#b5b5b5', '#e6e6e6']} locations={[0,0.3,0.5]}>
        <StyledBillboardHeader>
          <StyledHeaderImage resizeMode={'contain'} source ={ require('../assets/cup.png') } width={64} height={72}/>
          <StyledHeaderImage resizeMode={'contain'} source ={ require('../assets/cup.png') } width={92} height={112}/>
          <StyledHeaderImage resizeMode={'contain'} source ={ require('../assets/cup.png') } width={52} height={80} />
        </StyledBillboardHeader> 
        <StyledBillboardContent>
          <FlatList

            data= {mergeResult.sort((a, b)=> b.total - a.total).filter( e=> e.user.weleEmail !== 'weenjoylearningenglish@gmail.com' )}
            renderItem = {({item , index})=> {  
                        
              const user : UserType = item.user 
              return <BillboardItem user={user} total={item.total} index= {index} />
            }}

            keyExtractor={item => item.user.id}
          />
        </StyledBillboardContent>
    </Wrapper>
  );
})

export default Billboard;
