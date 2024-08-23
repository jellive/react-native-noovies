import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import styled from 'styled-components/native'
import { Movie, moviesApi, TV, tvApi } from '../api'
import Poster from '../components/Poster'
import { makeImgPath } from '../utils'
import { LinearGradient } from 'expo-linear-gradient'
import { BLACK_COLOR } from '../utils/colors'
import { useQuery } from 'react-query'

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
const Overview = styled.Text`
  color: ${props => props.theme.textColor};
  margin-top: 20px;
  padding: 0 20px;
`

type RootStackParamList = {
  Detail: Movie | TV // 여기 이름은 screen의 이름으로 맞춰야 함.
}

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Detail'> // 여기도.

const Detail: React.FC<DetailScreenProps> = ({
  navigation: { setOptions },
  route: { params }
}) => {
  const { isLoading: moviesLoading, data: moviesData } = useQuery(
    ['movies', params.id],
    moviesApi.detail,
    {
      enabled: 'original_title' in params
    }
  )
  const { isLoading: tvLoading, data: tvData } = useQuery(
    ['tv', params.id],
    tvApi.detail,
    {
      enabled: 'original_name' in params
    }
  )
  useEffect(() => {
    setOptions({
      title: 'original_title' in params ? 'Movie' : 'TV Show'
    })
  }, [])
  console.log('movies', moviesData)
  console.log('tv', tvData)
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
      <Overview>{params.overview}</Overview>
    </Container>
  )
}

export default Detail
