import React from 'react'
import styled from 'styled-components/native';
import { CustomTheme, ThemeMode } from '@store/theme/ThemeWrapper'

const StyledSectionTitle = styled.Text<{ theme: CustomTheme }>`
  color: ${props => props.theme.textColorH1};
  font-size: 20px ;
  font-weight: bold ;
  margin: 0px 10px 0px 10px;
  margin-top: 10px; 
`;

const StyledSearchInput = styled.TextInput<{ size: 'normal' | 'big' }>`
  background-color: #737373;
  width: ${props => props.size === 'big' ? '100%' : '80%'};
  height: 32px;
  font-size: 12px;
  padding: 0px 0px 0px 6px;
  margin: 10px 0px 10px 0px;
  border-radius: 5px;
  color: white;
`

const StyledSearchWrapper = styled.View<{ theme: CustomTheme }>`
    align-items: flex-start;
    border-bottom-width: 1px;
    border-color: ${props => props.theme.borderSectionColor}
    margin: 0px 10px 0px 10px;
`


interface Props {
    startSearch: boolean,
    searchString: string,
    onStartSearchHandle: () => void,
    onTextChangeHandler: (text: string) => void
}
const SearchBox = React.memo((props: Props) => {
    return (<React.Fragment>
        {!props.startSearch && <StyledSectionTitle >Podcasts</StyledSectionTitle>}
        <StyledSearchWrapper>
            <StyledSearchInput

                size={props.startSearch ? 'big' : 'normal'}
                onTouchStart={props.onStartSearchHandle}
                placeholderTextColor={'white'}
                onChangeText={props.onTextChangeHandler}
                value={props.searchString}
                placeholder={'Search Podcasts ...'} />
        </StyledSearchWrapper>
    </React.Fragment>)
}, (prev, next) => prev.searchString === next.searchString &&
    prev.startSearch === next.startSearch)


export default SearchBox