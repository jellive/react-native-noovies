import React from 'react'
import styled from 'styled-components/native'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const Btn = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const Title = styled.Text`
  color: ${props => (props.selected ? 'blue' : 'red')};
`

// const Header = styled.View``

// const Column = styled.View``

// const Footer = styled.View``

const Movies = ({ navigation: { navigate } }) => (
  <>
    {/* <Header></Header>
    <Column> */}
    <Btn
      onPress={() => navigate('Stack', { screen: 'Three' })} // 바로 'Three'를 쓰면 navigation 사이를 이동하기 때문에 안 됨.
    >
      <Title selected={true}>Movies</Title>
      <Title selected={false}>Movies</Title>
    </Btn>
    {/* </Column>
    <Footer></Footer> */}
  </>
)

export default Movies
