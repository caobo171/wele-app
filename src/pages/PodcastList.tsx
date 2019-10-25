/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect, useState } from 'react';
//@ts-ignore
import FeatherIcon from 'react-native-vector-icons/Feather';
import  useAsync from "react-use/lib/useAsync"; 
import { View , TouchableOpacity, FlatList } from 'react-native';


//@ts-ignore
import { connect } from "react-redux";

import PodcastItem from '../components/Podcast/PodcastItem'
import { getPodcastList } from '../redux/actions/podcastActions'

import styled from 'styled-components/native';
import LoadingComponent from '../components/Loading/Loading';
import { NavigationScreenProp } from 'react-navigation';
import PodcastType from 'src/models/Podcast';

const Wrapper = styled.ScrollView`
  height: 100%;
  width: 100%;
  color: yellow;
`;

const StyledBodyWrapper = styled.View`
  background-color: white;
  flex: 9;
  align-items: flex-start;
`;


const StyledSection = styled.View`
  width: 100%;
  margin: 0 ;
  background-color: white;
`;

const StyledSectionTitle = styled.Text`
  color: black;
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

const StyledSearchWrapper = styled.View`
    align-items: flex-start;
    border-bottom-width: 1px;
    border-color: #d4d4d4;
    margin: 0px 10px 0px 10px;
`

const StyledSectionContent = styled.View``;


interface Props {
  getPodcastList : ()=> void,
  navigation : NavigationScreenProp<any,any>,
  listPodcasts: Array<PodcastType>,
}

const matchSearchString = (searchString:string, podcast: PodcastType )=>{
    const rSearchString = searchString.replace(/\s/g,'').toLowerCase()

    const infoString = `${podcast.source}${podcast.name}${podcast.narrator}`.replace(/\s/g,'').toLowerCase()

    return infoString.indexOf(rSearchString) >= 0 
}

let timer:any = null
const TYPING_TIMEOUT= 1000;

const PodcastList = (props: Props) => {

  const [startSearch,setStartSearch  ] = useState(false)

  const [searchString, setSearchString ] = useState('')

  const state = useAsync(async ()=>{
    await props.getPodcastList()
  },[])

  let displayData = props.listPodcasts
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
              renderItem={( {item, index } )=><PodcastItem {...item} {...props}/> }
              keyExtractor={item => item.id}
            />
          </StyledSectionContent>
        </StyledSection>
        </StyledBodyWrapper>
      </Wrapper>
    )}
  </React.Fragment>
};

function mapStateToProps (state: any) {
  return {
    listPodcasts: [...state.podcast.listPodcast.values()],
  }
}



function mapDispatchToProps (dispatch: any) {
  return {
    getPodcastList: ()=> dispatch(getPodcastList()),
  }
}



export default connect(mapStateToProps,mapDispatchToProps )(PodcastList)
