/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect, useState, useContext } from 'react';
import  useAsync from "react-use/lib/useAsync"; 
import {FlatList } from 'react-native';


//@ts-ignore
import { connect } from "react-redux";

import PodcastItem from './PodcastItem'

import styled from 'styled-components/native';
import {CustomTheme, ThemeMode} from '@store/theme/ThemeWrapper'
import LoadingComponent from '@components/Loading/Loading';
import PodcastType from '@/store/podcast/types';
import { getAllPodcasts } from '@store/podcast/functions';
import { usePodcastList } from '@/store/podcast/hooks';
import { NavigationContext } from 'react-navigation';

const Wrapper = styled.ScrollView<{theme: CustomTheme}>`
  height: 100%;
  width: 100%;
  background-color: ${props=> props.theme.backgroundColor};
`;

const StyledBodyWrapper = styled.View<{theme: CustomTheme}>`
  background-color: ${props=> props.theme.backgroundColor}
  flex: 9;
  align-items: flex-start;
`;


const StyledSection = styled.View`
  width: 100%;
  margin: 0 ;
`;

const StyledSectionTitle = styled.Text<{theme: CustomTheme}>`
  color: ${props=> props.theme.textColorH1};
  font-size: 20px ;
  font-weight: bold ;
  margin: 0px 10px 0px 10px;
  margin-top: 10px; 
`;

const StyledSearchInput = styled.TextInput<{size:'normal'|'big'}>`
  background-color: #737373;
  width: ${props=> props.size === 'big' ? '100%': '80%'};
  height: 32px;
  font-size: 12px;
  padding: 0px 0px 0px 6px;
  margin: 10px 0px 10px 0px;
  border-radius: 5px;
  color: white;
`

const StyledSearchWrapper = styled.View<{theme: CustomTheme}>`
    align-items: flex-start;
    border-bottom-width: 1px;
    border-color: ${props=> props.theme.borderSectionColor}
    margin: 0px 10px 0px 10px;
`

const StyledSectionContent = styled.View``;

const matchSearchString = (searchString:string, podcast: PodcastType )=>{
    const rSearchString = searchString.replace(/\s/g,'').toLowerCase()

    const infoString = `${podcast.source}${podcast.name}${podcast.narrator}`.replace(/\s/g,'').toLowerCase()

    return infoString.indexOf(rSearchString) >= 0 
}

let timer:any = null
const TYPING_TIMEOUT= 1000;

const PodcastList = () => {

  const nav = useContext(NavigationContext)
  const searchText = nav.getParam('search', '')

  useEffect(()=>{
    setSearchString(searchText)
  },[searchText])

  const [startSearch,setStartSearch  ] = useState(false)

  const [searchString, setSearchString ] = useState(searchText)

  const state = useAsync(async ()=>{
    await getAllPodcasts()
  },[])

  const podcastList = usePodcastList()

  let displayData = podcastList
  if(searchString.replace(/\s/g,'').length > 0 ){
    displayData = displayData.filter(data=> matchSearchString(searchString, data))
  }

  const onStartSearchHandle = ()=>{
      setStartSearch(true)

      timer = setTimeout(()=>{
        setStartSearch(false)
        }, TYPING_TIMEOUT)
  }


  const onTextChangeHandler = (value: string)=> {
    setStartSearch(true)
    timer && clearTimeout(timer)
    timer = null
    timer = setTimeout(()=>{
        setStartSearch(false)
    }, TYPING_TIMEOUT)
    setSearchString(value)
  }

  return <React.Fragment>
    { state.loading? 
    (<LoadingComponent/>) : (
    <Wrapper
    keyboardShouldPersistTaps={'always'}
    >
      <StyledBodyWrapper>
        <StyledSection>
          {!startSearch && <StyledSectionTitle >Podcasts</StyledSectionTitle>}
          <StyledSearchWrapper>
              <StyledSearchInput 
              
              size={startSearch? 'big':'normal'}
              onTouchStart = {onStartSearchHandle}
            //   onTouchEnd = {()=> setStartSearch(false)}
              placeholderTextColor={'white'}

              onChangeText={onTextChangeHandler}
              value={searchString}
              placeholder={'Search Podcasts ...'}/>
          </StyledSearchWrapper>
          <StyledSectionContent>
            <FlatList
              data={displayData}
              renderItem={( {item, index } )=><PodcastItem {...item}/> }
              keyExtractor={item => item.id}
            />
          </StyledSectionContent>
        </StyledSection>
        </StyledBodyWrapper>
      </Wrapper>
    )}
  </React.Fragment>
};




export default PodcastList
