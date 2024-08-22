import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  View
} from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Swiper from 'react-native-swiper'
import Slide from '../components/Slide'
import Poster from '../components/Poster'
import HMedia from '../components/HMedia'
import VMedia from '../components/VMedia'
import { QueryClient, useQuery, useQueryClient } from 'react-query'
import { moviesApi } from '../api'

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.mainBgColor};
`

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

const ListTitle = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-left: 30px;
`

const TrendingScroll = styled.FlatList`
  margin-top: 20px;
`

const ListContainer = styled.View`
  margin-bottom: 40px;
`

const ComingSoonTitle = styled(ListTitle)`
  margin-vertical: 20px;
`

const VSeparator = styled.View`
  width: 20px;
`
const HSeparator = styled.View`
  height: 20px;
`

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({
  navigation
}) => {
  const queryClient = useQueryClient() // QueryClient가 대빵임.
  const {
    isLoading: nowPlayingLoading,
    error: nowPlayingError,
    data: nowPlayingData,
    isRefetching: isRefetchingNotPlaying
  } = useQuery(['movies', 'nowPlaying'], moviesApi.nowPlaying) // 첫번쨰 인자는 키로, 캐싱하는 데이터의 이름이다. 이는 다음에 다시 fetch 하지 않겠다는 뜻.
  const {
    isLoading: upcomingLoading,
    error: upcomingError,
    data: upcomingData,
    isRefetching: isRefetchingUpcoming
  } = useQuery(['movies', 'upcoming'], moviesApi.upcoming)
  const {
    isLoading: trendingLoading,
    error: trendingError,
    data: trendingData,
    isRefetching: isRefetchingTrending
  } = useQuery(['movies', 'trending'], moviesApi.trending)
  const onRefresh = async () => {
    queryClient.refetchQueries(['movies']) // movies 카테고리 전체를 refetch 한다.
  }

  const renderVMedia = ({ item }) => (
    <VMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      voteAverage={item.vote_average}
    />
  )

  const renderHMedia = ({ item }) => (
    <HMedia
      key={item.id}
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      overview={item.overview}
      releaseDate={item.release_date}
    />
  )

  const movieKeyExtractor = item => item.id + ''
  const loading = nowPlayingLoading || upcomingLoading || trendingLoading
  const refreshing =
    isRefetchingNotPlaying || isRefetchingUpcoming || isRefetchingTrending
  console.log('refresh', refreshing)
  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <FlatList
      data={upcomingData.results}
      keyExtractor={movieKeyExtractor}
      ItemSeparatorComponent={HSeparator}
      renderItem={renderHMedia}
      ListHeaderComponent={
        // FlatList 위 (가로 flatlist, title 등 전부)를 모두 포괄하면 됨.
        <>
          {/* Now plaing */}
          <Swiper
            horizontal
            showsButtons={false}
            autoplayTimeout={3.5}
            loop
            autoplay
            showsPagination={false}
            containerStyle={{
              marginBottom: 30,
              width: '100%',
              height: SCREEN_HEIGHT / 4
            }}
          >
            {nowPlayingData.results.map(movie => (
              <Slide
                key={movie.id}
                backdrop_path={movie.backdrop_path}
                poster_path={movie.poster_path}
                original_title={movie.original_title}
                vote_average={movie.vote_average}
                overview={movie.overview}
              />
            ))}
          </Swiper>
          {/* Trending */}
          <ListTitle>Trending movies</ListTitle>
          <TrendingScroll
            data={trendingData.results}
            horizontal
            keyExtractor={movieKeyExtractor}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={VSeparator}
            renderItem={renderVMedia}
          />
          <ComingSoonTitle>Comming soon</ComingSoonTitle>
        </>
      }
      onRefresh={onRefresh}
      refreshing={refreshing}
    />
  )
}

export default Movies
