import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { ActivityIndicator, Dimensions } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Swiper from 'react-native-swiper'
import Slide from '../components/Slide'

const API_KEY = '75ecfeb0448980314d98e491886dabd2'
const nowPlayingAddr = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=kr`
const upcomingAddr = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=kr`
const trendingAddr = `https://api.themoviedb.org/3/movie/trending/movie/week?api_key=${API_KEY}`
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

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({
  navigation
}) => {
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
  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container>
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
    </Container>
  )
}

export default Movies
