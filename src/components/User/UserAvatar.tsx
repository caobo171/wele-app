import React from 'react'
import styled from 'styled-components/native';
import UserType from 'src/models/User';
import { useSelector } from 'react-redux';

interface Props {

  user: UserType | null 

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

const DEFAUTL_IMAGE = "https://image.flaticon.com/icons/png/512/17/17004.png"
const UserAvatar = (props: Props) => {

  //@ts-ignore
  const user = useSelector((state:any) => (state.user.listUsers.get(props.user? props.user.id : '-1') ))


  return (
    <StyledWrapper>
    <StyledAvatar
      resizeMode={'contain'}
      source={{
        uri: props.user ?  props.user.photoURL : DEFAUTL_IMAGE
      }}
    />
    {user && user.online && <StyledDot isOnline={user.online ? user.online: false}/> } 
    </StyledWrapper>


  )
}


export default UserAvatar