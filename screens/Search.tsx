import react, { useState } from 'react'
import { View, Text } from 'react-native'
import { useQuery } from 'react-query'
import styled from 'styled-components/native'
import { moviesApi, tvApi } from '../api'

const Container = styled.ScrollView``

const SearchBar = styled.TextInput`
  background-color: white;
  padding: 10px 15px;
  border-radius: 15px;
  width: 90%;
  margin: 10px auto;
`

const Search = () => {
  const [query, setQuery] = useState('')
  const {
    isLoading: moviesLoading,
    data: moviesData,
    refetch: searchMovies
  } = useQuery(['searchMovies', query], moviesApi.search, {
    enabled: false // 시작하자마자 실행되는 걸 막아줌.
  })
  const {
    isLoading: tvLoading,
    data: tvData,
    refetch: searchTv
  } = useQuery(['searchTv', query], tvApi.search, {
    enabled: false // 시작하자마자 실행되는 걸 막아줌.
  })
  const onChangeText = (text: string) => {
    setQuery(text)
  }
  const onSubmit = () => {
    if (query === '') {
      return
    }
    searchMovies() // 처음에는 막고, onSubmit때만 된다. 우회하는 느낌.
    searchTv()
  }
  return (
    <Container>
      <SearchBar
        placeholder="Search for Movie or TV Show"
        placeholderTextColor="grey"
        returnKeyType="search"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
      <Text>{JSON.stringify(moviesData)}</Text>
    </Container>
  )
}
export default Search
