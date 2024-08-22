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
import Root from './navigation/Root'

import { darkTheme, lightTheme } from './styled'
import { ThemeProvider } from 'styled-components/native'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [assets] = useAssets([
    require('./assets/snack-icon.png'),
    'https://avatars.githubusercontent.com/u/102774264?s=64&v=4'
  ])
  const [loaded] = Font.useFonts(Ionicons.font)

  const onLayoutRootView = useCallback(async () => {
    if (loaded && assets) {
      console.log('ready is true', assets, loaded)
      await SplashScreen.hideAsync()
    } else {
      console.log('ready is false', assets, loaded)
    }
  }, [loaded, assets])

  const isDark = useColorScheme() === 'dark'

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
          <NavigationContainer
          /**
           * @desc 다크 테마 내장으로 적용하기
           */
          // theme={isDark ? DarkTheme : DefaultTheme}
          >
            {/* <Tabs /> */}
            {/* <Stack /> */}
            <Root />
          </NavigationContainer>
        </View>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
