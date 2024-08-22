import react from 'react'
import { View, Text, ScrollView, FlatList } from 'react-native'
import { useQuery } from 'react-query'
import { tvApi } from '../api'
import Loader from '../components/Loader'
import VMedia from '../components/VMedia'
import HList, { HListPeparator } from '../components/HList'

const Tv = () => {
  const { isLoading: todayLoading, data: todayData } = useQuery(
    ['tv', 'today'],
    tvApi.airingToday
  )
  const { isLoading: topLoading, data: topData } = useQuery(
    ['tv', 'top'],
    tvApi.topRated
  )
  const { isLoading: trendingLoading, data: trendingData } = useQuery(
    ['tv', 'trending'],
    tvApi.trending
  )

  const loading = todayLoading || topLoading || trendingLoading
  return loading ? (
    <Loader />
  ) : (
    <ScrollView contentContainerStyle={{ paddingVertical: 30 }}>
      <HList title="Trending TV" data={trendingData.results} />
      <HList title="Airing Today" data={todayData.results} />
      <HList title="Top Rated TV" data={topData.results} />
    </ScrollView>
  )
}

export default Tv
