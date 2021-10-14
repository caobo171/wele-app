/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import useAsync from "react-use/lib/useAsync";
import { FlatList, Platform } from 'react-native';
import { requestPermissionAndroid } from '@/service/util'
import PodcastThumbnail from './PodcastThumbnail'

import styled from 'styled-components/native';
import LoadingComponent from '@components/Loading/Loading';
import { getPodcastThisWeek, getRecentPodcast } from '@/store/podcast/functions';
import { usePodcastThisWeek, useRecentPodcasts } from '@/store/podcast/hooks';

import { CustomTheme } from '@store/theme/ThemeWrapper'
import useAsyncFn from 'react-use/lib/useAsyncFn';
import StatusBarView from '@/components/UI/StatusbarView';
import Constants, { Code } from '@/Constants';
import Analytics from '@/service/Analytics';
import Fetch from '@/service/Fetch';
import { RawPodcast, RawPodcastSubmit } from '@/store/types';

const Wrapper = styled.ScrollView<{ theme: CustomTheme }>`
  height: 100%;
  width: 100%;
  background-color: ${props => props.theme.backgroundColor}
`;


const StyledBodyWrapper = styled.View`
  background-color: white;
  flex: 9;
  margin-top: 20px;
  align-items: flex-start;
`;


const StyledSection = styled.View<{ theme: CustomTheme }>`
  width: 100%;
  margin: 0 ;
  background-color: ${props => props.theme.backgroundColor}
`;

const StyledSectionTitle = styled.Text<{ position: 'top' | 'normal', theme: CustomTheme }>`
  color: ${props => props.theme.textColorH1}
  font-size: ${props => props.position === 'top' ? `${Constants.TITLE_FONTSIZE + 4}px` : `${Constants.TITLE_FONTSIZE}px`} ;
  font-weight: ${props => props.position === 'top' ? '600' : '700'} ;
  padding-bottom: 16px;
  margin: ${props => props.position === 'top' ? '-4px' : '28px'} 10px 0px 10px; 
  border-bottom-width: 1px;
  border-color: ${props => props.theme.borderSectionColor}
  background-color: ${props => props.theme.backgroundColor}
`;

const StyledSectionContent = styled.View``;

type ResponseType = {
	all_podcasts: RawPodcast[],
	recent_podcasts: RawPodcast[],
	new_podcasts: RawPodcast[],
	podcast_submits: RawPodcastSubmit[]
	code: number
}

const Home = () => {

	const state = useAsync(async () => {


		Platform.OS === 'android' && requestPermissionAndroid()
		Analytics.trackScreenView('Billboard');
		// await getPodcastThisWeek()
		// await getRecentPodcast()

		const res = await Fetch.postWithAccessToken<ResponseType>('/api/podcasts/home', {});
		if (res.status == 200) {
			if (res.data && res.data.code == Code.SUCCESS) {
				return {
					all_podcasts: res.data.all_podcasts,
					recent_podcasts: res.data.recent_podcasts,
					new_podcasts: res.data.new_podcasts,
					podcast_submits: res.data.podcast_submits
				}
			}
		}

		return {
			all_podcasts: [],
			recent_podcasts: [],
			new_podcasts: [],
			podcast_submits: []
		}
	}, [])


	// const podcastThisWeek = usePodcastThisWeek()
	// const recentPodcasts = useRecentPodcasts()

	return <>
		{state.loading ?
			(<LoadingComponent />) : (
				<Wrapper
					keyboardShouldPersistTaps={'always'}
				>
					<StatusBarView />

					<StyledBodyWrapper>
						<PodcastsThisWeek podcasts={state.value.new_podcasts} />
						<RecentPodcast podcasts={state.value.recent_podcasts} />
					</StyledBodyWrapper>
				</Wrapper>
			)}
	</>
};


interface PodcastsProps {
	podcasts: RawPodcast[]
}

const renderItem = ({ item }) => <PodcastThumbnail {...item} />

const PodcastsThisWeek = React.memo((props: PodcastsProps) => {

	const onRefreshHandle = () => {
		return getRecentPodcast()
	}
	const [state, fetch] = useAsyncFn(onRefreshHandle)



	return <StyledSection>
		<StyledSectionTitle position="top">Newest Podcasts</StyledSectionTitle>
		<StyledSectionContent>
			<FlatList
				refreshing={state.loading}
				onRefresh={fetch}
				data={props.podcasts}
				renderItem={renderItem}
				keyExtractor={item => item.id}
			/>
		</StyledSectionContent>
	</StyledSection>
}, (prev, next) => prev.podcasts === next.podcasts)


const RecentPodcast = React.memo((props: PodcastsProps) => {
	return <StyledSection>
		{props.podcasts.length > 0 && <StyledSectionTitle position="normal">Recently Played</StyledSectionTitle>}
		<StyledSectionContent>
			<FlatList
				data={props.podcasts}
				renderItem={renderItem}
				keyExtractor={item => item.id}
			/>
		</StyledSectionContent>
	</StyledSection>
}, (prev, next) => prev.podcasts === next.podcasts)



export default Home
