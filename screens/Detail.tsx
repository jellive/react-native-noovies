import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import {
  Dimensions,
  StyleSheet,
  Linking,
  TouchableOpacity,
  Share
} from 'react-native'
import styled from 'styled-components/native'
import { Movie, moviesApi, TV, tvApi } from '../api'
import Poster from '../components/Poster'
import { makeImgPath } from '../utils'
import { LinearGradient } from 'expo-linear-gradient'
import { BLACK_COLOR } from '../utils/colors'
import { useQuery } from 'react-query'
import Loader from '../components/Loader'
import { Ionicons } from '@expo/vector-icons'
import * as WebBrowser from 'expo-web-browser'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

const Container = styled.ScrollView`
  background-color: ${props => props.theme.mainBgColor};
`

const Header = styled.View`
  height: ${SCREEN_HEIGHT / 4}px;
  justify-content: flex-end; /* 모바일은 기본이 수직축이기 때문에 같은 축을 공유하는 justify-content는 수직을 기준으로 한다. 여기서 flex-end를 하면 맨 밑으로 됨. */
  padding: 0 20px;
`

const Background = styled.Image``

const Column = styled.View`
  flex-direction: row;
  width: 80%; /* 전체중에임. */
`

const Title = styled.Text`
  color: white;
  font-size: 36px;
  align-self: flex-end;
  margin-left: 15px;
  font-weight: 500;
`

const Data = styled.View`
  padding: 0 20px;
`

const Overview = styled.Text`
  color: ${props => props.theme.textColor};
  margin: 20px 0;
`

const VideoBtn = styled.TouchableOpacity`
  flex-direction: row;
`
const BtnText = styled.Text`
  color: white;
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 24px;
  margin-left: 10px;
`

type RootStackParamList = {
  Detail: Movie | TV // 여기 이름은 screen의 이름으로 맞춰야 함.
}

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Detail'> // 여기도.

const Detail: React.FC<DetailScreenProps> = ({
  navigation: { setOptions },
  route: { params }
}) => {
  const isMovie = 'original_title' in params
  const { isLoading, data } = useQuery(
    [isMovie ? 'movies' : 'tv', params.id],
    isMovie ? moviesApi.detail : tvApi.detail
  )
  const shareMedia = async () => {
    await Share.share({
      url: isMovie
        ? `https://www.imdb.com/title/${data.imdb_id}`
        : data.homepage,
      message: params.overview,
      title:
        'original_title' in params
          ? params.original_title
          : params.original_name
    })
  }
  const ShareButton = () => (
    <TouchableOpacity onPress={shareMedia}>
      <Ionicons name="share-outline" color="white" size={24} />
    </TouchableOpacity>
  )

  useEffect(() => {
    setOptions({
      title: 'original_title' in params ? 'Movie' : 'TV Show'
    })
  }, [])
  useEffect(() => {
    if (data)
      setOptions({
        headerRight: () => <ShareButton />
      })
  }, [data])
  console.log('data', data)

  const openYTLink = async (videoID: string) => {
    const baseUrl = `http://m.youtube.com/watch?v=${videoID}`
    // await Linking.openURL(baseUrl)
    await WebBrowser.openBrowserAsync(baseUrl)
  }

  return (
    <Container>
      <Header>
        <Background
          style={StyleSheet.absoluteFill} // absoluteFill은 이미지를 만들어줌.
          source={{ uri: makeImgPath(params.backdrop_path || '') }}
        />
        <LinearGradient
          colors={['transparent', BLACK_COLOR]}
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster path={params.poster_path || ''} />
          <Title>
            {'original_title' in params
              ? params.original_title
              : params.original_name}
          </Title>
        </Column>
      </Header>
      <Data>
        <Overview>{params.overview}</Overview>
        {isLoading && <Loader />}
        {data?.videos?.results?.map(video => (
          <VideoBtn key={video.key} onPress={() => openYTLink(video.key)}>
            <Ionicons name="logo-youtube" color="white" size={24} />
            <BtnText>{video.name}</BtnText>
          </VideoBtn>
        ))}
      </Data>
    </Container>
  )
}

export default Detail
