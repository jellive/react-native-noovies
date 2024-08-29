import React from 'react'
import styled from 'styled-components/native'
import VMedia from './VMedia'
import { FlatList } from 'react-native'

const ListContainer = styled.View`
  margin-bottom: 40px;
`

const ListTitle = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-left: 30px;
  margin-bottom: 20px;
`

export const HListPeparator = styled.View`
  width: 20px;
`

interface HListProps {
  title: string
  data: any[]
  onEndReached: ((info: { distanceFromEnd: number }) => void) | null | undefined
}

const HList: React.FC<HListProps> = ({ title, data, onEndReached }) => (
  <ListContainer>
    <ListTitle>{title}</ListTitle>
    <FlatList
      data={data}
      horizontal
      onEndReached={onEndReached}
      onEndReachedThreshold={0.4} // onEndReached를 실행시키려는 목록의 하단에서 내용의 끝까지의 거리.
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 30 }}
      ItemSeparatorComponent={HListPeparator}
      keyExtractor={item => item.id + Math.random().toFixed(2) * 10 + ''}
      renderItem={({ item }) => (
        <VMedia
          posterPath={item.poster_path}
          originalTitle={item.original_title ?? item.original_name}
          voteAverage={item.vote_average}
          fullData={item}
        />
      )}
    />
  </ListContainer>
)

export default HList
