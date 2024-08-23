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
import { Movie, MovieResponse, moviesApi } from '../api'
import Loader from '../components/Loader'
import HList from '../components/HList'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

// styled-component에 소속된 FlatList가 아닌 react-native의 FlatList로 치환.
const TrendingScroll = styled(FlatList<Movie>)`
  margin-top: 20px;
`
// as unknown as typeof FlatList // 이렇게 ts로 강제 캐스팅 해도 됨.
// https://stackoverflow.com/questions/64460114/rn-flatlist-with-typescript-and-styled-components

const ListTitle = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-left: 30px;
  margin-bottom: 20px;
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
  const [refreshing, setRefreshing] = useState(false)
  const {
    isLoading: nowPlayingLoading,
    error: nowPlayingError,
    data: nowPlayingData,
    isRefetching: isRefetchingNotPlaying
  } = useQuery<MovieResponse>(['movies', 'nowPlaying'], moviesApi.nowPlaying) // 첫번쨰 인자는 키로, 캐싱하는 데이터의 이름이다. 이는 다음에 다시 fetch 하지 않겠다는 뜻.
  const {
    isLoading: upcomingLoading,
    error: upcomingError,
    data: upcomingData,
    isRefetching: isRefetchingUpcoming
  } = useQuery<MovieResponse>(['movies', 'upcoming'], moviesApi.upcoming)
  const {
    isLoading: trendingLoading,
    error: trendingError,
    data: trendingData,
    isRefetching: isRefetchingTrending
  } = useQuery<MovieResponse>(['movies', 'trending'], moviesApi.trending)
  const onRefresh = async () => {
    setRefreshing(true)
    await queryClient.refetchQueries(['movies']) // movies 카테고리 전체를 refetch 한다.
    setRefreshing(false)
  }

  const renderVMedia = ({ item }: { item: Movie }) => (
    <VMedia
      posterPath={item.poster_path || ''}
      originalTitle={item.original_title}
      voteAverage={item.vote_average}
    />
  )

  const renderHMedia = (
    { item }: { item: Movie } // FlatList에서는 무조건 item으로 해야한다. (movie등 맘대로 하는게 아님.)
  ) => (
    <HMedia
      key={item.id}
      posterPath={item.poster_path || ''}
      originalTitle={item.original_title}
      overview={item.overview}
      releaseDate={item.release_date}
      fullData={item}
    />
  )

  const movieKeyExtractor = (item: Movie) => item.id + ''
  const loading = nowPlayingLoading || upcomingLoading || trendingLoading

  console.log('refresh', refreshing)
  return loading ? (
    <Loader />
  ) : upcomingData ? (
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
            {nowPlayingData?.results.map(movie => (
              <Slide
                key={movie.id}
                backdrop_path={movie.backdrop_path || ''}
                poster_path={movie.poster_path || ''}
                originalTitle={movie.original_title}
                vote_average={movie.vote_average}
                overview={movie.overview}
                fullData={movie}
              />
            ))}
          </Swiper>
          {/* Trending */}
          {trendingData ? (
            <HList title="Trending movies" data={trendingData.results} />
          ) : null}
          <ComingSoonTitle>Comming soon</ComingSoonTitle>
        </>
      }
      onRefresh={onRefresh}
      refreshing={refreshing}
    />
  ) : null
}

export default Movies
