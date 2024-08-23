import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
  View
} from 'react-native'
import styled from 'styled-components/native'
import { makeImgPath } from '../utils'
import { BlurView } from '@react-native-community/blur'
import Poster from './Poster'
import { useNavigation } from '@react-navigation/native'

const BgImg = styled.Image``

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

const Overview = styled.Text<{ isDark: boolean }>`
  margin-top: 10px;
  color: ${props =>
    props.isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'};
`

const Votes = styled(Overview)`
  font-size: 12px;
` // 기존 styled 확장

interface SlideProps {
  backdrop_path: string
  poster_path: string
  original_title: string
  vote_average: number
  overview: string
}

const Slide: React.FC<SlideProps> = ({
  backdrop_path,
  poster_path,
  original_title,
  vote_average,
  overview
}: SlideProps) => {
  const navigation = useNavigation()
  const isDark = useColorScheme() === 'dark'
  return (
    <TouchableWithoutFeedback onPress={goToDetail}>
      {/* opacity로 만들지 않기 위해 */}
      <View style={{ flex: 1 }}>
        <BgImg
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(backdrop_path) }}
        />
        <BlurView
          blurType={isDark ? 'dark' : 'light'}
          style={StyleSheet.absoluteFill} // 같은 크기의 blur를 덮어씌워줌.
          blurAmount={100}
        >
          <Wrapper>
            <Poster path={poster_path} />
            <Column>
              <Title isDark={isDark}>{original_title}</Title>
              {vote_average > 0 && (
                <Votes isDark={isDark}>🌟{vote_average}/10</Votes>
              )}
              <Overview isDark={isDark}>{overview.slice(0, 90)}...</Overview>
            </Column>
          </Wrapper>
        </BlurView>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Slide
