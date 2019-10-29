import React from 'react'
import styled from 'styled-components/native';
import UserType from 'src/models/User';
import { useSelector } from 'react-redux';

interface Props {

  user: UserType

}


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

const StyledDot = styled.View<{isOnline: boolean}>`
  position: absolute;

  border: 2px solid #fff;
  border-radius: 5px;
  right: 0px; 
  bottom: 0px;
  height: 10px;
  width: 10px;
  background: #4CD964;
`

const UserAvatar = (props: Props) => {

  const isOnline = useSelector((state:any) => (state.user.listUsers.get(props.user.id) as UserType).online) 


  console.log('check isOnline', isOnline)


  return (
    <StyledWrapper>
    <StyledAvatar
      resizeMode={'contain'}
      source={{
        uri: props.user.photoURL,
      }}
    />
    {isOnline && <StyledDot isOnline={isOnline ? isOnline: false}/> } 
    </StyledWrapper>


  )
}


export default UserAvatar