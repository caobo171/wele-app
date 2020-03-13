import React, { useCallback } from 'react'
import styled from 'styled-components/native';
import { UserType } from '@store/user/types';
import { useSelector } from 'react-redux';



const StyledAvatar = styled.Image`
  height: 36px;
  width: 36px;
  border-radius: 50;

`;

const StyledWrapper = styled.View`
  height: 36px;
  width: 36px;
  position: relative;
`

const StyledDot = styled.View<{ isOnline: boolean }>`
  position: absolute;

  border: 2px solid #fff;
  border-radius: 5px;
  right: 0px; 
  bottom: 0px;
  height: 10px;
  width: 10px;
  background: #4CD964;
`

interface Props {
  user: UserType | null,
  index? : number
}

const IMAGES = [
  require('@/assets/deadpool.jpeg'),
  require('@/assets/ironman.jpeg'),
  require('@/assets/thor.jpeg'),
  require('@/assets/wolf.jpeg')
]



const UserAvatar = React.memo((props: Props) => {

  //@ts-ignore
  const user = useSelector((state: any) => (state.user.listUsers.get(props.user ? props.user.id : '-1')))

  const renderAvatar = useCallback(()=>{
    if(props.user && props.user.photoURL && props.user.id !== '-1') {
      return (<StyledAvatar
      resizeMode={'contain'}
      source={{
        uri: props.user.photoURL
      }}
    />)
    }else{
      return (<StyledAvatar
        resizeMode={'contain'}
        source={IMAGES[props.index? props.index % 4: 0]}
      />)
    }
  },[props.index, props.user])

  return (
    <StyledWrapper>
      {renderAvatar()}
      {user && user.online && <StyledDot isOnline={user.online ? user.online : false} />}
    </StyledWrapper>
  )
})


export default UserAvatar