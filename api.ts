const API_KEY = '75ecfeb0448980314d98e491886dabd2'
const BASE_URL = 'https://api.themoviedb.org/3'

export interface Movie {
  adult: boolean
  backdrop_path: string | null
  genre_ids: number[]
  id: number

  original_language: string
  original_title: string
  overview: string
  popularity: number

  poster_path: string | null
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface TV {
  name: string
  original_name: string
  origin_country: string[]
  vote_count: number
  backdrop_path: string | null
  vote_average: number
  genre_ids: number[]
  id: number
  original_language: string
  overview: string
  poster_path: string | null
  first_air_date: string
  popularity: number
  media_type: string
}

interface BaseResponse {
  page: number
  total_results: number
  total_pages: number
}

export interface MovieResponse extends BaseResponse {
  results: Movie[]
}

export interface TVResponse extends BaseResponse {
  results: TV[]
}

export const moviesApi = {
  trending: ({ pageParam }: { pageParam: number | undefined }) =>
    fetch(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${
        pageParam ?? 1
      }`
    ).then(res => res.json()),
  upcoming: ({ pageParam }: { pageParam: number | undefined }) => {
    console.log('pageParam', pageParam)
    return fetch(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${
        pageParam ?? 1
      }&region=kr`
    ).then(res => res.json())
  },
  nowPlaying: ({ pageParam }: { pageParam: number | undefined }) =>
    fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${
        pageParam ?? 1
      }&region=kr`
    ).then(res => res.json()),
  search: ({
    queryKey,
    pageParam
  }: {
    queryKey: any
    pageParam: number | undefined
  }) => {
    const [_, query] = queryKey
    console.log('movie query', query)
    return fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=${
        pageParam ?? 1
      }&query=${query}`
    ).then(res => res.json())
  },
  detail: ({ queryKey }) => {
    const [_, id] = queryKey
    console.log('movie query', id)
    return fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,images`
    ).then(res => res.json())
  }
}

export const tvApi = {
  trending: ({ pageParam }: { pageParam: number | undefined }) => {
    return fetch(
      `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&page=${pageParam ?? 1}`
    ).then(res => res.json())
  },
  airingToday: ({ pageParam }: { pageParam: number | undefined }) =>
    fetch(
      `${BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=en-US&page=${
        pageParam ?? 1
      }&region=kr`
    ).then(res => res.json()),
  topRated: ({ pageParam }: { pageParam: number | undefined }) => {
    console.log(
      `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=${
        pageParam ?? 1
      }&region=kr`
    )
    return fetch(
      `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=${
        pageParam ?? 1
      }&region=kr`
    ).then(res => res.json())
  },
  search: ({
    queryKey,
    pageParam
  }: {
    queryKey: any
    pageParam: number | undefined
  }) => {
    const [_, query] = queryKey
    console.log('tv query', query)
    return fetch(
      `${BASE_URL}/search/tv?api_key=${API_KEY}&language=en-US&page=${
        pageParam ?? 1
      }&query=${query}`
    ).then(res => res.json())
  },
  detail: ({ queryKey }) => {
    const [_, id] = queryKey
    console.log('tv query', id)
    return fetch(
      `${BASE_URL}/tv/${id}?api_key=${API_KEY}&append_to_response=videos,images`
    ).then(res => res.json())
  }
}
