import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Movies from '../screens/Movies'
import Tv from '../screens/Tv'
import Search from '../screens/Search'
import { Text, View } from 'react-native'
import { useColorScheme } from 'react-native'
import { BLACK_COLOR, YELLOW_COLOR } from '../utils/colors'

const Tab = createBottomTabNavigator()

const Tabs = () => {
  const isDark = useColorScheme() === 'dark'
  console.log('isDark', isDark)
  return (
    <Tab.Navigator
      // initialRouteName="Search"
      // screenOptions={{ tabBarLabelStyle: { backgroundColor: 'red' } }}
      // screenOptions={{ tabBarLabelPosition: 'beside-icon' }}
      //   screenOptions={{
      //     tabBarActiveTintColor: 'red',
      //     tabBarInactiveTintColor: 'purple',
      //     tabBarStyle: { backgroundColor: 'tomato' }
      //   }}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDark ? BLACK_COLOR : 'white'
        },
        tabBarActiveTintColor: isDark ? YELLOW_COLOR : BLACK_COLOR,
        tabBarInactiveTintColor: isDark ? '#d2dae2' : '#808e9b',
        headerStyle: {
          backgroundColor: isDark ? BLACK_COLOR : 'white'
        },
        headerTitleStyle: {
          color: isDark ? 'white' : BLACK_COLOR
        }
      }}
    >
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          headerTitleStyle: {
            color: 'tomato'
          },
          headerRight: () => (
            <View>
              <Text>Hello</Text>
            </View>
          )
        }}
      />
      <Tab.Screen
        name="TV"
        component={Tv}
        //   options={{ tabBarLabelStyle: { backgroundColor: 'purple' } }}
        //   options={{ tabBarBadge: 'hello' }}
      />
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
  )
}

export default Tabs
