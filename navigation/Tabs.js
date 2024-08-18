import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Movies from '../screens/Movies'
import Tv from '../screens/Tv'
import Search from '../screens/Search'
import { Text, View } from 'react-native'
import { useColorScheme } from 'react-native'
import { BLACK_COLOR, YELLOW_COLOR } from '../utils/colors'
import { Ionicons } from '@expo/vector-icons'
import Stack from './Stack'

const Tab = createBottomTabNavigator()

const Tabs = () => {
  const isDark = useColorScheme() === 'dark'
  console.log('isDark', isDark)
  return (
    <Tab.Navigator
      /**
       * @desc 초기 페이지 설정
       */
      // initialRouteName="Search"
      /**
       * @desc 탭바 배경 설정
       */
      // screenOptions={{ tabBarLabelStyle: { backgroundColor: 'red' } }}
      /**
       * @desc 아이콘 배치 설정
       */
      // screenOptions={{ tabBarLabelPosition: 'beside-icon' }}
      /**
       * @desc 탭바 색상 세부 설정
       */
      //   screenOptions={{
      //     tabBarActiveTintColor: 'red',
      //     tabBarInactiveTintColor: 'purple',
      //     tabBarStyle: { backgroundColor: 'tomato' }
      //   }}
      /**
       * @desc 다크모드 유무에 따른 탭바 색상 세부 설정
       */
      //   screenOptions={{
      //     tabBarStyle: {
      //       backgroundColor: isDark ? BLACK_COLOR : 'white'
      //     },
      //     tabBarActiveTintColor: isDark ? YELLOW_COLOR : BLACK_COLOR,
      //     tabBarInactiveTintColor: isDark ? '#d2dae2' : '#808e9b',
      //     headerStyle: {
      //       backgroundColor: isDark ? BLACK_COLOR : 'white'
      //     },
      //     headerTitleStyle: {
      //       color: isDark ? 'white' : BLACK_COLOR
      //     }
      //   }}
      screenOptions={{
        tabBarLabelStyle: {
          marginTop: -5,
          fontSize: 10,
          fontWeight: 600
        }
      }}
    >
      <Tab.Screen
        name="Movies"
        component={Movies}
        // component={Stack}
        options={{
          //   headerTitleStyle: {
          //     color: 'tomato'
          //   },
          //   headerRight: () => (
          //     <View>
          //       <Text>Hello</Text>
          //     </View>
          //   ),
          tabBarIcon: ({ focused, color, size }) => {
            console.log(focused, color, size) // focused는 react navigator에서 처리해주기 떄문에 거의 쓸 일이 없음
            return (
              <Ionicons
                name={focused ? 'film' : 'film-outline'}
                color={color}
                size={size}
              />
            )
          }
          //   headerShown: false
        }}
      />
      <Tab.Screen
        name="TV"
        component={Tv}
        //   options={{ tabBarLabelStyle: { backgroundColor: 'purple' } }}
        //   options={{ tabBarBadge: 'hello' }}
        options={{
          tabBarIcon: ({ color, size }) => {
            console.log(color, size)
            return <Ionicons name="tv-outline" color={color} size={size} />
          }
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            console.log(color, size)
            return (
              <Ionicons
                name={focused ? 'search' : 'search-outline'}
                color={color}
                size={size}
              />
            )
          }
        }}
      />
    </Tab.Navigator>
  )
}

export default Tabs
