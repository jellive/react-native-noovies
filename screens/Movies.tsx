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

const API_KEY = '75ecfeb0448980314d98e491886dabd2'
const nowPlayingAddr = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=kr`
const upcomingAddr = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=kr`
const trendingAddr = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
const Container = styled.ScrollView``

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

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({
  navigation
}) => {
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [nowPlaying, setNowPlaying] = useState([])
  const [upcoming, setUpcoming] = useState([])
  const [trending, setTrending] = useState([])

  const getTrending = async () => {
    const { results } = await (await fetch(trendingAddr)).json()
    setTrending(results)
  }
  const getUpcoming = async () => {
    const { results } = await (await fetch(upcomingAddr)).json()
    setUpcoming(results)
  }
  const getNowPlaying = async () => {
    const { results } = await (await fetch(nowPlayingAddr)).json()
    setNowPlaying(results)
    setLoading(false)
  }

  const getData = async () => {
    // wait for all of them
    await Promise.all([getTrending(), getUpcoming(), getNowPlaying()])
    setLoading(false)
  }

  useEffect(() => {
    getData()
  }, [])

  const onRefresh = async () => {
    setRefreshing(true)
    await getData()
    setRefreshing(false)
  }

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <FlatList
      data={upcoming}
      keyExtractor={item => item.id + ''}
      ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      renderItem={({ item }) => (
        <HMedia
          key={item.id}
          posterPath={item.poster_path}
          originalTitle={item.original_title}
          overview={item.overview}
          releaseDate={item.release_date}
        />
      )}
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
            keyExtractor={item => item.id + ''}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
            renderItem={({ item }) => (
              <VMedia
                posterPath={item.poster_path}
                originalTitle={item.original_title}
                voteAverage={item.vote_average}
              />
            )}
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
