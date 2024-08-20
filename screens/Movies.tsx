import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  useColorScheme
} from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Swiper from 'react-native-swiper'
import { BlurView } from '@react-native-community/blur'
import { makeImgPath } from '../utils'

const API_KEY = '75ecfeb0448980314d98e491886dabd2'
const nowPlayingAddr = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=kr`
const Container = styled.ScrollView``

const View = styled.View`
  flex: 1;
`

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.mainBgColor};
`

const BgImg = styled.Image``

const Poster = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
`

const Title = styled.Text<{ isDark: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${props => (props.isDark ? 'white' : props.theme.textColor)};
`
const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`
const Column = styled.View`
  width: 40%;
  margin-left: 15px;
`

const Overview = styled.Text`
  margin-top: 10px;
  color: rgba(255, 255, 255, 0.8);
`

const Votes = styled(Overview)`
  font-size: 12px;
` // 기존 styled 확장

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({
  navigation
}) => {
  const isDark = useColorScheme() === 'dark'
  const [loading, setLoading] = useState(true)
  const [nowPlaying, setNowPlaying] = useState([])
  const getNowPlaying = async () => {
    const { results } = await (await fetch(nowPlayingAddr)).json()
    setNowPlaying(results)
    setLoading(false)
  }

  useEffect(() => {
    getNowPlaying()
  }, [])
  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container>
      <Swiper
        horizontal
        showsButtons={false}
        autoplayTimeout={3.5}
        loop
        autoplay
        showsPagination={false}
        containerStyle={{ width: '100%', height: SCREEN_HEIGHT / 4 }}
      >
        {nowPlaying.map(movie => (
          <View key={movie.id}>
            <BgImg
              style={StyleSheet.absoluteFill}
              source={{ uri: makeImgPath(movie.backdrop_path) }}
            />
            <BlurView
              blurType={isDark ? 'dark' : 'light'}
              style={StyleSheet.absoluteFill}
              blurAmount={100}
            >
              <Wrapper>
                <Poster source={{ uri: makeImgPath(movie.poster_path) }} />
                <Column>
                  <Title isDark={isDark}>{movie.original_title}</Title>
                  {movie.vote_average > 0 && (
                    <Votes>🌟{movie.vote_average}/10</Votes>
                  )}
                  <Overview>{movie.overview.slice(0, 90)}...</Overview>
                </Column>
              </Wrapper>
            </BlurView>
          </View>
        ))}
      </Swiper>
    </Container>
  )
}

export default Movies
