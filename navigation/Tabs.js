import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Movies from '../screens/Movies'
import Tv from '../screens/Tv'
import Search from '../screens/Search'
import { Text, View } from 'react-native'

const Tab = createBottomTabNavigator()

const Tabs = () => (
  <Tab.Navigator
    // initialRouteName="Search"
    // screenOptions={{ tabBarLabelStyle: { backgroundColor: 'red' } }}
    // screenOptions={{ tabBarLabelPosition: 'beside-icon' }}
    screenOptions={{
      tabBarActiveTintColor: 'red',
      tabBarInactiveTintColor: 'purple',
      tabBarStyle: { backgroundColor: 'tomato' }
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

export default Tabs
