import { useMemo } from 'react'
import Hero from '../components/Hero'
import CategoryRow from '../components/CategoryRow'
import ApiKeyNotice from '../components/ApiKeyNotice'
import { useFetch } from '../hooks/useFetch'
import { tmdb, isConfigured } from '../services/tmdb'

export default function Home() {
  const trending = useFetch(() => tmdb.trending(), [])
  const popular = useFetch(() => tmdb.popular(), [])
  const topRated = useFetch(() => tmdb.topRated(), [])
  const upcoming = useFetch(() => tmdb.upcoming(), [])

  const heroMovie = useMemo(() => {
    const list = trending.data?.results || []
    return list[Math.floor(Math.random() * Math.min(list.length, 5))]
  }, [trending.data])

  if (!isConfigured) return <ApiKeyNotice />

  return (
    <div>
      <Hero movie={heroMovie} />

      <div className="sprocket-divider" />

      <CategoryRow
        title="Trending This Week"
        movies={trending.data?.results || []}
        loading={trending.loading}
        error={trending.error}
        viewAllTo="/category/trending"
      />
      <CategoryRow
        title="Popular Movies"
        movies={popular.data?.results || []}
        loading={popular.loading}
        error={popular.error}
        viewAllTo="/category/popular"
      />
      <CategoryRow
        title="Top Rated"
        movies={topRated.data?.results || []}
        loading={topRated.loading}
        error={topRated.error}
        viewAllTo="/category/top_rated"
      />
      <CategoryRow
        title="Upcoming"
        movies={upcoming.data?.results || []}
        loading={upcoming.loading}
        error={upcoming.error}
        viewAllTo="/category/upcoming"
      />
    </div>
  )
}