/**
 * @desc 원래는 AppLoading을 써야 하는데, Deprecated되서 SplashScreen으로 써야 함.
 * @from https://gist.github.com/ayaan92/67990c7ef86eff0303da3d7d62b843a7
 */

import React, { useState, useCallback, useEffect } from 'react'
import { Text, View, Image, useColorScheme } from 'react-native'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'
import { Asset, useAssets } from 'expo-asset'
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer
} from '@react-navigation/native' // 설치 후 ios, android를 '커맨드'로 다시 실행해야 함. 바이너리를 새로 묶어야 하기 때문.
import Tabs from './navigation/Tabs'
import Stack from './navigation/Stack'

SplashScreen.preventAutoHideAsync()

const loadFonts = fonts => fonts.map(font => Font.loadAsync(font))

const loadImages = images =>
  images.map(image => {
    if (typeof image === 'string') return Image.prefetch(image)
    else Asset.loadAsync(image)
  })

export default function App() {
  const [assets] = useAssets([
    require('./assets/snack-icon.png'),
    'https://avatars.githubusercontent.com/u/102774264?s=64&v=4'
  ])
  const [loaded] = Font.useFonts(Ionicons.font)
  const [ready, setReady] = useState(false)

  const isDark = useColorScheme() === 'dark'

  useEffect(() => {
    async function prepare() {
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

  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <NavigationContainer
      /**
       * @desc 다크 테마 내장으로 적용하기
       */
      // theme={isDark ? DarkTheme : DefaultTheme}
      >
        {/* <Tabs /> */}
        <Stack />
      </NavigationContainer>
    </View>
  )
}
