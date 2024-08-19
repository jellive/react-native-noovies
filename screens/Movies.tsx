import React from 'react'
import styled from 'styled-components/native'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

const Btn = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.mainBgColor};
`

const Title = styled.Text`
  color: ${props => props => props.theme.textColor};
`

// const Header = styled.View``

// const Column = styled.View``

// const Footer = styled.View``

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({
  navigation
}) => (
  <>
    {/* <Header></Header>
    <Column> */}
    <Btn
      onPress={() => navigation.navigate('Stack', { screen: 'Three' })} // 바로 'Three'를 쓰면 navigation 사이를 이동하기 때문에 안 됨.
    >
      <Title>Movies</Title>
    </Btn>
    {/* </Column>
    <Footer></Footer> */}
  </>
)

export default Movies
