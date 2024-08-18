import react from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const Movies = ({ navigation: { navigate } }) => (
  <TouchableOpacity
    onPress={() => navigate('Stack', { screen: 'Three' })} // 바로 'Three'를 쓰면 navigation 사이를 이동하기 때문에 안 됨.
    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
  >
    <Text>Movies</Text>
  </TouchableOpacity>
)
export default Movies
