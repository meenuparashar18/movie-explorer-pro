export function formatYear(dateStr) {
  if (!dateStr) return '—'
  return dateStr.slice(0, 4)
}

export function formatRuntime(minutes) {
  if (!minutes) return '—'
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${h}h ${m}m`
}

export function formatRating(vote) {
  if (vote === undefined || vote === null) return '—'
  return vote.toFixed(1)
}

export const GENRE_MAP_KEY = 'movie-explorer-genres'

export function mapGenreIds(ids = [], genreList = []) {
  if (!ids?.length || !genreList?.length) return []
  return ids
    .map((id) => genreList.find((g) => g.id === id)?.name)
    .filter(Boolean)
}

export function classNames(...args) {
  return args.filter(Boolean).join(' ')
}