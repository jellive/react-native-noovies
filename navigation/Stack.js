import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Text, View, TouchableOpacity } from 'react-native'
import Detail from '../screens/Detail'

// const ScreenOne = ({ navigation: { navigate } }) => (
//   <TouchableOpacity onPress={() => navigate('Two')}>
//     <Text>go to Two</Text>
//   </TouchableOpacity>
// )
// const ScreenTwo = ({ navigation: { navigate } }) => (
//   <TouchableOpacity onPress={() => navigate('Three')}>
//     <Text>go to Three</Text>
//   </TouchableOpacity>
// )
// const ScreenThree = ({ navigation: { navigate, setOptions, goBack } }) => {
//   return (
//     <>
//       <TouchableOpacity onPress={() => goBack()}>
//         <Text>goBack</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         onPress={() => setOptions({ title: 'Hello!' })}
//         style={{ marginTop: 40 }}
//       >
//         <Text>Change title</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         onPress={() => navigate('Tabs', { screen: 'Search' })}
//         style={{ marginTop: 40 }}
//       >
//         <Text>Go to search</Text>
//       </TouchableOpacity>
//     </>
//   )
// }

const NativeStack = createNativeStackNavigator()

const Stack = () => (
  <NativeStack.Navigator
  // screenOptions={{
  //   headerBackTitleVisible: false
  //   //   headerBackVisible: false
  //   //   animation: 'fade'
  // }}
  >
    <NativeStack.Screen name="Detail" component={Detail} />
    {/* <NativeStack.Screen name="Two" component={ScreenTwo} />
    <NativeStack.Screen
      name="Three"
      component={ScreenThree}
      options={{
        presentation: 'modal'
      }}
    /> */}
  </NativeStack.Navigator>
)

export default Stack
