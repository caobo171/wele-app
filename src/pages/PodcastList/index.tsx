/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect, useState, useContext, useCallback } from 'react';
import { FlatList } from 'react-native';

import PodcastItem from './PodcastItem'

import styled from 'styled-components/native';
import { CustomTheme, ThemeMode } from '@store/theme/ThemeWrapper'
import PodcastType from '@/store/podcast/types';
import { usePodcastList } from '@/store/podcast/hooks';
import { NavigationContext } from 'react-navigation';
import SearchBox from './Searchbox';
import StatusBarView from '@/components/UI/StatusbarView';
import useEffectOnce from 'react-use/lib/useEffectOnce';
import Analytics from '@/service/Analytics';

const Wrapper = styled.ScrollView<{ theme: CustomTheme }>`
  height: 100%;
  width: 100%;
  background-color: ${props => props.theme.backgroundColor};
`;

const StyledBodyWrapper = styled.View<{ theme: CustomTheme }>`
  background-color: ${props => props.theme.backgroundColor}
  flex: 9;
  align-items: flex-start;
`;


const StyledSection = styled.View`
  width: 100%;
  margin: 0 ;
`;


const StyledSectionContent = styled.View``;

const matchSearchString = (searchString: string, podcast: PodcastType) => {
  const rSearchString = searchString.replace(/\s/g, '').toLowerCase()

  const infoString = `${podcast.source}${podcast.name}${podcast.narrator}`.replace(/\s/g, '').toLowerCase()

  return infoString.indexOf(rSearchString) >= 0
}

let timer: any = null
const TYPING_TIMEOUT = 1000;

const PodcastList = () => {

  const nav = useContext(NavigationContext)
  const searchText = nav.getParam('search', '')

  useEffectOnce(()=>{
    Analytics.trackScreenView('PodcastList');
  })

  useEffect(() => {
    setSearchString(searchText)
  }, [searchText])

  const [startSearch, setStartSearch] = useState(false)

  const [searchString, setSearchString] = useState(searchText)


  const podcastList = usePodcastList()

  let displayData = podcastList
  if (searchString.replace(/\s/g, '').length > 0) {
    displayData = displayData.filter(data => matchSearchString(searchString, data))
  }

  const onStartSearchHandle = useCallback(() => {
    setStartSearch(true)
    timer = setTimeout(() => {
      setStartSearch(false)
    }, TYPING_TIMEOUT)
  }, [startSearch])

  const onTextChangeHandler = useCallback((value: string) => {
    setStartSearch(true)
    timer && clearTimeout(timer)
    timer = null
    timer = setTimeout(() => {
      setStartSearch(false)
    }, TYPING_TIMEOUT)
    setSearchString(value)
  }, [searchString, startSearch])

  return <React.Fragment>
    {(
      <Wrapper
        keyboardShouldPersistTaps={'always'}
      >
        <StatusBarView/>
        <StyledBodyWrapper>
          <StyledSection>
            <SearchBox
              searchString={searchString}
              startSearch={startSearch}
              onStartSearchHandle={onStartSearchHandle}
              onTextChangeHandler={onTextChangeHandler}
            />
            <PodcastListMemo podcasts={displayData}/>
          </StyledSection>
        </StyledBodyWrapper>
      </Wrapper>
    )}
  </React.Fragment>
};

interface Props {
  podcasts: PodcastType[]
}

const ITEM_HEIGHT = 64;

const PodcastListMemo = React.memo((props: Props) => {

  const getItemLayout = useCallback((data, index)=>(
    {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index})
    
  , [])

  const renderItem = useCallback(({ item, index })=>{
    return <PodcastItem {...item} />
  },[])

  return (
    <StyledSectionContent>
      <FlatList
        data={props.podcasts}
        getItemLayout = {getItemLayout}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </StyledSectionContent>
  )
},
  (prev, next) => prev.podcasts === next.podcasts)


export default PodcastList
