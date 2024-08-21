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
  width: 20px;
`

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({
  navigation
}) => {
  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = async () => {}

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

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <FlatList
      data={upcoming}
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
            {nowPlaying.map(movie => (
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
            data={trending}
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
