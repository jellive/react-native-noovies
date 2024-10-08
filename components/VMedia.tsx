import React from 'react'
import styled from 'styled-components/native'
import Poster from './Poster'
import Votes from './Votes'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'
import { Movie, TV } from '../api'

const Container = styled.View`
  align-items: center;
`

const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`

interface VMediaProps {
  posterPath: string
  originalTitle: string
  voteAverage: number
  fullData: Movie | TV
}

const VMedia: React.FC<VMediaProps> = ({
  posterPath,
  originalTitle,
  voteAverage,
  fullData
}) => {
  const navigation = useNavigation() // 전역으로 navigation을 얻을 수 있음. 이로 페이지 이동이 가능.
  const goToDetail = () => {
    //@ts-ignore
    navigation.navigate('Stack', {
      screen: 'Detail',
      params: {
        ...fullData
      }
    })
  }
  return (
    <TouchableOpacity onPress={goToDetail}>
      <Container>
        <Poster path={posterPath} />
        <Title>
          {originalTitle.slice(0, 12)}
          {originalTitle.length > 12 ? '...' : null}
        </Title>
        <Votes votes={voteAverage} />
      </Container>
    </TouchableOpacity>
  )
}

export default VMedia
