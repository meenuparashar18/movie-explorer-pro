import axios from 'axios'

const BASE_URL = 'https://api.themoviedb.org/3'
const TOKEN = import.meta.env.VITE_TMDB_TOKEN
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

export const IMAGE_BASE = 'https://image.tmdb.org/t/p'
export const posterUrl = (path, size = 'w500') =>
  path ? `${IMAGE_BASE}/${size}${path}` : '/placeholder-poster.svg'
export const backdropUrl = (path, size = 'original') =>
  path ? `${IMAGE_BASE}/${size}${path}` : null

const client = axios.create({
  baseURL: BASE_URL,
  headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {},
  params: !TOKEN && API_KEY ? { api_key: API_KEY } : {},
})

export const isConfigured = Boolean(TOKEN || API_KEY)

// Wraps every call so components get a consistent { data, error } shape
async function request(path, params = {}) {
  if (!isConfigured) {
    const err = new Error(
      'TMDB API key missing. Add VITE_TMDB_TOKEN (or VITE_TMDB_API_KEY) to your .env file.'
    )
    err.code = 'NO_API_KEY'
    throw err
  }
  const { data } = await client.get(path, { params })
  return data
}

export const tmdb = {
  trending: (page = 1) => request('/trending/movie/week', { page }),
  popular: (page = 1) => request('/movie/popular', { page }),
  topRated: (page = 1) => request('/movie/top_rated', { page }),
  upcoming: (page = 1) => request('/movie/upcoming', { page }),

  search: (query, page = 1) => request('/search/movie', { query, page }),

  genres: () => request('/genre/movie/list'),

  discover: (filters = {}, page = 1) =>
    request('/discover/movie', {
      page,
      with_genres: filters.genre || undefined,
      'vote_average.gte': filters.minRating || undefined,
      primary_release_year: filters.year || undefined,
      with_original_language: filters.language || undefined,
      sort_by: filters.sortBy || 'popularity.desc',
    }),

  details: (id) =>
    request(`/movie/${id}`, {
      append_to_response: 'credits,videos,similar',
    }),
}