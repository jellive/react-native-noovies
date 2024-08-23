import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import styled from 'styled-components/native'

const Container = styled.ScrollView`
  background-color: ${props => props.theme.mainBgColor};
`

type RootStackParamList = {
  Detail: { originalTitle: string } // 여기 이름은 screen의 이름으로 맞춰야 함.
}

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Detail'> // 여기도.

const Detail: React.FC<DetailScreenProps> = ({
  navigation: { setOptions },
  route: {
    params: { originalTitle }
  }
}) => {
  useEffect(() => {
    setOptions({ title: originalTitle })
  }, [])
  console.log(originalTitle)
  return (
    <Container>
      <Text>Detail</Text>
    </Container>
  )
}

export default Detail
