const API_KEY = '75ecfeb0448980314d98e491886dabd2'
const BASE_URL = 'https://api.themoviedb.org/3'

const trending = () =>
  fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`).then(res =>
    res.json()
  )
const upcoming = () =>
  fetch(
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=kr`
  ).then(res => res.json())
const nowPlaying = () =>
  fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=kr`
  ).then(res => res.json())

export const moviesApi = { trending, upcoming, nowPlaying }
