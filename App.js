/**
 * @desc 원래는 AppLoading을 써야 하는데, Deprecated되서 SplashScreen으로 써야 함.
 * @from https://gist.github.com/ayaan92/67990c7ef86eff0303da3d7d62b843a7
 */

import React, { useState, useCallback, useEffect } from 'react'
import { Text, View } from 'react-native'
import * as SplashScreen from 'expo-splash-screen'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    function prepare() {
      try {
        // pre-load fonts, call APIs, etc
        // 강의의 startLoading과 동일하게 동작
      } catch (error) {
        // 강의의 onError와 동일하게 동작
        console.warn(error)
      } finally {
        // 강의의 onFinish와 동일하게 동작
        setReady(true)
      }
    }

    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (ready) await SplashScreen.hideAsync()
  }, [ready])

  if (!ready) {
    return null
  }

  return (
    <View onLayout={onLayoutRootView}>
      <Text>We are done Loading !</Text>
    </View>
  )
}
