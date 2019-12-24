import React from 'react'

import styled from 'styled-components/native'
import { UserType } from '@/store/user/types'
import { ThemeMode, CustomTheme } from '@/store/theme/ThemeWrapper';
import { useCurrentUser } from '@/store/user/hooks';

const StyledSection = styled.View`
  width: 100%;
  margin: 0 ;
`;


const StyledSectionContent = styled.View``;

const StyledUserWrapper = styled.View<{ size: 'big' | 'medium' | 'small' }>`
  width: 100%;
  flex-direction: column;
  border-style: solid;
  border-color: #d4d4d4;
  padding: 10px 10px 10px 10px;
`;


const StyledPodcastImage = styled.Image`
  height: 100;
  width: 100;
  border-radius: 70;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
`;

const StyledName = styled.Text<{ theme: CustomTheme }>`
  width: 100%;
  text-align: center;
  font-size: 20px;
  letter-spacing: 3px;
  font-weight: 800; 
  color: ${props => props.theme.textColorH1};
`
const StyledEmail = styled.Text<{ theme: CustomTheme }>`
  width: 100%;
  text-align: center;
  font-size: 18px;
  letter-spacing: 1px;
  font-weight: 700; 
  color: ${props => props.theme.textColorH2};
`
interface Props {
  user: UserType
}

const UserInfo = React.memo((props: Props) => {
  const currentUser = useCurrentUser()


  return (
    <UserInfoMemo user={props.user} currentUser={currentUser} />
  )
}, (prev, next) => prev.user.id === next.user.id)

interface PropsMemo extends Props {
  currentUser: UserType
}
const UserInfoMemo = React.memo((props: PropsMemo) => {
  return (
    <StyledSection>

      <StyledSectionContent>
        <StyledUserWrapper size="big" >
          <StyledPodcastImage
            resizeMode={"contain"}
            source={{ uri: props.user.photoURL }}
          />
          <StyledName>
            {props.user.displayName}
          </StyledName>
          {
            props.currentUser.id === props.user.id &&
            <StyledEmail>
              ( {props.user.weleEmail ? props.user.weleEmail : `You dont' have WELE Email`} )
            </StyledEmail>
          }

        </StyledUserWrapper>
      </StyledSectionContent>
    </StyledSection>
  )
}, (prev, next) => prev.user.id === next.user.id && prev.currentUser.id === next.currentUser.id)
export default UserInfo