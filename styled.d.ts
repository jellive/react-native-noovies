import 'styled-components/native'

declare module 'styled-components/native' {
  // 이것과 ThemeProvider를 토대로 styled에 props를 줄 수 있음.
  export interface DefaultTheme {
    mainBgColor: string
    textColor: string
    accentColor: string
  }
}
