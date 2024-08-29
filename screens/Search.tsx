import react, { useState } from 'react'
import { View, Text } from 'react-native'
import { useQuery, useInfiniteQuery } from 'react-query'
import styled from 'styled-components/native'
import { moviesApi, tvApi } from '../api'
import Loader from '../components/Loader'
import HList from '../components/HList'

const Container = styled.ScrollView``

const SearchBar = styled.TextInput`
  background-color: white;
  padding: 10px 15px;
  border-radius: 15px;
  width: 90%;
  margin: 10px auto;
  margin-bottom: 40px;
`

const Search = () => {
  const [query, setQuery] = useState('')
  const {
    isLoading: moviesLoading,
    data: moviesData,
    refetch: searchMovies,
    hasNextPage: moviesHasNextPage,
    fetchNextPage: moviesFetchNextPage
  } = useInfiniteQuery(['searchMovies', query], moviesApi.search, {
    enabled: false, // 시작하자마자 실행되는 걸 막아줌.
    getNextPageParam: currentPage => {
      const nextPage = currentPage.page + 1
      return nextPage > currentPage.total_pages ? null : nextPage
    }
  })
  const {
    isLoading: tvLoading,
    data: tvData,
    refetch: searchTv,
    hasNextPage: tvHasNextPage,
    fetchNextPage: tvFetchNextPage
  } = useInfiniteQuery(['searchTv', query], tvApi.search, {
    enabled: false, // 시작하자마자 실행되는 걸 막아줌.
    getNextPageParam: currentPage => {
      const nextPage = currentPage.page + 1
      return nextPage > currentPage.total_pages ? null : nextPage
    }
  })
  const movieLoadMore = () => {
    if (moviesHasNextPage) moviesFetchNextPage()
  }
  const tvLoadMote = () => {
    if (tvHasNextPage) tvFetchNextPage()
  }

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
      {moviesLoading || tvLoading ? <Loader /> : null}
      {moviesData ? (
        <HList
          title="Movie Results"
          data={moviesData.pages.map(item => item.results).flat()}
          // useQuery() 때는 data.results, useInfiniteQuery()때는 pages[index].results로 가져옴
          onEndReached={movieLoadMore}
        />
      ) : null}
      {tvData ? (
        <HList
          title="TV Results"
          data={tvData.pages.map(item => item.results).flat()}
          onEndReached={tvLoadMote}
        />
      ) : null}
    </Container>
  )
}
export default Search
