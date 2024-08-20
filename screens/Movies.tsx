import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { ActivityIndicator, Dimensions, StyleSheet } from 'react-native'
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

const Title = styled.Text``

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({
  navigation
}) => {
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
        loop
        timeout={3.5}
        controlsEnabled={false}
        containerStyle={{ width: '100%', height: SCREEN_HEIGHT / 4 }}
      >
        {nowPlaying.map(movie => (
          <View key={movie.id}>
            <BgImg
              style={StyleSheet.absoluteFill}
              source={{ uri: makeImgPath(movie.backdrop_path) }}
            />
            <BlurView style={StyleSheet.absoluteFill} intensity={100}>
              <Title>{movie.original_title}</Title>
            </BlurView>
          </View>
        ))}
      </Swiper>
    </Container>
  )
}

export default Movies
