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
import useAsync from 'react-use/lib/useAsync';
import useThrottle from 'react-use/lib/useThrottle';
import Fetch from '@/service/Fetch';
import { Code } from '@/Constants';
import { RawPodcastSubmit, RawPodcast } from '@/store/types';

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


let timer: any = null
const TYPING_TIMEOUT = 1000;

type ResponseType = {
	podcasts: RawPodcast[],
	podcast_num: number,
	code: number,
	podcast_submits: RawPodcastSubmit[]
}

const PodcastList = () => {

	const [podcasts, setPodcasts] = useState<RawPodcast[]>([]);
	const nav = useContext(NavigationContext)
	const searchText = nav.getParam('search', '');
	useEffectOnce(() => {
		Analytics.trackScreenView('PodcastList');
	})

	useEffect(() => {
		setSearchString(searchText)
	}, [searchText])

	const [startSearch, setStartSearch] = useState(false)

	const [searchString, setSearchString] = useState(searchText)

	const throttle_search = useThrottle(() => searchString, 500);
	const state = useAsync(async () => {
		const res = await Fetch.postWithAccessToken<ResponseType>('/api/podcasts/list', {
			q: throttle_search,
			page_size: 30
		});

		if (res.status == 200) {
			if (res.data && res.data.code == Code.SUCCESS) {
				return {
					podcasts: res.data.podcasts,
					podcast_num: res.data.podcast_num,
					podcast_submits: res.data.podcast_submits
				}
			}
		}

		return {
			podcasts: [],
			podcast_num: 0,
			podcast_submits: []
		}
	}, [throttle_search]);

	useEffect(() => {
		if (state.value) {
			setPodcasts(state.value.podcasts)
		}
	}, [state])

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
				<StatusBarView />
				<StyledBodyWrapper>
					<StyledSection>
						<SearchBox
							searchString={searchString}
							startSearch={startSearch}
							onStartSearchHandle={onStartSearchHandle}
							onTextChangeHandler={onTextChangeHandler}
						/>
						<PodcastListMemo podcasts={podcasts} />
					</StyledSection>
				</StyledBodyWrapper>
			</Wrapper>
		)}
	</React.Fragment>
};

interface Props {
	podcasts: RawPodcast[]
}

const ITEM_HEIGHT = 64;

const PodcastListMemo = React.memo((props: Props) => {

	const getItemLayout = useCallback((data, index) => (
		{ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index })

		, [])

	const renderItem = useCallback(({ item, index }) => {
		return <PodcastItem {...item} />
	}, [])

	return (
		<StyledSectionContent>
			<FlatList
				data={props.podcasts}
				getItemLayout={getItemLayout}
				renderItem={renderItem}
				keyExtractor={item => item.id.toString()}
			/>
		</StyledSectionContent>
	)
},
	(prev, next) => prev.podcasts === next.podcasts)


export default PodcastList
