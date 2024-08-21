import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import {
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  ScrollView
} from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Swiper from 'react-native-swiper'
import Slide from '../components/Slide'
import Poster from '../components/Poster'

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

const TrendingScroll = styled.ScrollView`
  margin-top: 20px;
`

const Movie = styled.View`
  margin-right: 20px;
  align-items: center;
`

const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`

const Votes = styled.Text`
  color: rgba(255, 255, 255, 0.6);
  font-size: 10px;
`

const ListContainer = styled.View`
  margin-bottom: 40px;
`

const HMovie = styled.View`
  padding: 0px 30px;
  margin-bottom: 30px;
  flex-direction: row;
`

const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`

const Overview = styled.Text`
  color: white;
  opacity: 0.8;
  width: 80%;
`

const Release = styled.Text`
  color: white;
  font-size: 12px;
  margin-vertical: 10px;
`

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 30px;
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
    <Container
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
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
      <ListContainer>
        <TrendingScroll
          contentContainerStyle={{ paddingLeft: 30 }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {trending.map(movie => (
            <Movie key={movie.id}>
              <Poster path={movie.poster_path} />
              <Title>
                {movie.original_title.slice(0, 13)}
                {movie.original_title.length > 13 && '...'}
              </Title>
              <Votes>
                {movie.vote_average > 0
                  ? `🌟${movie.vote_average}/10`
                  : 'Coming soon'}
              </Votes>
            </Movie>
          ))}
        </TrendingScroll>
      </ListContainer>
      <ComingSoonTitle>Comming soon</ComingSoonTitle>
      {upcoming.map(movie => (
        <HMovie key={movie.id}>
          <Poster path={movie.poster_path} />
          <HColumn>
            <Title>{movie.original_title}</Title>
            <Release>
              {new Date(movie.release_date).toLocaleDateString('ko', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
              {/*  원하는 형식으로 뽑아낼 수 있음. */}
            </Release>
            <Overview>
              {movie.overview !== '' && movie.overview.length > 13
                ? `${movie.overview.slice(0, 140)}...`
                : movie.overview}
            </Overview>
          </HColumn>
        </HMovie>
      ))}
    </Container>
  )
}

export default Movies
