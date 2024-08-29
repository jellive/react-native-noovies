import react, { useState } from 'react'
import { View, Text, ScrollView, FlatList, RefreshControl } from 'react-native'
import { useQuery, useInfiniteQuery, useQueryClient } from 'react-query'
import { tvApi } from '../api'
import Loader from '../components/Loader'
import VMedia from '../components/VMedia'
import HList, { HListPeparator } from '../components/HList'

const Tv = () => {
  const queryClient = useQueryClient()
  const [refreshing, setRefreshing] = useState(false)
  const {
    isLoading: todayLoading,
    data: todayData,
    isRefetching: todayRefetching,
    hasNextPage: todayHasNextPage,
    fetchNextPage: todayFetchNextPage,
    isRefetching: isRefetchingToday
  } = useInfiniteQuery(['tv', 'today'], tvApi.airingToday, {
    getNextPageParam: currentPage => {
      const nextPage = currentPage.page + 1
      return nextPage > currentPage.total_pages ? null : nextPage
    }
  })
  const {
    isLoading: topLoading,
    data: topData,
    isRefetching: topRefetching,
    hasNextPage: topHasNextPage,
    fetchNextPage: topFetchNextPage,
    isRefetching: isRefetchingTop
  } = useInfiniteQuery(['tv', 'top'], tvApi.topRated, {
    getNextPageParam: currentPage => {
      const nextPage = currentPage.page + 1
      return nextPage > currentPage.total_pages ? null : nextPage
    }
  })
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: trendingRefetching,
    hasNextPage: trendingHasNextPage,
    fetchNextPage: trendingFetchNextPage,
    isRefetching: isRefetchingTrending
  } = useInfiniteQuery(['tv', 'trending'], tvApi.trending, {
    getNextPageParam: currentPage => {
      const nextPage = currentPage.page + 1
      return nextPage > currentPage.total_pages ? null : nextPage
    }
  })

  const todayLoadMore = () => {
    if (todayHasNextPage) todayFetchNextPage()
  }
  const topLoadMore = () => {
    if (topHasNextPage) topFetchNextPage()
  }
  const trendLoadMore = () => {
    if (trendingHasNextPage) trendingFetchNextPage()
  }
  const onRefresh = async () => {
    setRefreshing(true)
    await queryClient.refetchQueries(['tv'])
    setRefreshing(false)
  }

  const loading = todayLoading || topLoading || trendingLoading

  return loading ? (
    <Loader />
  ) : (
    <ScrollView
      contentContainerStyle={{ paddingVertical: 30 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <HList
        title="Trending TV"
        data={trendingData!.pages.map(page => page.results).flat()}
        onEndReached={trendLoadMore}
      />
      <HList
        title="Airing Today"
        data={todayData!.pages.map(page => page.results).flat()}
        onEndReached={todayLoadMore}
      />
      <HList
        title="Top Rated TV"
        data={topData.pages.map(page => page.results).flat()}
        onEndReached={topLoadMore}
      />
    </ScrollView>
  )
}

export default Tv
